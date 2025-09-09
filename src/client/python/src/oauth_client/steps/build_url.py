import urllib.parse

# method = 'plain' or 'S256'
def build_url(server_url: str, client_id: str, redirect_uri: str, challenge: str) -> str:
    return (
            f"{server_url}?response_type=code"
            f"&client_id={client_id}"
            f"&redirect_uri={urllib.parse.quote(redirect_uri)}"
            f"&code_challenge={challenge}"
            f"&code_challenge_method=S256"
        )