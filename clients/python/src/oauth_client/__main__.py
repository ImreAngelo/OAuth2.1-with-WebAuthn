from .steps.pipeline import run

def main() -> int:
    return 0 if run() else 1

if __name__ == "__main__":
    raise SystemExit(main())