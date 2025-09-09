from .ui.clear_terminal import clear_terminal
from .ui.banner import show_banner
from .steps.pipeline import run

def main() -> int:
    clear_terminal()
    show_banner()

    print("""Instructions: \n""")
    
    return 0 if run() else 1

if __name__ == "__main__":
    raise SystemExit(main())