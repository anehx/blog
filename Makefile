install:
	@cd frontend && npm i && bower i

build:
	@cd frontend && broccoli build dist

watch:
	@cd frontend && broccoli serve --host 0.0.0.0 --port 1337

run-backend:
	@php -S localhost:9999 -t backend
