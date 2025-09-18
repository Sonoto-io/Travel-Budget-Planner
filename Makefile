PUID := $(shell id -u)
PGID := $(shell id -g)
COMPOSE := PUID=$(PUID) PGID=$(PGID) docker-compose
COMPOSE_PROD := $(COMPOSE) -f compose.prod.yml
COMPOSE_DEV  := $(COMPOSE) -f compose.yml

# PROD

.PHONY: prod-up
prod-up:
	MOCKS_ENABLED=false $(COMPOSE_PROD) up --build -d

# DEV

.PHONY: dev-up
dev-up:
	MOCKS_ENABLED=false $(COMPOSE_DEV) watch

.PHONY: dev-up-mocks
dev-up-mocks:
	MOCKS_ENABLED=true $(COMPOSE_DEV) watch

.PHONY: dev-down
dev-down:
	$(COMPOSE_DEV) down -v --remove-orphans

.PHONY: dev-reset
dev-reset:
	make dev-down
	make dev-up