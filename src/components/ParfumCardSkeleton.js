// src/components/ParfumCardSkeleton.js
export default function ParfumCardSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 h-full flex flex-col">
      <div className="relative w-full aspect-square bg-gray-200 dark:bg-gray-700 animate-pulse" />
      <div className="p-4 flex-grow flex flex-col">
        <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
        <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
        <div className="mt-auto pt-2">
          <div className="h-5 w-1/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}