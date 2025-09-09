import os

def clear_terminal():
    """Clears the terminal screen based on the operating system."""
    if os.name == 'nt': # For Windows
        _ = os.system('cls')
    else: # For Unix-like systems (Linux, macOS)
        _ = os.system('clear')