import Link from "next/link";
import { Button, buttonVariants } from "../components/ui/button";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Typography } from "../components/ui/typography";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import Image from "next/image";
import AboutJourney from "./AboutJourney";
import AboutFreeview from "./AboutFreeview";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const GetStartedOrLearnMore = () => {
  return (
    <div>
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
  );
};

const Hero = () => {
  return (
    <div>
      <div className="absolute right-0 h-screen opacity-70">
        {/* <img src={grid} className="h-screen" /> */}
      </div>

      <div>
        <div className="md:px-8 px-2 pt-8">
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
            <GetStartedOrLearnMore />
          </div>
        </div>

        <div className="flex gap-4 md:gap-3 mt-32 items-end flex-wrap justify-center md:justify-start">
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
    </div>
  );
};

// const AboutFreeview = () => {
//   return (
//     <div>
//       <h2 className="font-bold text-2xl">Freeview</h2>
//       <p className="opacity-80">
//         Checkout freeview to explore models freely, to check or practice
//         something specific.
//       </p>
//       <Image
//         src={"/journey/cylinderRotateAboveX.png"}
//         alt={"something"}
//         width={930}
//         height={930}
//       />
//     </div>
//   );
// };

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
        {
          "Tips: don't try to go through the entire catalogue as quick as possible, take your time on the earlier challenges till you can draw it naturally."
        }
      </Typography>
    </div>
  );
};

const Contribute = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <h2 className="font-bold text-4xl">Want to contribute?</h2>
      <div className="flex justify-center flex-col items-center">
        <div className="gap-1 pt-2 flex justify-center flex-col items-center opacity-80">
          <p>
            If you have ideas for features and ways to make the experience
            better.
          </p>
          <span className="text-sm opacity-70">Or</span>
          <p>If you found any bugs.</p>
        </div>
        <Link
          href={process.env.GITHUB_LINK ?? "#"}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "mt-12 space-x-2"
          )}
        >
          <span> Vist the GitHub page</span> <GitHubLogoIcon />
        </Link>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:px-24 pt-24 md:pb-12 ">
      <div className="flex flex-col mx-1 md:mx-8 mt-8 relative">
        <Hero />
        {/* <HowToUse /> */}
        <div className="py-18 my-28 px-2">
          <AboutJourney />
        </div>
        <div className="py-18 my-28">
          <AboutFreeview />
        </div>
        <Contribute />
        <Footer />
      </div>
    </main>
  );
}
