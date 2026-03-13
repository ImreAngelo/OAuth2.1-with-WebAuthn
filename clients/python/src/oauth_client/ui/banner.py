import pyfiglet
from rich.console import Console

console = Console()

def show_banner(text: str, color: str = "cyan") -> None:
    """
    Print a colored ASCII banner in the CLI using pyfiglet and rich.
    """
    ascii_logo = pyfiglet.figlet_format(text)
    console.print(f"[bold {color}]{ascii_logo}[/bold {color}]")