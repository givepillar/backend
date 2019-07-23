API=graphql_app_1

db/up:
	docker exec $(API) npx knex-migrate up

db/rollback:
	docker exec $(API) npx knex-migrate rollback

db/down:
	docker exec $(API) npx knex-migrate down --to 0

build:
	docker-compose up --build

start:
	docker-compose up