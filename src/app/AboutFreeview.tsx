import CustomCarousel from "@/components/CustomCarousel";
import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

export default function AboutFreeview() {
  return (
    <div>
      <h2 className="font-bold ml-auto text-5xl text-end">Freeview</h2>
      <div className="flex justify-between pt-4">
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
        <div className="opacity-80 max-w-[50ch]">
          <p>
            Checkout freeview to explore models freely, to check or practice
            something specific.
          </p>
          <br />
          <p>
            You can view any model in any way you want, there is lots of options
            for you.
          </p>
          <div className="pt-6">
            <Button>Try freeview</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
