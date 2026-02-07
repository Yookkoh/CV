import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-6xl font-bold tracking-tight mb-4">404</h1>
      <p className="text-lg text-muted-foreground mb-8">
        This page could not be found.
      </p>
      <Link href="/">
        <Button variant="secondary">
          <ArrowLeft size={16} className="mr-2" />
          Back Home
        </Button>
      </Link>
    </div>
  );
}
