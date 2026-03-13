SERVICES := authorization database vault

.PHONY: all build dev $(SERVICES) client test install


all: build-nginx docker-up

##########
# DOCKER #
##########

# Run `make build` at the top level to build all service images
build: $(SERVICES)

# Run `make auth-server` or `make vault` from top-level directory to build specific service
$(SERVICES):
	docker compose -f 'docker-compose.yml' up -d --build '$@'

build-nginx:
	docker buildx bake
nginx: build-nginx 
	docker compose -f 'docker-compose.yml' up -d --build 'vault'

docker-up:
	docker compose -f 'docker-compose.yml' up -d

# TODO: Non-docker devmode with hot reload etc
# dev:
# 	make dev -C ./containers


###########
# CLIENTS #
###########

client: client-python

client-python:
	@if [ ! -d ".venv" ]; then \
		echo "Creating virtual environment..."; \
		python3 -m venv .venv; \
		echo "Installing dependencies from pyproject.toml..."; \
		make bootstrap -C ./clients/python; \
	else \
		make update -C ./clients/python; \
	fi
	. .venv/bin/activate && python3 -m oauth_client
	

#########
# CI/CD #
#########

install:
	pnpm install

# TODO: Fix command, just pnpm test --filter etc.?
test:
	echo "TODO: Implement top-level test command"
# 	make test -C ./containers