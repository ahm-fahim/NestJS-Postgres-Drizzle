import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { Pool } from 'pg';

export const DRIZZLE = Symbol('drizzle-connection');

@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const databaseURL = configService.get<string>('DATABASE_URL');

        if (!databaseURL) {
          throw new Error(
            'DATABASE_URL is not defined in environment variables',
          );
        }

        const pool = new Pool({
          connectionString: databaseURL,
          ssl: { rejectUnauthorized: false }, // Ensuring SSL works properly
        });

        return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
