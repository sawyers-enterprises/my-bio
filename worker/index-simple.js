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

    // For non-API routes, try to serve static files or fallback
    try {
      // Import the KV asset handler dynamically to avoid issues
      const { getAssetFromKV, serveSinglePageApp } = await import('@cloudflare/kv-asset-handler');
      
      return await getAssetFromKV({
        request,
        waitUntil: ctx.waitUntil.bind(ctx),
      }, {
        mapRequestToAsset: serveSinglePageApp,
      });
      
    } catch (e) {
      console.error('Asset serving error:', e);
      
      // Simple fallback HTML page
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
              .loading { color: #666; }
              h1 { color: #333; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Louie Sawyer</h1>
              <p><strong>Infrastructure Engineer</strong></p>
              <p>12+ Years Experience</p>
              <div class="loading">
                <p>Portfolio is loading...</p>
                <p>If this persists, the static assets are still being deployed.</p>
              </div>
              <hr style="margin: 30px 0;">
              <p><small>API Status: <a href="/api/health">Health Check</a></small></p>
            </div>
          </body>
        </html>
      `, { 
        status: 200,
        headers: { 'Content-Type': 'text/html' }
      });
    }
  },
};