dev-up:
	bun --watch index.js

.PHONY: tests
tests:
    bun test --coverage || true

.PHONY: lint
lint:
	bun lint

.PHONY: populate_db
populate_db:
	bun run p