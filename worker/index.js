// Cloudflare Worker for Louie Sawyer Portfolio
// Handles both frontend serving and backend API endpoints

import { getAssetFromKV, serveSinglePageApp } from '@cloudflare/kv-asset-handler';

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

    // Send email notification (using Resend or SendGrid)
    const emailContent = {
      to: 'louie@sawyers-enterprises.co.uk', // Louie's business email - CORRECTED TO PLURAL
      from: 'noreply@sawyers-enterprises.co.uk', // Your domain - CORRECTED TO PLURAL
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Portfolio Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        
        <hr>
        <p>Submitted at: ${new Date().toISOString()}</p>
      `
    };

    // Example using Resend API (replace with your preferred email service)
    if (env.RESEND_API_KEY) {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailContent)
      });

      if (!emailResponse.ok) {
        console.error('Email sending failed:', await emailResponse.text());
      }
    }

    // Store in KV for backup (optional)
    if (env.PORTFOLIO_KV) {
      const submissionId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await env.PORTFOLIO_KV.put(submissionId, JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString(),
        ip: request.headers.get('CF-Connecting-IP')
      }));
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Thank you for your message! Louie will get back to you soon.' 
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

// Main worker function
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    try {
      // API Routes
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
          const newResponse = new Response(response.body, response);
          Object.entries(corsHeaders).forEach(([key, value]) => {
            newResponse.headers.set(key, value);
          });
          return newResponse;
        }

        // Health check endpoint
        if (url.pathname === '/api/' || url.pathname === '/api/health') {
          return new Response(JSON.stringify({ 
            message: "Louie Sawyer Portfolio API", 
            status: "healthy",
            timestamp: new Date().toISOString()
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

      // Serve React frontend static files
      const options = {
        // Handle React Router - serve index.html for non-asset routes
        mapRequestToAsset: serveSinglePageApp,
      };

      return await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        options
      );

    } catch (e) {
      console.error('Worker error:', e);
      
      // If asset not found, serve index.html (React Router fallback)
      try {
        return await getAssetFromKV({
          request: new Request(`${url.origin}/index.html`, request),
          waitUntil: ctx.waitUntil.bind(ctx),
        });
      } catch (assetError) {
        return new Response(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Louie Sawyer - Infrastructure Engineer</title>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
                       padding: 40px; text-align: center; background: #f5f5f5; }
                .error { background: white; padding: 40px; border-radius: 8px; 
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 400px; 
                        margin: 0 auto; }
              </style>
            </head>
            <body>
              <div class="error">
                <h1>Portfolio Loading...</h1>
                <p>Please wait while we prepare the site.</p>
              </div>
            </body>
          </html>
        `, { 
          status: 200,
          headers: { 'Content-Type': 'text/html' }
        });
      }
    }
  },
};