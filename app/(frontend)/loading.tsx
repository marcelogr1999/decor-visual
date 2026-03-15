import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-12 pb-24">
      {/* Hero Skeleton */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-neutral-950">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl px-6 text-center space-y-6">
            <Skeleton className="h-4 w-32 mx-auto" />
            <Skeleton className="h-12 w-96 sm:w-[500px] mx-auto" />
            <Skeleton className="h-6 w-80 sm:w-[400px] mx-auto" />
            <div className="flex justify-center gap-4 pt-4">
              <Skeleton className="h-12 w-40 rounded-full" />
              <Skeleton className="h-12 w-40 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Service Grid Skeleton */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="mb-12 text-center space-y-4">
          <Skeleton className="h-4 w-32 mx-auto" />
          <Skeleton className="h-10 w-64 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-video w-full rounded-2xl" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
