import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <h2 className="text-3xl font-semibold">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mx-auto">
        The page you are looking for doesn't exist or has been moved. Use the sidebar to navigate back to the report.
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
      >
        Go Back Home
      </Link>
    </div>
  );
}
