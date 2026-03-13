import http.server
import socketserver
import urllib.parse

class OAuthHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        params = urllib.parse.parse_qs(parsed.query)
        code = params.get("code", [None])[0]

        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        if code:
            self.wfile.write(b"<h1>Authorization successful!</h1>You can close this window.")
            print(f"Received auth code: {code}")
        else:
            self.wfile.write(b"<h1>No code received.</h1>")

def start_listener(port: int = 8080):
    '''Start listening for auth code'''
    with socketserver.TCPServer(("", port), OAuthHandler) as httpd:
        print(f"Listening on port {port} for callback...")
        httpd.handle_request()  # handle only one request