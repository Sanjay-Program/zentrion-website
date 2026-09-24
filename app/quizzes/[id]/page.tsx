import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import QuizEngine from '@/components/QuizEngine';
import { quizzesData } from '@/lib/quizzes-data';

export async function generateStaticParams() {
  return quizzesData.map((quiz) => ({
    id: quiz.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const quiz = quizzesData.find(q => q.id === resolvedParams.id);
  
  if (!quiz) {
    return {
      title: 'Quiz Not Found',
    };
  }

  return {
    title: `${quiz.title} | Zentrion Academy`,
    description: quiz.description,
  };
}

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const quiz = quizzesData.find(q => q.id === resolvedParams.id);

  if (!quiz) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 container-x min-h-screen">
      <nav className="flex items-center gap-2 text-sm text-[rgb(var(--c-mute))] mb-8">
        <Link href="/" className="hover:text-[rgb(var(--c-ink))] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/quizzes" className="hover:text-[rgb(var(--c-ink))] transition-colors">Quizzes</Link>
        <span>/</span>
        <span className="text-[rgb(var(--c-ink))] truncate">{quiz.title}</span>
      </nav>

      <QuizEngine {...quiz} quizId={quiz.id} />
    </div>
  );
}
