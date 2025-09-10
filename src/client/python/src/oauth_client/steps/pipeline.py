from ..ui.banner import show_banner
from ..ui.clear_terminal import clear_terminal
from ..ui.instructions import print_instructions
from .build_url import build_url
from .listen import start_listener
from .pkce import generate_pkce_pair
from .reroll import reroll_values
import webbrowser


AUTH_SERVER_URL = "https://auth.site.localhost/"
CLIENT_ID = "my-client-id"
CALLBACK_PORT = 8080


def run() -> bool:
    loop = True
    while loop:
        clear_terminal()
        show_banner("OAuth 2.1 Client")
        print_instructions()
    
        pkce_verifier, pkce_challenge = generate_pkce_pair(64)

        print(f"PKCE Verifier: {pkce_verifier}")
        print(f"PKCE Challenge: {pkce_challenge}", end="\n\n")
        
        loop = reroll_values("Proceed with current values?")
        
        if loop == None:
            return False
        
    # Open OAuth login page
    # TODO: Refactor and move into separate file(s)
    # TODO: Implement deep link flow
    print("\nStarting callback server...\n(Deep links are not implemented yet)\n")
    
    url = build_url(
        server_url=AUTH_SERVER_URL,
        client_id=CLIENT_ID,
        challenge=pkce_challenge,
        redirect_uri=f"http://localhost:{CALLBACK_PORT}/callback",
        # state=uuid
    )

    # TODO: Fix permission issues in WSL
    webbrowser.open(url)

    start_listener(CALLBACK_PORT)

    # TODO: Show loading animation

    # TODO: Show when new tokens are loaded etc.
    # while True:
    #     pass

    return True