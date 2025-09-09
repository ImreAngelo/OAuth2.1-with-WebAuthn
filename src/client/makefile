.PHONY: bootstrap test lint type format

VENV?=../.venv
PY?=python3
ACTIVATE=$(VENV)/bin/activate

bootstrap:
	@test -d $(VENV) || $(PY) -m venv $(VENV)
	. $(ACTIVATE) && python -m pip install --upgrade pip && pip install -e ".[dev]"

test:
	. $(ACTIVATE) && pytest

lint:
	. $(ACTIVATE) && ruff check src tests

type:
	. $(ACTIVATE) && mypy src

format:
	. $(ACTIVATE) && ruff format src tests
