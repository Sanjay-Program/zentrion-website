import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-x pt-40 pb-32 text-center min-h-[70vh] flex flex-col items-center justify-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-4 font-display text-5xl font-semibold text-gradient">Signal lost.</h1>
      <p className="mt-4 text-mute max-w-md">
        The page you’re looking for was moved, removed, or never existed. Let’s get you back
        on the grid.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Return Home
      </Link>
    </section>
  );
}
