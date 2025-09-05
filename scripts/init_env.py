#!/usr/bin/env python3
import argparse
import os
import re
from getpass import getpass
from collections import OrderedDict

# --- Configuration -----------------------------------------------------------
# Define environment variables and their default values
CONFIG = OrderedDict({
    "DB_ROOT_PASSWORD": "",
})

# Keys that should be entered via hidden input (no echo in terminal)
HIDDEN_KEYS = {
    "DB_ROOT_PASSWORD",
}

ENV_FILE = ".env"
KEY_RE = re.compile(r"^\s*([A-Za-z_][A-Za-z0-9_]*?)\s*=\s*(.*)\s*$")


# --- Helpers ----------------------------------------------------------------
def color(code: str, text: str) -> str:
    return f"\033[{code}m{text}\033[0m"

def cyan(t):   return color("96", t)
def green(t):  return color("92", t)
def yellow(t): return color("93", t)
def dim(t):    return color("90", t)
def bold(t):   return color("1", t)

def parse_env_lines(lines):
    """
    Parse .env lines into:
      - mapping: dict of key -> (value_str_without_newline, line_index)
      - keep original lines (list) to preserve comments/ordering
    We preserve quotes as-is on write for untouched keys.
    """
    mapping = {}
    for idx, raw in enumerate(lines):
        m = KEY_RE.match(raw.rstrip("\n"))
        if not m:
            continue
        key, value = m.group(1), m.group(2)
        mapping[key] = (value, idx)
    return mapping

def normalize_value_for_write(value: str) -> str:
    """
    Very light-touch normalization:
    - If value contains spaces or #, wrap in double quotes unless already quoted.
    """
    value = str(value)
    if ((" " in value) or ("#" in value)) and not (
        (value.startswith('"') and value.endswith('"'))
        or (value.startswith("'") and value.endswith("'"))
    ):
        return f"\"{value}\""
    return value

def prompt_for_values(base_defaults, use_defaults=False):
    """
    If use_defaults=True, return base_defaults directly.
    Otherwise, interactively prompt (with hidden input for secret keys).
    """
    chosen = {}
    if use_defaults:
        return dict(base_defaults)

    print(bold("Answer each prompt or press Enter to accept the default.\n"))
    for key, default in base_defaults.items():
        default_shown = dim("(hidden)") if key in HIDDEN_KEYS and default else green(default)
        label = f"{cyan(key)} {dim('(secret)') if key in HIDDEN_KEYS else ''}"
        prompt = f"{label} {dim('default:')} {default_shown}\n> "

        if key in HIDDEN_KEYS:
            val = getpass(prompt)
        else:
            val = input(prompt)

        val = val.strip()
        chosen[key] = val if val else default
        print()  # blank line for readability
    return chosen

def read_env_file(path):
    if not os.path.exists(path):
        return [], {}
    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()
    mapping = parse_env_lines(lines)
    return lines, mapping

def write_env_preserving(lines, mapping, updates):
    """
    Update/append keys in `updates` while preserving:
      - comments
      - blank lines
      - unrelated keys
    mapping: key -> (value, idx) derived from existing lines
    """
    new_lines = list(lines)  # copy

    # Overwrite existing keys in-place
    for key, new_val in updates.items():
        if key in mapping:
            _, idx = mapping[key]
            new_lines[idx] = f"{key}={normalize_value_for_write(new_val)}\n"

    # Append missing keys at the end
    for key, new_val in updates.items():
        if key not in mapping:
            new_lines.append(f"{key}={normalize_value_for_write(new_val)}\n")

    with open(ENV_FILE, "w", encoding="utf-8") as f:
        f.writelines(new_lines)

def write_fresh_env(updates):
    with open(ENV_FILE, "w", encoding="utf-8") as f:
        for key, val in updates.items():
            f.write(f"{key}={normalize_value_for_write(val)}\n")


# --- Main -------------------------------------------------------------------
def main():
    parser = argparse.ArgumentParser(description="Generate or update a .env file gracefully.")
    parser.add_argument(
        "-y", "--yes",
        action="store_true",
        help="Use defaults without prompting. "
             "If .env exists, defaults come from existing file; otherwise from hardcoded CONFIG."
    )
    args = parser.parse_args()

    print(bold("🔧 .env generator"))
    print(dim("This tool preserves comments and unknown keys in your existing .env.\n"))

    # Load existing .env (if any)
    lines, existing_map = read_env_file(ENV_FILE)
    env_exists = bool(lines)

    if env_exists:
        print(yellow(f"Found existing {ENV_FILE}."))

        # Decide whether to use existing values as defaults
        use_existing_as_defaults = False
        if args.yes:
            # Non-interactive: follow a safe default (use existing as defaults)
            use_existing_as_defaults = True
            print(dim("Non-interactive mode: using existing values as defaults.\n"))
        else:
            ans = input(
                f"{bold('.env already exists.')} "
                f"{cyan('Use existing values as defaults?')} {dim('[Y/n]')}: "
            ).strip().lower()
            print()
            use_existing_as_defaults = (ans in ("", "y", "yes"))

        # Build the base defaults
        existing_defaults = OrderedDict()
        for key in CONFIG.keys():
            if key in existing_map:
                existing_defaults[key] = existing_map[key][0]
            else:
                # If key not present in file, fall back to hardcoded default
                existing_defaults[key] = CONFIG[key]

        base_defaults = existing_defaults if use_existing_as_defaults else CONFIG

        # Choose values (prompt or use defaults)
        values = prompt_for_values(base_defaults, use_defaults=args.yes)

        # Update the file while preserving everything else
        print(dim("Writing updates without clobbering unrelated lines..."))
        write_env_preserving(lines, existing_map, values)
        print(green("✅ Updated .env successfully."))

    else:
        # No existing file: either prompt or write defaults fresh
        print(dim("No existing .env found. Creating a new one...\n"))
        values = prompt_for_values(CONFIG, use_defaults=args.yes)
        write_fresh_env(values)
        print(green("✅ Created .env successfully."))


if __name__ == "__main__":
    main()
