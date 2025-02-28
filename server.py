#!/usr/bin/env python3
"""
Simple HTTP Server for testing the website locally.
"""

import http.server
import socketserver
import os

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom request handler to properly handle file types"""
    
    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()
    
    def guess_type(self, path):
        """Override to add additional MIME types"""
        content_type = super().guess_type(path)
        # Handle common web file types
        if path.endswith('.js'):
            return 'application/javascript'
        elif path.endswith('.css'):
            return 'text/css'
        elif path.endswith('.html'):
            return 'text/html'
        elif path.endswith('.json'):
            return 'application/json'
        elif path.endswith('.mp4'):
            return 'video/mp4'
        elif path.endswith('.gif'):
            return 'image/gif'
        elif path.endswith('.jpg') or path.endswith('.jpeg'):
            return 'image/jpeg'
        elif path.endswith('.png'):
            return 'image/png'
        return content_type


def run_server():
    """Run the server with the custom handler"""
    handler = MyHTTPRequestHandler
    
    # Ensure we're in the correct directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"Serving at http://localhost:{PORT}")
        print(f"Press Ctrl+C to stop the server")
        httpd.serve_forever()


if __name__ == "__main__":
    run_server()