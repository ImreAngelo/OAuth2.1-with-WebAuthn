.PHONY: all build dev

all: docker-up


##########
# Docker #
##########

docker-up:
	docker compose -f '../../docker-compose.yml' up -d --build 'nginx'
