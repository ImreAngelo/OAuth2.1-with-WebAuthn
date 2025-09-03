NAME=oauth-2.1/authorization-server
VERSION=latest

.PHONY: all build dev

all: build

# Build frontend and backend and build image
build: 
	docker build --target production -f ./Dockerfile -t $(NAME):latest -t $(NAME):version .

# Run frontend with HMR and reverse proxy from backend
# TODO: Use makefile to use docker dev image and pnpm to use local dev in terminal
dev: 
	pnpm run dev