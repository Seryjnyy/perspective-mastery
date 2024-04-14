import Link from "next/link";
import { Button, buttonVariants } from "../components/ui/button";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Typography } from "../components/ui/typography";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Hero = () => {
  return (
    <>
      <div className="absolute right-0 h-screen opacity-70">
        {/* <img src={grid} className="h-screen" /> */}
      </div>
      <div className="">
        <div className="px-8 pt-8">
          <div>
            <h1 className="font-extrabold text-5xl md:text-7xl">
              Master the tricky perspective.
            </h1>
          </div>
          <div className="mt-4">
            <p className="w-80 md:w-96 text-muted-foreground">
              Improve your perspective knowledge by understanding how to rotate
              shapes in 3D space. I offer no secrets here, to progress you will
              have to put in work. Learn how to draw shapes in 3D space.
            </p>
          </div>

          <div className="mt-8">
            <Link
              href={"/journey"}
              className={cn(buttonVariants({ variant: "default" }))}
            >
              Begin the journey
            </Link>

            <Button variant={"outline"} className="ml-2">
              Learn more
            </Button>
          </div>
        </div>

        <div className="flex gap-2 md:gap-3 mt-32 items-end flex-wrap justify-center md:justify-start">
          <div className="w-60">
            <Card className="relative">
              <CardContent className="p-2">
                <Image
                  src={"/journey/boxRotateAboveY.png"}
                  className="rounded-2xl"
                  alt={"Image of box."}
                  width={930}
                  height={930}
                />
              </CardContent>
              <CardFooter className="flex justify-between px-2 pb-2 items-start">
                <p className="text-muted-foreground text-sm ml-2">
                  Rotating a box.
                </p>
                <Link
                  href={"/viewer/box/rotate/above/y"}
                  className={cn(buttonVariants({ variant: "secondary" }))}
                >
                  Try
                </Link>
                {/* <div className="flex justify-end mb-2">
                            </div> */}
              </CardFooter>
            </Card>
          </div>

          <div className="w-60">
            <Card className="relative">
              <CardContent className="p-2">
                <Image
                  src={"/journey/cylinderRotateAboveY.png"}
                  className="rounded-2xl"
                  alt={"Image of cylinder."}
                  width={930}
                  height={930}
                />
              </CardContent>
              <CardFooter className="flex justify-between px-2 pb-2 items-start">
                <p className="text-muted-foreground text-sm ml-2">
                  Rotating a cylinder.
                </p>
                <Link
                  href={"/viewer/cylinder/rotate/above/y"}
                  className={cn(buttonVariants({ variant: "secondary" }))}
                >
                  Try
                </Link>
                {/* <div className="flex justify-end mb-2">
                            </div> */}
              </CardFooter>
            </Card>
          </div>

          {/* <div className="w-60">
                    <Card>
                        <CardHeader className="pt-2">
                            <CardTitle className="mt-0 text-3xl font-bold">
                                Freeview
                            </CardTitle>
                            <CardDescription>
                                Checkout freeview to freely explore shapes in
                                space.
                            </CardDescription>
                        </CardHeader>
                        <CardFooter className="pb-2 pt-0">
                            <Button
                                className="ml-auto"
                                onClick={() => navigate("/freeview")}
                            >
                                Try
                            </Button>
                        </CardFooter>
                    </Card>
                </div> */}
        </div>
      </div>
    </>
  );
};

const HowToUse = () => {
  return (
    <div className="w-full px-8 pt-[16rem] mt-[8rem] h-fit ">
      <Typography variant={"h2nb"} as={"h2"} className="text-6xl font-bold">
        How to use?
      </Typography>
      <Typography>
        Begin the journey that will take you through easy to difficult tasks.
      </Typography>
      <Typography>
        Try to draw what you see, and start making observations. Go through all
        the rotations.
      </Typography>
      <Typography>
        Its recommended that you go through a level twice. First trying to
        predict how it will look like. Then drawing the actual version, then try
        to compare
      </Typography>
      <Typography>You will need to put in work, there is no secret.</Typography>
      <Typography>
        Tips: don't try to go through the entire catalogue as quick as possible,
        take your time on the earlier challenges till you can draw it naturally.
      </Typography>
    </div>
  );
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col mx-1 md:mx-8 mt-8 relative">
        <Hero />
        <HowToUse />
        <Footer />
      </div>
    </main>
  );
}
