// src/components/RecentParfums.js
import { fetchParfums } from "@/lib/api";
import ParfumCardAnimated from "@/components/ParfumCardAnimated";

export default async function RecentParfums() {
  const parfumResponse = await fetchParfums({ limit: 8 });
  const recentParfums = parfumResponse?.data || [];

  if (recentParfums.length === 0) {
    return <p className="text-gray-500">Belum ada parfum untuk ditampilkan.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {recentParfums.map((parfum, index) => (
        <ParfumCardAnimated key={parfum.id} parfum={parfum} index={index} />
      ))}
    </div>
  );
}