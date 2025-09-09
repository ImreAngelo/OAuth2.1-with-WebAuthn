import os
import base64
import hashlib

def generate_pkce_pair(length: int = 64) -> tuple[str, str]:
    '''
    Generate a PKCE code verifier and code challenge pair.

    Args:
        length (int): Length of the verifier (between 43 and 128).
                      Default is 64.

    Returns:
        (verifier, challenge): A tuple containing the code verifier
                               and the corresponding code challenge.
    '''
    if not 43 <= length <= 128:
        raise ValueError("Verifier length must be between 43 and 128 characters.")

    # Generate random verifier
    verifier = base64.urlsafe_b64encode(os.urandom(length)).decode("utf-8")
    verifier = verifier.rstrip("=")  # remove padding
    verifier = verifier[:length]     # enforce length

    # Create challenge using SHA256
    challenge = hashlib.sha256(verifier.encode("utf-8")).digest()
    challenge = base64.urlsafe_b64encode(challenge).decode("utf-8").rstrip("=")

    return verifier, challenge