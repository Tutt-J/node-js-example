SHELL := /bin/bash

build:
	npm install
	npx sequelize-cli db:migrate
	npx sequelize-cli db:seed:all
	node server.js
.PHONY: tests