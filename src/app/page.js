import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main>
      <h1 className="font-semibold">RoadGuardian</h1>

      <button aria-label="Notifications">
        <Image
          src="/images/notification-bell.svg"
          width={24}
          height={24}
          alt="Notifications"
        />
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

      <section className="p-4 space-y-3">
        <h3 className="text-lg font-semibold">Quick Actions</h3>
        <div className="space-y-3">
          <ActionCard
            title="Emergency Alert"
            subtitle="Instant help when you need it"
            color="red"
          />
          <ActionCard
            title="Share Location"
            subtitle="Let others know where you are"
            color="blue"
          />
          <ActionCard
            title="Bike Maintenance"
            subtitle="Keep your ride in perfect condition"
            color="green"
          />
        </div>
      </section>

      <section className="p-4 space-y-3">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <ul className="space-y-2">
          <ActivityItem
            icon="✅"
            text="Maintenance check completed"
            time="2 hours ago"
          />
          <ActivityItem
            icon="📍"
            text="Location shared with group"
            time="1 day ago"
          />
          <ActivityItem
            icon="🛠️"
            text="Oil change reminder"
            time="3 days ago"
          />
        </ul>
      </section>

      <nav className="mt-auto border-t flex justify-around py-3 bg-white">
        <NavItem label="Home" icon="🏠" active />
        <NavItem label="Emergency" icon="🚨" />
        <NavItem label="Location" icon="📍" />
        <NavItem label="Maintenance" icon="🛠️" />
        <NavItem label="Profile" icon="👤" />
      </nav>
    </main>
  );
}
