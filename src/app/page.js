import Link from "next/link";
import Image from "next/image";
function ActionCard({ title, subtitle, color }) {
  return (
    <div className={`p-4 rounded-lg border bg-${color}-100`}>
      <h4 className="font-bold">{title}</h4>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  );
}

function ActivityItem({ icon, text, time }) {
  return (
    <li className="flex items-center space-x-2">
      <span>{icon}</span>
      <span>{text}</span>
      <span className="text-xs text-gray-400">{time}</span>
    </li>
  );
}

function NavItem({ label, icon, active }) {
  return (
    <button
      className={`flex flex-col items-center ${
        active ? "text-blue-600 font-bold" : "text-gray-500"
      }`}
    >
      <span>{icon}</span>
      <span className="text-xs">{label}</span>
    </button>
  );
}
export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen p-6">
      <h1 className="font-semibold text-3xl mb-4">RoadGuardian</h1>

      <button aria-label="Notifications" className="mb-4">
        <Image
          src="/images/notification-bell.svg"
          width={24}
          height={24}
          alt="Notifications"
        />
      </button>

      <p className="mb-4">
        <Link href="/login" className="text-blue-600 underline">
          Login here.
        </Link>
      </p>

      <Image
        src="/images/roadguardianlogo.jpg"
        width={500}
        height={500}
        alt="RoadGuardian Logo"
        className="mb-6"
      />

      <h2 className="text-2xl font-bold mb-2">
        Because Every Rider Needs A Guardian
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        Emergency assistance and maintenance tracking for every journey
      </p>
      <section className="p-4 space-y-3 bg-gray-50 rounded-lg mb-6">
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

      {/* Recent Activity */}
      <section className="p-4 space-y-3 bg-gray-50 rounded-lg mb-6">
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
