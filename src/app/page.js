import Link from "next/link";
import Image from "next/image";
export default function HomePage() {
  return (
    <main>
      <h1>Home</h1>
      <p>
        <Link href="/login">Login here.</Link>
      </p>
    <Image
      src="/images/roadguardianlogo.jpg"
      width={500}
      height={500}
      alt="Picture of the author"
    />
    </main>
  );
}
