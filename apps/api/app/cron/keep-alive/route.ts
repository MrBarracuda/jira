import { database, eq } from '@repo/database';
import { page } from '@repo/database/schema';

export const GET = async () => {
  const [newPage] = await database
    .insert(page)
    .values({ name: 'cron-temp' })
    .returning();

  await database.delete(page).where(eq(page.id, newPage.id));

  return new Response('OK', { status: 200 });
};
