"use client";

import { Button } from "@/components/ui/button";

export default function LearnMoreScrollButton() {
  return (
    <Button
      variant={"outline"}
      onClick={() => window.scrollTo({ behavior: "smooth", top: 600 })}
    >
      Learn more
    </Button>
  );
}
