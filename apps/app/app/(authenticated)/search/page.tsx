import { auth } from '@repo/auth/server';
import { database, like } from '@repo/database';
import { page } from '@repo/database/schema';
import { notFound, redirect } from 'next/navigation';
import { Header } from '../components/header';

type SearchPageProperties = {
  searchParams: Promise<{
    q: string;
  }>;
};

export const generateMetadata = async ({
  searchParams,
}: SearchPageProperties) => {
  const { q } = await searchParams;

  return {
    title: `${q} - Search results`,
    description: `Search results for ${q}`,
  };
};

export default async function SearchPage({
  searchParams,
}: SearchPageProperties) {
  const { q } = await searchParams;

  const pages = await database
    .select()
    .from(page)
    .where(like(page.name, `%${q}%`));

  const { orgId } = await auth();

  if (!orgId) {
    notFound();
  }

  if (!q) {
    redirect('/');
  }

  return (
    <>
      <Header pages={['Building Your Application']} page="Search" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {pages.map((page) => (
            <div key={page.id} className="aspect-video rounded-xl bg-muted/50">
              {page.name}
            </div>
          ))}
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </>
  );
}
