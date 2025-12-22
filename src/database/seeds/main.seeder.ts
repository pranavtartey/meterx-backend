import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

/**
 * Main seeder entry point
 *
 * This seeder runs all other seeders in the correct order.
 * Add new seeders to the `run` method below.
 *
 * Usage: yarn seed
 *
 * File Naming Convention:
 * - Format: YYYYMMDDHHMMSS-description.seeder.ts
 * - Example: 20241215120000-add-default-roles.seeder.ts
 */
export default class MainSeeder implements Seeder {
  // eslint-disable-next-line @typescript-eslint/require-await
  async run(dataSource: DataSource): Promise<void> {
    // Import and run seeders in order
    // Example:
    // import { runSeeder } from 'typeorm-extension';
    // await runSeeder(dataSource, RoleSeeder);
    // await runSeeder(dataSource, AdminUserSeeder);

    console.log(
      `Main seeder completed (dataSource: ${dataSource.options.database}). Add your seeders above.`,
    );
  }
}
