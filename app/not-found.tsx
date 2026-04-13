export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <div className="text-9xl font-bold text-muted-foreground/20 mb-4">404</div>
        <h1 className="text-3xl font-bold mb-4">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved. 
          Try checking the URL or navigate back to the home page.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  )
}
