import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-background">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold tracking-widest text-red-500">
          404
        </h1>
        <div className="bg-red-500 px-3 py-1 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>
        <p className="mt-6 text-lg text-gray-700">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/">
          <button className="mt-8 px-6 py-3 text-sm font-semibold bg-red-600 rounded-lg hover:bg-red-700 transition">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}
