import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-3">ASTU Gebeya</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Your trusted campus marketplace for buying and selling items among ASTU students.
            </p>
            <p className="text-primary-foreground/50 text-xs mt-3">
              Web Programming — Final Group Project
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link href="/categories" className="hover:text-primary-foreground transition">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/browse" className="hover:text-primary-foreground transition">
                  Browse All
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-primary-foreground transition">
                  Sell an Item
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-primary-foreground transition">
                  Saved Items
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Account</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link href="/auth/login" className="hover:text-primary-foreground transition">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-primary-foreground transition">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/dashboard/profile" className="hover:text-primary-foreground transition">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6 text-center text-sm text-primary-foreground/60">
          &copy; {new Date().getFullYear()} ASTU Gebeya. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
