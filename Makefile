.PHONY: help install dev build start electron electron-build electron-dev docker docker-up docker-down db db-migrate db-generate lint test clean push commit run

help:
	@echo "Noted - Makefile Commands"
	@echo "========================="
	@echo "make install          - Install dependencies"
	@echo "make dev              - Start Next.js dev server"
	@echo "make build            - Build Next.js for production"
	@echo "make start            - Start production server"
	@echo "make electron         - Run Electron app (after dev server)"
	@echo "make electron-build   - Build Electron app"
	@echo "make electron-dev     - Run Next.js + Electron in dev mode"
	@echo "make docker           - Start Docker services"
	@echo "make docker-up        - Start Docker services"
	@echo "make docker-down      - Stop Docker services"
	@echo "make db               - Run Prisma Studio"
	@echo "make db-migrate       - Apply database migrations"
	@echo "make db-generate      - Generate Prisma client"
	@echo "make lint             - Run ESLint"
	@echo "make clean            - Clean build artifacts"
	@echo "make push             - Push to GitHub"
	@echo "make commit           - Commit and push changes"
	@echo "make run              - Run Docker + dev server"

install:
	pnpm install

dev:
	pnpm dev

build:
	pnpm build

start:
	pnpm start

electron:
	@echo "Run 'make dev' in one terminal, then 'make electron' in another"

electron-build:
	pnpm electron:build

electron-dev:
	pnpm electron:dev

docker docker-up:
	docker compose up -d

docker-down:
	docker compose down

db:
	npx prisma studio

db-migrate:
	npx prisma migrate dev

db-generate:
	npx prisma generate

lint:
	pnpm lint

test:
	@echo "No tests configured yet"

clean:
	rm -rf .next
	rm -rf dist-electron

push:
	git push

commit MSG:
	git add . && git commit -m "$(MSG)" && git push

run:
	./run.sh