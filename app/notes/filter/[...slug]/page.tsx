import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';
import { notFound } from 'next/navigation';

interface NotePageProps {
  params: { slug?: string[] };
}

export default async function NotePage({ params }: NotePageProps) {
  const slug = params.slug ?? [];
  const category = slug[0] && slug[0] !== 'all' ? slug[0] : undefined;

  const queryClient = new QueryClient();
  const notesData = await fetchNotes('', 1, 10, category);

  if (!notesData.notes || notesData.notes.length === 0) {
    notFound();
  }

  await queryClient.prefetchQuery({
    queryKey: ['notes', { search: '', tag: category, page: 1 }],
    queryFn: () => fetchNotes('', 1, 10, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient category={category} />
    </HydrationBoundary>
  );
}
