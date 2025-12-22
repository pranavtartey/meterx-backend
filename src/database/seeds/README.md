# Database Seeds

This folder contains database seeders for initial data setup.

## Naming Convention

```
YYYYMMDDHHMMSS-description.seeder.ts

Examples:
- 20241215120000-add-default-roles.seeder.ts
- 20241215120100-add-admin-user.seeder.ts
```

## Creating a New Seeder

```bash
# Create seeder file manually or use:
yarn seed:create src/database/seeds/RoleSeeder
```

## Seeder Template

```typescript
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class RoleSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(YourEntity);

    // Check if already seeded (idempotent)
    const existing = await repository.findOne({ where: { name: 'admin' } });
    if (existing) {
      console.log('RoleSeeder: Already seeded, skipping.');
      return;
    }

    // Insert data
    await repository.insert([
      { name: 'admin' },
      { name: 'user' },
    ]);

    console.log('RoleSeeder: Completed.');
  }
}
```

## Running Seeders

```bash
# Run all seeders
yarn seed

# Seeders run through main.seeder.ts
# Add your seeder to main.seeder.ts:
# await runSeeder(dataSource, YourSeeder);
```

## Important Rules

1. **Idempotent**: Always check if data exists before inserting
2. **Order matters**: Add seeders to main.seeder.ts in dependency order
3. **No delete in production**: Only seed new data, never modify existing
