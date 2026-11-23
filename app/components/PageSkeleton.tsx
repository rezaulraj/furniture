// Placeholder shown while a URL-dependent page body streams in.
export default function PageSkeleton() {
  return (
    <main aria-busy="true" aria-label="Loading" className="animate-pulse">
      <div className="h-[46vh] min-h-[380px] bg-mist" />
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-5 px-4 py-14 md:grid-cols-4 md:px-8">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i}>
            <div className="aspect-[4/5] bg-mist" />
            <div className="mt-4 h-4 w-3/4 bg-mist" />
            <div className="mt-2 h-4 w-1/3 bg-mist" />
          </div>
        ))}
      </div>
    </main>
  );
}
