"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ReactNode, useRef } from "react";

export default function CustomCarousel({
  children,
  delay,
}: {
  children: ReactNode;
  delay: number;
}) {
  const plugin = useRef(Autoplay({ delay: delay, stopOnInteraction: true }));

  return (
    <Carousel
      className="w-full max-w-xs"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[plugin.current]}
    >
      <CarouselContent className="w-fit">{children}</CarouselContent>
      <div className="bg-red-200 flex justify-center items-center">
        <div className="relative">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
    </Carousel>
  );
}
