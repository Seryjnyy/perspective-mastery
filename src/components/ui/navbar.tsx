import { BoxIcon, ExitIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Moon, Sun } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";
import { useTheme } from "../theme-provider";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Toggle } from "./toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { Typography } from "./typographyh3";
import { Icons } from "../Icons";

interface ViewerDesc {
  viewerDesc?: {
    shape: string;
    camPos: string;
    rotation_axis: string;
  };
  exitIcon: boolean;
}

const SmallMenu = ({ viewerDesc, exitIcon }: ViewerDesc) => {
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  let topLeftContent = <></>;

  // TODO : Duplicate code with normal nav
  const handleNavigate = (
    destination: "/" | "/journey" | "/about" | "/resources"
  ) => {
    navigate(destination);
  };

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
                <Button variant={"ghost"} onClick={() => navigate("/journey")}>
                  <ExitIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent align="center" side="right">
                <p>Exit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <div className="ml-2">
          <Typography variant="muted">{descString}</Typography>
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
            <DropdownMenuItem onClick={() => handleNavigate("/journey")}>
              Journey
            </DropdownMenuItem>
            <DropdownMenuItem>Resources</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/")}>
              About
            </DropdownMenuItem>
            <DropdownMenuItem>Donate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>
              <div className="flex justify-start gap-2">
                Theme
                <div className="relative">
                  <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (
    destination: "/" | "/journey" | "/about" | "/resources"
  ) => {
    navigate(destination);
  };

  // TODO : This should be done with layouts if possible. Easy to break if change name of page.
  const pathVars = location.pathname.split("/");
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

  return (
    <nav>
      <div className="sm:flex py-2 px-2 hidden">
        <div className="flex gap-4">
          <Button
            variant={"ghost"}
            className="text-lg font-semibold"
            onClick={() => handleNavigate("/")}
          >
            <div className="flex items-center">
              <BoxIcon className="mr-1" />
              mastery
            </div>
          </Button>
          <Button
            variant={pathVars[1] == "journey" ? "outline" : "ghost"}
            onClick={() => handleNavigate("/journey")}
          >
            Journey
          </Button>
          <Button
            variant={pathVars[1] == "resources" ? "outline" : "ghost"}
            onClick={() => handleNavigate("/resources")}
          >
            Resources
          </Button>
          <Button
            variant={pathVars[1] == "about" ? "outline" : "ghost"}
            onClick={() => handleNavigate("/about")}
          >
            About
          </Button>
          <Button
            variant={"ghost"}
            onClick={() =>
              window.open("https://www.buymeacoffee.com/jakubwojcik", "_blank")
            }
          >
            <Icons.coffee />
          </Button>
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
