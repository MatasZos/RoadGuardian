import Link from 'next/link'
export default function HomePage() {
  return (
    <main>
      <h1>Home</h1>
    <p>
    <Link href = "/login"> Login here </Link>
    </p>
    </main>
  );
}
