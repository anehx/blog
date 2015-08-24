install:
	@npm i && bower i

build:
	@broccoli build dist

watch:
	@broccoli serve --host 0.0.0.0
