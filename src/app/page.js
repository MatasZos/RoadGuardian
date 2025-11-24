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
                        subtitle="let others know where you are"
                          color="blue"
                />

                <ActionCard
                      title="Bike Maintenance"
                        subtitle="Keepy your ride in perfect condition"
                          color="green"
                />
                            </div>

                <section className="p-4 space-y-3">
                  <h3 className="text-lg font-semibold">Recent Activity</h3>

                  <ul className="space-y-2">
                    <ActivityItem
                      icon="✅"
                        text="Maintenence check completed"
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
                            


                      
            





          
    </main>
  );
}
