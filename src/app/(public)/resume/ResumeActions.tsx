"use client";

import { Button } from "@/components/ui/Button";
import { Printer } from "lucide-react";

export function ResumeActions() {
  function handlePrint() {
    window.print();
  }

  return (
    <div className="flex items-center justify-between mb-6 print:hidden">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Resume</h1>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" onClick={handlePrint}>
          <Printer size={14} className="mr-1.5" />
          Print / Save PDF
        </Button>
      </div>
    </div>
  );
}
