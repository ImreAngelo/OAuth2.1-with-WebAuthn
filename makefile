SERVICES := vault auth-server res-server

.PHONY: all build dev $(SERVICES) client test install

all: build


##########
# DOCKER #
##########

# Run `make build` at the top level to build all service images
build: $(SERVICES)

# Run `make auth-server` or `make vault` from top-level directory to build specific service
$(SERVICES):
	$(MAKE) -C src/$@

dev:
	cd ./src/auth-server && pnpm run dev


##########
# CLIENT #
##########

# python3 ./src/client/python/main.py
client:
	python3 -m oauth_client

	
#########
# CI/CD #
#########

install:
	cd ./src/auth-server/backend && pnpm install --frozen-lockfile

test:
	cd ./src/auth-server/backend && pnpm test
	cd ./src/auth-server/backend && pnpm test:coverage