import { getStaticContent } from '@/app/lib/content';
import ClientPage from './ClientPage';

export const dynamic = 'force-static';

export default async function Home() {
  const { contents, tree } = getStaticContent();
  return <ClientPage staticContent={contents} tree={tree} />;
}
