// src/components/ParfumListSkeleton.js
import ParfumCardSkeleton from "./ParfumCardSkeleton";

// Skeleton untuk grid utama
export function ParfumListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <ParfumCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Skeleton untuk homepage
export function RecentParfumsSkeleton() {
   return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <ParfumCardSkeleton key={i} />
      ))}
    </div>
  );
}