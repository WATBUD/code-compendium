import { getStaticContent } from '@/app/lib/content';
import ClientPage from './page.client';

export const dynamic = 'force-static';

export default async function Home() {
  const staticContent = getStaticContent();
  return <ClientPage staticContent={staticContent} />;
} 