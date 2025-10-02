NAME=oauth-2.1/authorization-server
VERSION=latest

.PHONY: all build dev install test

all: docker-up

# Build frontend and backend and build image
build: 
	docker build --target production -f ./Dockerfile -t $(NAME):latest -t $(NAME):version .

# Run frontend with HMR and reverse proxy from backend
# TODO: Use makefile to use docker dev image and pnpm to use local dev in terminal
dev: 
	pnpm run dev

docker-up:
	docker compose -f '../../docker-compose.yml' up -d --build 'authorization'


#########
# CI/CD #
#########

install:
	cd backend && pnpm install --frozen-lockfile

test:
	cd backend && pnpm test
	cd backend && pnpm test:coverage