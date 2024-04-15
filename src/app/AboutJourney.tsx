import CustomCarousel from "@/components/CustomCarousel";
import { Button, buttonVariants } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import HowDoIUseThis from "./HowDoIUseThis";

const exampleImages = [
  { link: "/journey/boxRotateAboveY.png", alt: "Box" },
  { link: "/journey/boxRotateLevelX.png", alt: "Box" },
  { link: "/journey/cylinderRotateAboveY.png", alt: "Cylinder" },
  { link: "/journey/cylinderRotateAboveZ.png", alt: "Cylinder" },
  { link: "/journey/boxRotateAboveZ.png", alt: "Box" },
  { link: "/journey/cylinderCircleAboveY.png", alt: "Cylinder" },
  { link: "/journey/boxCircleLevelY.png", alt: "Box" },
  { link: "/journey/boxCircleLevelX.png", alt: "Box" },
];

export default function AboutJourney() {
  return (
    <div>
      <h2 className="font-bold text-5xl">Journey</h2>
      <div className="flex justify-between pt-4 flex-wrap gap-4">
        <div>
          <div className="opacity-80 sm:max-w-[30rem] md:max-w-[31rem] lg:max-w-[50ch]  pb-4">
            <p>
              Journey is a list of challenges that you have to complete to get
              better at perspective.
            </p>
            <br />
            <p>
              {
                " \"You can't draw what you don't know.\" is something you probably have heard already but rarely is it applied to perspective."
              }
            </p>
            <br />
            <p>
              {
                "How are you meant to know how a box looks like in all the different angles and positions if you haven't seen it before?"
              }
            </p>
            <br />
            <p>Journey aims to help you with this.</p>
            <br />
            <p>
              With a bit of practice you will be able to make educated guesses
              on how different objects look in different angles.
            </p>
          </div>

          <div className="pt-7 space-x-2 hidden xl:block">
            <Link
              href={"/journey"}
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              Start journey
            </Link>
            <HowDoIUseThis />
          </div>
        </div>

        <div className="md:px-2 space-y-4 pt-8 md:pt-4 lg:pt-0 mx-auto md:mx-0">
          <CustomCarousel delay={6000}>
            {exampleImages.map((example, index) => (
              <CarouselItem key={example.link + index}>
                <Image
                  src={example.link}
                  alt={example.alt}
                  width={930}
                  height={930}
                  className="md:w-[32rem] w-[23rem] h-auto rounded-xl"
                />
              </CarouselItem>
            ))}
          </CustomCarousel>
          <div className="pt-10 space-x-2 xl:hidden flex justify-center items-center">
            <Link
              href={"/journey"}
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              Start journey
            </Link>
            <HowDoIUseThis />
          </div>
        </div>
      </div>
    </div>
  );
}
