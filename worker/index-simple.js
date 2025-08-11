// Cloudflare Workers with modern assets configuration
// No need for KV asset handler imports with modern assets config

// Contact form submission handler
async function handleContactSubmission(request, env) {
  try {
    const formData = await request.json();
    
    // Validate required fields
    const { name, email, company, subject, message } = formData;
    
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Missing required fields' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Invalid email format' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // For now, just return success (email integration can be added later)
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Thank you for your message! We will get back to you soon.' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Internal server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    try {
      // API Routes FIRST
      if (url.pathname.startsWith('/api/')) {
        
        // CORS headers for API routes
        const corsHeaders = {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        };

        // Handle preflight requests
        if (request.method === 'OPTIONS') {
          return new Response(null, {
            status: 200,
            headers: corsHeaders
          });
        }

        // Contact form submission
        if (url.pathname === '/api/contact' && request.method === 'POST') {
          const response = await handleContactSubmission(request, env);
          // Add CORS headers to response
          Object.entries(corsHeaders).forEach(([key, value]) => {
            response.headers.set(key, value);
          });
          return response;
        }

        // Health check endpoint
        if (url.pathname === '/api/' || url.pathname === '/api/health') {
          return new Response(JSON.stringify({ 
            message: "Louie Sawyer Portfolio API", 
            status: "healthy",
            timestamp: new Date().toISOString(),
            environment: env.ENVIRONMENT || 'production'
          }), {
            headers: { 
              'Content-Type': 'application/json',
              ...corsHeaders
            }
          });
        }

        // 404 for unknown API routes
        return new Response(JSON.stringify({ 
          error: 'API endpoint not found' 
        }), {
          status: 404,
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        });
      }

      // For static assets, let Cloudflare handle them automatically with the modern assets config
      // This is a fallback that should not normally be reached since assets are served directly
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
              .info { color: #2ecc71; margin: 20px 0; }
              h1 { color: #333; margin-bottom: 20px; }
              .debug { background: #f8f9fa; padding: 20px; margin: 20px 0; text-align: left; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Louie Sawyer</h1>
              <p><strong>Infrastructure Engineer</strong></p>
              <p>12+ Years Experience</p>
              <div class="info">
                <p><strong>Worker is Running</strong></p>
                <p>This fallback page indicates the worker is active.</p>
                <p>Static assets should be served directly by Cloudflare.</p>
              </div>
              <div class="debug">
                <h3>Technical Details:</h3>
                <p><strong>URL:</strong> ${url.pathname}</p>
                <p><strong>Assets Config:</strong> Modern assets configuration in use</p>
                <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
              </div>
              <p><a href="/api/health">API Health Check</a></p>
            </div>
          </body>
        </html>
      `, { 
        status: 200,
        headers: { 'Content-Type': 'text/html' }
      });

    } catch (e) {
      console.error('Worker error:', e);
      
      // Error fallback
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
              .error { color: #e74c3c; margin: 20px 0; }
              h1 { color: #333; margin-bottom: 20px; }
              .debug { background: #f8f9fa; padding: 20px; margin: 20px 0; text-align: left; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Louie Sawyer</h1>
              <p><strong>Infrastructure Engineer</strong></p>
              <p>12+ Years Experience</p>
              <div class="error">
                <p><strong>Portfolio Loading Issue</strong></p>
                <p>There was an error processing the request.</p>
              </div>
              <div class="debug">
                <h3>Technical Details:</h3>
                <p><strong>Error:</strong> ${e.message}</p>
                <p><strong>URL:</strong> ${url.pathname}</p>
                <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
              </div>
              <p><a href="/api/health">API Health Check</a></p>
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