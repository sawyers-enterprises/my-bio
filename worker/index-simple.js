// Simple Cloudflare Worker for debugging deployment
// Minimal configuration to get deployment working first

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Simple API endpoint for testing
    if (url.pathname.startsWith('/api/')) {
      
      // CORS headers
      const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      };

      // Handle preflight
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: corsHeaders });
      }

      // Health check
      if (url.pathname === '/api/' || url.pathname === '/api/health') {
        return new Response(JSON.stringify({ 
          message: "Louie Sawyer Portfolio API", 
          status: "healthy",
          timestamp: new Date().toISOString(),
          environment: env.ENVIRONMENT || 'unknown'
        }), {
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        });
      }

      // Contact form (simplified for now)
      if (url.pathname === '/api/contact' && request.method === 'POST') {
        try {
          const formData = await request.json();
          
          // Basic validation
          if (!formData.name || !formData.email || !formData.message) {
            return new Response(JSON.stringify({ 
              success: false, 
              error: 'Missing required fields' 
            }), {
              status: 400,
              headers: { 'Content-Type': 'application/json', ...corsHeaders }
            });
          }

          // For now, just return success (email integration can be added later)
          return new Response(JSON.stringify({ 
            success: true, 
            message: 'Thank you for your message! We will get back to you soon.' 
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });

        } catch (error) {
          return new Response(JSON.stringify({ 
            success: false, 
            error: 'Invalid request data' 
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
      }

      // 404 for unknown API routes
      return new Response(JSON.stringify({ 
        error: 'API endpoint not found' 
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // For non-API routes, try to serve static files FIRST
    try {
      // Import the KV asset handler
      const { getAssetFromKV, serveSinglePageApp } = await import('@cloudflare/kv-asset-handler');
      
      // Try to serve the React app
      return await getAssetFromKV({
        request,
        waitUntil: ctx.waitUntil.bind(ctx),
      }, {
        mapRequestToAsset: serveSinglePageApp,
        cacheControl: {
          browserTTL: 60 * 60 * 24, // 24 hours
          edgeTTL: 60 * 60 * 24 * 7, // 7 days
        },
      });
      
    } catch (e) {
      console.error('Asset serving error:', e);
      
      // Only show fallback HTML if we really can't serve assets
      return new Response(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Louie Sawyer - Infrastructure Engineer</title>
            <style>
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
                margin: 0; padding: 40px; background: #f5f5f5; text-align: center; 
              }
              .container { 
                background: white; padding: 40px; border-radius: 8px; 
                box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 600px; 
                margin: 40px auto; 
              }
              .error { color: #e74c3c; }
              h1 { color: #333; margin-bottom: 20px; }
              .debug { background: #f8f9fa; padding: 20px; margin: 20px 0; text-align: left; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Louie Sawyer</h1>
              <p><strong>Infrastructure Engineer</strong></p>
              <p>12+ Years Experience</p>
              <div class="error">
                <p><strong>React App Failed to Load</strong></p>
                <p>The static assets couldn't be served properly.</p>
              </div>
              <div class="debug">
                <h3>Debug Info:</h3>
                <p><strong>Error:</strong> ${e.message}</p>
                <p><strong>URL:</strong> ${url.pathname}</p>
                <p><strong>Worker:</strong> Running correctly</p>
                <p><strong>API Status:</strong> <a href="/api/health">Health Check</a></p>
              </div>
            </div>
          </body>
        </html>
      `, { 
        status: 500,
        headers: { 'Content-Type': 'text/html' }
      });
    }
  },
};