import ListingsSkeleton from "@/components/shared/listings-skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="h-16 bg-card border-b animate-pulse" />
      <div className="h-32 bg-primary/30 animate-pulse" />
      <div className="container mx-auto px-4 py-10">
        <ListingsSkeleton count={6} />
      </div>
    </div>
  );
}
