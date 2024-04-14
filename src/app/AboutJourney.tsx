import CustomCarousel from "@/components/CustomCarousel";
import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRef } from "react";

export default function AboutJourney() {
  return (
    <div>
      <h2 className="font-bold text-5xl">Journey</h2>
      <div className="flex justify-between pt-4 flex-wrap gap-4">
        <div className="opacity-80 max-w-[50ch]">
          <p>
            Journey is a list of challenges that you have to complete to get
            better at perspective.
          </p>
          <br />
          <p>
            "You can't draw what you don't know." Is something you probably
            heard already,
          </p>
          <p>
            Practice makes perfect, well Perfect practice makes perfect. If
            you've seen the 250 box and cylinder challenge. You will get scolded
            for not using a reference when drawing something but then your
            expected to come up with boxes. It's tricky to visualise and draw
            these boxes in different angles and positions, even if you know how
            perspective works, it's just something you probably haven't seen.
            its a tool
          </p>

          <br />
          <p>
            This is for you if you tried the 250 box and cylinder challenge.
          </p>
          <div className="pt-6">
            <Button>Start journey</Button>{" "}
            <Button variant={"outline"}>How do I use this?</Button>
          </div>
        </div>
        <CustomCarousel>
          <CarouselItem>
            <Image
              src={"/journey/cylinderRotateAboveX.png"}
              alt={"something"}
              width={930}
              height={930}
              className="w-[24rem] h-auto rounded-xl"
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src={"/journey/cylinderRotateAboveX.png"}
              alt={"something"}
              width={930}
              height={930}
              className="w-[24rem] h-auto rounded-xl"
            />
          </CarouselItem>
        </CustomCarousel>
      </div>
    </div>
  );
}
