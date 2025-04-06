.PHONY: dev-up
dev-up:
	docker-compose -f compose.yml up --build

.PHONY: dev-down
down:
	docker-compose down
