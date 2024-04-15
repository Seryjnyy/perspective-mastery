import CustomCarousel from "@/components/CustomCarousel";
import { buttonVariants } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const exampleImages = [
  { link: "/freeviewExamples/freeviewExample1.webp", alt: "Cylinder" },
  { link: "/freeviewExamples/freeviewExample2.webp", alt: "Cylinder" },
  { link: "/freeviewExamples/freeviewExample3.webp", alt: "Torus Knot" },
];

// TODO : Very similar code to AboutJourney
export default function AboutFreeview() {
  return (
    <div>
      <h2 className="font-bold text-5xl text-end">Freeview</h2>
      <div className="flex justify-between pt-4 flex-wrap gap-4">
        <div className="md:px-2 space-y-4 pt-2 sm:pt-0 mx-auto md:mx-0 pb-8 ">
          <CustomCarousel delay={8000}>
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
        </div>

        <div>
          <div className="opacity-80 sm:max-w-[30rem] md:max-w-[31rem] lg:max-w-[50ch]  pb-4">
            <p>
              Checkout freeview to practice freely, see any model in any way you
              want.
              <br />
              <br />
              There is plenty of options for you to explore, change model,
              camera position, lighting and more.
            </p>
          </div>

          <div className="pt-6">
            <Link
              href={"/freeview"}
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              Try freeview
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
