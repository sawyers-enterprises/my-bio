#!/usr/bin/env python3
"""
Backend Testing Suite for Cloudflare Worker API Endpoints
Tests the Cloudflare Worker implementation with modern assets configuration
"""

import requests
import json
import sys
import os
from datetime import datetime
import time

# Get the backend URL from frontend/.env
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except FileNotFoundError:
        print("❌ Frontend .env file not found")
        return None
    return None

class CloudflareWorkerTester:
    def __init__(self):
        self.base_url = get_backend_url()
        if not self.base_url:
            print("❌ Could not determine backend URL from frontend/.env")
            sys.exit(1)
        
        print(f"🔗 Testing Cloudflare Worker at: {self.base_url}")
        self.results = {
            'health_check': False,
            'contact_form_valid': False,
            'contact_form_missing_fields': False,
            'contact_form_invalid_email': False,
            'cors_preflight': False,
            'api_404': False
        }
        
    def test_health_check(self):
        """Test the /api/health endpoint"""
        print("\n🏥 Testing Health Check Endpoint...")
        
        try:
            # Test /api/health
            response = requests.get(f"{self.base_url}/api/health", timeout=10)
            print(f"   Status Code: {response.status_code}")
            print(f"   Headers: {dict(response.headers)}")
            
            if response.status_code == 200:
                data = response.json()
                print(f"   Response: {json.dumps(data, indent=2)}")
                
                # Verify expected fields
                required_fields = ['message', 'status', 'timestamp']
                if all(field in data for field in required_fields):
                    if data['status'] == 'healthy':
                        print("   ✅ Health check passed - all required fields present")
                        self.results['health_check'] = True
                    else:
                        print(f"   ❌ Health check failed - status is '{data['status']}', expected 'healthy'")
                else:
                    missing = [f for f in required_fields if f not in data]
                    print(f"   ❌ Health check failed - missing fields: {missing}")
            else:
                print(f"   ❌ Health check failed - HTTP {response.status_code}")
                print(f"   Response: {response.text}")
                
        except requests.exceptions.RequestException as e:
            print(f"   ❌ Health check failed - Network error: {e}")
        except json.JSONDecodeError as e:
            print(f"   ❌ Health check failed - Invalid JSON response: {e}")
            
    def test_contact_form_valid(self):
        """Test contact form with valid data"""
        print("\n📧 Testing Contact Form - Valid Submission...")
        
        valid_data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "company": "Tech Solutions Inc",
            "subject": "Partnership Inquiry",
            "message": "Hello Louie, I'm interested in discussing a potential partnership opportunity. Could we schedule a call this week?"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/contact",
                json=valid_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            print(f"   Status Code: {response.status_code}")
            print(f"   Headers: {dict(response.headers)}")
            
            if response.status_code == 200:
                data = response.json()
                print(f"   Response: {json.dumps(data, indent=2)}")
                
                if data.get('success') == True and 'message' in data:
                    print("   ✅ Valid contact form submission passed")
                    self.results['contact_form_valid'] = True
                else:
                    print(f"   ❌ Valid contact form failed - unexpected response format")
            else:
                print(f"   ❌ Valid contact form failed - HTTP {response.status_code}")
                print(f"   Response: {response.text}")
                
        except requests.exceptions.RequestException as e:
            print(f"   ❌ Valid contact form failed - Network error: {e}")
        except json.JSONDecodeError as e:
            print(f"   ❌ Valid contact form failed - Invalid JSON response: {e}")
            
    def test_contact_form_missing_fields(self):
        """Test contact form with missing required fields"""
        print("\n📧 Testing Contact Form - Missing Required Fields...")
        
        invalid_data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            # Missing subject and message
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/contact",
                json=invalid_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            print(f"   Status Code: {response.status_code}")
            
            if response.status_code == 400:
                data = response.json()
                print(f"   Response: {json.dumps(data, indent=2)}")
                
                if data.get('success') == False and 'error' in data:
                    if 'missing' in data['error'].lower() or 'required' in data['error'].lower():
                        print("   ✅ Missing fields validation passed")
                        self.results['contact_form_missing_fields'] = True
                    else:
                        print(f"   ❌ Missing fields validation failed - wrong error message")
                else:
                    print(f"   ❌ Missing fields validation failed - unexpected response format")
            else:
                print(f"   ❌ Missing fields validation failed - expected HTTP 400, got {response.status_code}")
                print(f"   Response: {response.text}")
                
        except requests.exceptions.RequestException as e:
            print(f"   ❌ Missing fields validation failed - Network error: {e}")
        except json.JSONDecodeError as e:
            print(f"   ❌ Missing fields validation failed - Invalid JSON response: {e}")
            
    def test_contact_form_invalid_email(self):
        """Test contact form with invalid email format"""
        print("\n📧 Testing Contact Form - Invalid Email Format...")
        
        invalid_data = {
            "name": "John Smith",
            "email": "invalid-email-format",
            "subject": "Test Subject",
            "message": "Test message content"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/contact",
                json=invalid_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            print(f"   Status Code: {response.status_code}")
            
            if response.status_code == 400:
                data = response.json()
                print(f"   Response: {json.dumps(data, indent=2)}")
                
                if data.get('success') == False and 'error' in data:
                    if 'email' in data['error'].lower() and ('invalid' in data['error'].lower() or 'format' in data['error'].lower()):
                        print("   ✅ Invalid email validation passed")
                        self.results['contact_form_invalid_email'] = True
                    else:
                        print(f"   ❌ Invalid email validation failed - wrong error message")
                else:
                    print(f"   ❌ Invalid email validation failed - unexpected response format")
            else:
                print(f"   ❌ Invalid email validation failed - expected HTTP 400, got {response.status_code}")
                print(f"   Response: {response.text}")
                
        except requests.exceptions.RequestException as e:
            print(f"   ❌ Invalid email validation failed - Network error: {e}")
        except json.JSONDecodeError as e:
            print(f"   ❌ Invalid email validation failed - Invalid JSON response: {e}")
            
    def test_cors_preflight(self):
        """Test CORS preflight requests"""
        print("\n🌐 Testing CORS Preflight Requests...")
        
        try:
            response = requests.options(
                f"{self.base_url}/api/contact",
                headers={
                    'Origin': 'https://example.com',
                    'Access-Control-Request-Method': 'POST',
                    'Access-Control-Request-Headers': 'Content-Type'
                },
                timeout=10
            )
            
            print(f"   Status Code: {response.status_code}")
            print(f"   Headers: {dict(response.headers)}")
            
            if response.status_code == 200:
                headers = response.headers
                cors_headers = [
                    'Access-Control-Allow-Origin',
                    'Access-Control-Allow-Methods',
                    'Access-Control-Allow-Headers'
                ]
                
                if all(header in headers for header in cors_headers):
                    print("   ✅ CORS preflight passed - all required headers present")
                    self.results['cors_preflight'] = True
                else:
                    missing = [h for h in cors_headers if h not in headers]
                    print(f"   ❌ CORS preflight failed - missing headers: {missing}")
            else:
                print(f"   ❌ CORS preflight failed - HTTP {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            print(f"   ❌ CORS preflight failed - Network error: {e}")
            
    def test_api_404(self):
        """Test unknown API endpoint returns 404"""
        print("\n🔍 Testing Unknown API Endpoint (404)...")
        
        try:
            response = requests.get(f"{self.base_url}/api/nonexistent", timeout=10)
            
            print(f"   Status Code: {response.status_code}")
            
            if response.status_code == 404:
                try:
                    data = response.json()
                    print(f"   Response: {json.dumps(data, indent=2)}")
                    
                    if 'error' in data:
                        print("   ✅ API 404 handling passed")
                        self.results['api_404'] = True
                    else:
                        print("   ❌ API 404 handling failed - no error field in response")
                except json.JSONDecodeError:
                    print("   ❌ API 404 handling failed - non-JSON response")
            else:
                print(f"   ❌ API 404 handling failed - expected HTTP 404, got {response.status_code}")
                print(f"   Response: {response.text}")
                
        except requests.exceptions.RequestException as e:
            print(f"   ❌ API 404 handling failed - Network error: {e}")
            
    def run_all_tests(self):
        """Run all tests and return summary"""
        print("=" * 60)
        print("🚀 CLOUDFLARE WORKER API TESTING SUITE")
        print("=" * 60)
        
        # Run all tests
        self.test_health_check()
        self.test_contact_form_valid()
        self.test_contact_form_missing_fields()
        self.test_contact_form_invalid_email()
        self.test_cors_preflight()
        self.test_api_404()
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST RESULTS SUMMARY")
        print("=" * 60)
        
        passed = sum(self.results.values())
        total = len(self.results)
        
        for test_name, result in self.results.items():
            status = "✅ PASS" if result else "❌ FAIL"
            print(f"   {test_name.replace('_', ' ').title()}: {status}")
            
        print(f"\n🎯 Overall: {passed}/{total} tests passed ({passed/total*100:.1f}%)")
        
        if passed == total:
            print("🎉 All tests passed! Cloudflare Worker is working correctly.")
            return True
        else:
            print("⚠️  Some tests failed. Check the details above.")
            return False

def main():
    """Main test execution"""
    tester = CloudflareWorkerTester()
    success = tester.run_all_tests()
    
    print(f"\n⏰ Test completed at: {datetime.now().isoformat()}")
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()