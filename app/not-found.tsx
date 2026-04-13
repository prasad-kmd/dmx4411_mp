import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white dark:bg-[#0a0a0a] text-center">
      <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl flex items-center justify-center mb-10 rotate-12">
        <FileQuestion className="w-12 h-12 text-indigo-600 dark:text-indigo-400 -rotate-12" />
      </div>
      <h1 className="text-5xl font-black mb-6 tracking-tight">404</h1>
      <p className="text-2xl font-bold mb-4">Page not found</p>
      <p className="text-gray-500 dark:text-gray-400 mb-12 max-w-sm mx-auto">
        The page you are looking for doesn't exist or has been moved to another frequency.
      </p>
      <Link href="/">
        <Button size="lg" className="rounded-full px-8">Return to Base</Button>
      </Link>
    </div>
  );
}
