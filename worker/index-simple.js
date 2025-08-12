// Cloudflare Workers Site with proper KV asset handler
import { getAssetFromKV, serveSinglePageApp } from '@cloudflare/kv-asset-handler';

// Contact form submission handler with Resend integration
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

    // Send email via Resend API
    if (env.RESEND_API_KEY) {
      try {
        // Prepare email template
        const emailHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Contact Form Submission - Louie Sawyer Portfolio</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
              .content { background: #ffffff; padding: 30px; border: 1px solid #e1e5e9; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
              .field { margin-bottom: 20px; }
              .label { font-weight: 600; color: #4a5568; margin-bottom: 8px; display: block; }
              .value { padding: 12px; background: #f7fafc; border-left: 4px solid #667eea; border-radius: 4px; }
              .message-content { white-space: pre-wrap; font-family: inherit; }
              .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e1e5e9; color: #718096; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Portfolio Website Contact Form</p>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">From:</span>
                <div class="value"><strong>${name}</strong> &lt;${email}&gt;</div>
              </div>
              ${company ? `<div class="field">
                <span class="label">Company:</span>
                <div class="value">${company}</div>
              </div>` : ''}
              <div class="field">
                <span class="label">Subject:</span>
                <div class="value">${subject}</div>
              </div>
              <div class="field">
                <span class="label">Message:</span>
                <div class="value message-content">${message}</div>
              </div>
              <div class="footer">
                <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-GB', { 
                  timeZone: 'Europe/London',
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
                <p><strong>From:</strong> Portfolio Contact Form (sawyers-enterprises.co.uk)</p>
              </div>
            </div>
          </body>
          </html>
        `;

        // Send email via Resend API
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'noreply@sawyers-enterprises.co.uk',
            to: ['louie@sawyers-enterprises.co.uk'],
            subject: `Portfolio Contact: ${subject}`,
            html: emailHtml,
            reply_to: email
          }),
        });

        if (resendResponse.ok) {
          const resendData = await resendResponse.json();
          console.log('Email sent successfully:', resendData.id);
          
          return new Response(JSON.stringify({ 
            success: true, 
            message: 'Thank you for your message! I will get back to you soon.',
            emailId: resendData.id
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        } else {
          const errorData = await resendResponse.json();
          console.error('Resend API error:', errorData);
          
          // Still return success to user, but log the error
          return new Response(JSON.stringify({ 
            success: true, 
            message: 'Thank you for your message! I will get back to you soon.' 
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }

      } catch (emailError) {
        console.error('Email sending error:', emailError);
        
        // Return success to user even if email fails
        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Thank you for your message! I will get back to you soon.' 
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } else {
      // No API key configured, just return success
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Thank you for your message! I will get back to you soon.' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

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
    
    // Handle API routes first
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

    // Handle static assets using KV asset handler
    try {
      return await getAssetFromKV({
        request,
        waitUntil: (promise) => ctx.waitUntil(promise),
      }, {
        ASSET_NAMESPACE: env.__STATIC_CONTENT,
        mapRequestToAsset: serveSinglePageApp,
        cacheControl: {
          browserTTL: 60 * 60 * 24, // 24 hours
          edgeTTL: 60 * 60 * 24 * 7, // 7 days
        },
      });
    } catch (e) {
      console.error('Asset loading error:', e);
      
      // Fallback: try to serve index.html for React Router
      try {
        return await getAssetFromKV({
          request: new Request(`${url.origin}/index.html`, request),
          waitUntil: (promise) => ctx.waitUntil(promise),
        }, {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
        });
      } catch (fallbackError) {
        console.error('Fallback asset error:', fallbackError);
        
        // Final fallback with basic HTML
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
                  <p><strong>Asset Loading Issue</strong></p>
                  <p>The React portfolio could not be loaded from the KV store.</p>
                </div>
                <div class="debug">
                  <h3>Debug Information:</h3>
                  <p><strong>Primary Error:</strong> ${e.message}</p>
                  <p><strong>Fallback Error:</strong> ${fallbackError.message}</p>
                  <p><strong>URL:</strong> ${url.pathname}</p>
                  <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
                </div>
                <p><a href="/api/health">API Health Check</a></p>
                <p><em>If you're seeing this, the KV namespace may not be properly bound or assets not uploaded.</em></p>
              </div>
            </body>
          </html>
        `, { 
          status: 500,
          headers: { 'Content-Type': 'text/html' }
        });
      }
    }
  },
};