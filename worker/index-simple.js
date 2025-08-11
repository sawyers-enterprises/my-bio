// Cloudflare Workers with modern assets configuration

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
    
    // Only handle API routes - let Cloudflare serve static assets automatically
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

    // For all non-API routes, let Cloudflare serve static assets
    // This should not be reached as Cloudflare handles static assets automatically
    // with the modern assets configuration
    return env.ASSETS.fetch(request);
  },
};