import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main>
      <h1 "font-semibold">RoadGuardian</h1>
      <button aria-label="Notifications">
        <span>src="/images/notification-bell.svg"</span>
    </button>
    
      <p>
        <Link href="/login">Login here.</Link>
      </p>
      <Image
        src="/images/roadguardianlogo.jpg"
        width={500}
        height={500}
        alt="RoadGuardian Logo"
      />
          <h2 className="text-2xl font-bold">Because Every Rider Needs A Guardian</h2>
          <p className="text-gray-500 text-sm">
            Emergency assistance and maintenance tracking for every journey
          </p>
          </div>





          
    </main>
  );
}
