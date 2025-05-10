COMPOSE := PUID=(shell id -u) PGID=(shell id -g) docker compose 
COMPOSE_DEV  := $(COMPOSE) -f compose.yml

.PHONY: dev-up
dev-up:
	$(COMPOSE_DEV) watch

.PHONY: dev-down
dev-down:
	$(COMPOSE_DEV) down -v --remove-orphans

