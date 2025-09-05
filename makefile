SERVICES := vault auth-server res-server

.PHONY: all build dev $(SERVICES)

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