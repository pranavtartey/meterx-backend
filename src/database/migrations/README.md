# Migrations

This directory contains TypeORM migration files.

## Commands

Generate a new migration:
```bash
yarn migration:generate src/database/migrations/MigrationName
```

Run migrations:
```bash
yarn migration:run
```

Revert last migration:
```bash
yarn migration:revert
```
