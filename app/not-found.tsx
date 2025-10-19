import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-custom py-24 text-center">
      <h1 className="mb-2 text-6xl font-bold">404</h1>
      <p className="mb-6 text-muted-foreground">
        The page you're looking for doesn't exist.
      </p>
      <Link href="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  );
}
