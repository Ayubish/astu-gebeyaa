import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-border bg-card">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-xl bg-primary/5 p-1 ring-1 ring-primary/10">
                <Image src="/images/gebeyalogo.svg" alt="ASTU Gebeya" fill className="object-contain p-0.5" />
              </div>
              <span className="text-lg font-bold text-primary">ASTU Gebeya</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Your trusted campus marketplace for buying and selling items among ASTU students.
              Safe, local, and built for the university community.
            </p>
            <p className="text-muted-foreground/60 text-xs mt-4">
              Web Programming — Final Group Project
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/categories" className="hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/browse" className="hover:text-primary transition-colors">
                  Browse All
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-primary transition-colors">
                  Sell an Item
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-primary transition-colors">
                  Saved Items
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Account
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/auth/login" className="hover:text-primary transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-primary transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/dashboard/profile" className="hover:text-primary transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ASTU Gebeya. All rights reserved.</p>
          <p className="text-xs">Made for the ASTU community</p>
        </div>
      </div>
    </footer>
  );
}
