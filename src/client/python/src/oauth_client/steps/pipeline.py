def run() -> bool:
    pkce = "abcde"

    print(f"PKCE Secret: {pkce}")
    print(f"PKCE Verifier: {pkce}")

    print("\nPress any key to open login page with generated (TODO: or re-roll) values...")

    return True

    # TODO: Show when new tokens are loaded etc.
    # while True:
    #     pass
