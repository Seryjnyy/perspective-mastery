"use client";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BoxIcon,
  ExitIcon,
  HamburgerMenuIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import { Toggle } from "./ui/toggle";
import { Typography } from "./ui/typography";

interface ViewerDesc {
  viewerDesc?: {
    shape: string;
    camPos: string;
    rotation_axis: string;
  };
  exitIcon: boolean;
}

const SmallMenu = ({ viewerDesc, exitIcon }: ViewerDesc) => {
  const { setTheme } = useTheme();
  let topLeftContent = <></>;

  if (exitIcon || viewerDesc) {
    let descString = "";

    if (viewerDesc) {
      const connective = viewerDesc.camPos == "level" ? "with" : "the";
      descString = `Camera ${viewerDesc.camPos} ${connective} ${viewerDesc.shape}`;
    }

    topLeftContent = (
      <div className="absolute z-20 left-4 top-2 flex items-center">
        {exitIcon && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={"/journey"}
                  className={cn(buttonVariants({ variant: "ghost" }))}
                >
                  <ExitIcon />
                </Link>
              </TooltipTrigger>
              <TooltipContent align="center" side="right">
                <p>Exit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <div className="ml-2">
          <Typography variant="mutedText">{descString}</Typography>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* TODO : IDK if this should be here, because we need this small menu on other pages too */}
      {/* TODO : Also Implement this so displays correctly */}
      {topLeftContent}

      <div className="absolute z-20 right-2 top-2 ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Toggle>
              <HamburgerMenuIcon className="h-6 w-6" />
            </Toggle>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={8}>
            <Link href={"/"}>
              <DropdownMenuItem>
                <BoxIcon />
              </DropdownMenuItem>
            </Link>
            <Link href={"/journey"}>
              <DropdownMenuItem>Journey</DropdownMenuItem>
            </Link>
            {/* <Link href={"/journey"}>
              <DropdownMenuItem>Resources</DropdownMenuItem>
            </Link> */}
            <Link href={"/journey"}>
              <DropdownMenuItem>About</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>
              <div className="flex justify-start gap-2">
                Theme
                <div className="relative">
                  <SunIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default function Navbar() {
  const pathname = usePathname();

  const pathVars = pathname.split("/");
  if (pathVars[1] == "viewer") {
    return (
      <nav>
        <SmallMenu
          viewerDesc={{
            shape: pathVars[2],
            camPos: pathVars[3],
            rotation_axis: pathVars[4],
          }}
          exitIcon={true}
        />
      </nav>
    );
  }

  if (pathVars[1] == "freeview") {
    return (
      <nav>
        <SmallMenu exitIcon={true} />
      </nav>
    );
  }

  const links = [
    { path: "journey", label: "Journey" },
    { path: "freeview", label: "Freeview" },
    // { path: "resources", label: "Resources" },
    { path: "about", label: "About" },
  ];

  return (
    <nav>
      <div className="sm:flex py-2 px-2 hidden">
        <div className="flex gap-4">
          <Link
            href={"/"}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-lg font-semibold"
            )}
          >
            <div className="flex items-center">
              <BoxIcon className="mr-1" />
              mastery
            </div>
          </Link>

          {links.map((link) => (
            <Link
              href={`/${link.path}`}
              className={cn(
                buttonVariants({
                  variant: pathVars[1] == link.path ? "outline" : "ghost",
                }),
                "text-lg font-semibold"
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* <Button
            variant={"ghost"}
            onClick={() =>
              window.open("https://www.buymeacoffee.com/jakubwojcik", "_blank")
            }
          >
            <Icons.coffee />
          </Button> */}
        </div>

        <div className="ml-auto">
          <ModeToggle />
        </div>
      </div>

      <div className="sm:hidden py-6">
        <SmallMenu exitIcon={false} />
      </div>
    </nav>
  );
}
