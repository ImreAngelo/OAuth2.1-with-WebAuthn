import http.server
import socketserver
import webbrowser
import urllib.parse

AUTH_SERVER_URL = "https://auth.site.localhost/"
CLIENT_ID = "my-client-id"
REDIRECT_URI_DEEP_LINK = "todo" # "https://example.com/callback"
REDIRECT_URI_LOCAL = "http://localhost:8080/callback"

# Hardcoded PKCE challenge just for demo
CODE_CHALLENGE = "abcdef123456"


def build_auth_url(redirect_uri):
    return (
        f"{AUTH_SERVER_URL}?response_type=code"
        f"&client_id={CLIENT_ID}"
        f"&redirect_uri={urllib.parse.quote(redirect_uri)}"
        f"&code_challenge={CODE_CHALLENGE}"
        f"&code_challenge_method=plain"
    )


def deep_link_flow():
    url = build_auth_url(REDIRECT_URI_DEEP_LINK)
    print("Opening browser for Deep Link flow...")
    webbrowser.open(url)
    auth_code = input("Paste the 'code' query parameter from the redirected URL: ").strip()
    print(f"Received auth code: {auth_code}")


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


def local_server_flow():
    url = build_auth_url(REDIRECT_URI_LOCAL)
    print("Opening browser for Local Server flow...")
    webbrowser.open(url)

    with socketserver.TCPServer(("", 8080), OAuthHandler) as httpd:
        print("Listening on port 8080 for callback...")
        httpd.handle_request()  # handle only one request


if __name__ == "__main__":
    choice = input("Choose flow (1 = Deep Link, 2 = Local Server): ").strip()
    if choice == "1":
        deep_link_flow()
    elif choice == "2":
        local_server_flow()
    else:
        print("Invalid choice.")
