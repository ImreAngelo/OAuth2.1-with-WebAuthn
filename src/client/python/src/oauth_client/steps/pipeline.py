from ..ui.clear_terminal import clear_terminal
from ..ui.banner import show_banner
from ..ui.instructions import print_instructions
from ..steps.reroll import reroll_values
from .pkce import generate_pkce_pair

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

    # TODO: Show when new tokens are loaded etc.
    # while True:
    #     pass

    return True