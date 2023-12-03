import { useLocation, useNavigate, useParams } from "react-router-dom";
import Menu from "./Menu";
import { ModeToggle } from "./components/mode-toggle";
import { Button } from "./components/ui/button";
import { Toggle } from "./components/ui/toggle";
import { BoxIcon, ExitIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Typography } from "./components/ui/typographyh3";
import buymeacoffee from "./assets/buymeacoffee.svg";
import { useTheme } from "./components/theme-provider";
import { Book, Box, BoxesIcon, Eye, Moon, Sun } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./components/ui/tooltip";
import { existsSync } from "fs";

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigate = (
        destination: "/" | "/journey" | "/about" | "/resources"
    ) => {
        navigate(destination);
    };

    const { setTheme } = useTheme();

    interface ViewerDesc {
        viewerDesc?: {
            shape: string;
            camPos: string;
            rotation_axis: string;
        };
        exitIcon: boolean;
    }
    const SmallMenu = ({ viewerDesc, exitIcon }: ViewerDesc) => {
        let topLeftContent = <></>;

        if (exitIcon || viewerDesc) {
            let descString = "";

            if (viewerDesc) {
                const connective =
                    viewerDesc.camPos == "level" ? "with" : "the";
                descString = `Camera ${viewerDesc.camPos} ${connective} ${viewerDesc.shape}`;
            }

            topLeftContent = (
                <div className="absolute z-20 left-4 top-2 flex items-center">
                    {exitIcon && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant={"ghost"}
                                        onClick={() => navigate("/journey")}
                                    >
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

        // buttons for small nav
        // topLeftContent = (
        //     <div className="absolute z-20 left-4 top-2 flex items-center">
        //         <div className="ml-2">
        //             <Button variant={"outline"}>
        //                 <Box className="w-5 h-5" />
        //             </Button>
        //             <Button variant={"outline"}>
        //                 <Eye className="w-5 h-5" />
        //             </Button>
        //             <Button variant={"outline"}>
        //                 <Book className="w-5 h-5" />
        //             </Button>
        //         </div>
        //     </div>
        // );

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
                            <DropdownMenuItem
                                onClick={() => handleNavigate("/journey")}
                            >
                                Journey
                            </DropdownMenuItem>
                            <DropdownMenuItem>Resources</DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleNavigate("/")}
                            >
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
                            <DropdownMenuItem
                                onClick={() => setTheme("system")}
                            >
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        );
    };

    // TODO : Maybe this could be done with root layout, but idk if its worth it
    // hopefully this works correctly
    // TODO : very easy to break this if things change
    const pathVars = location.pathname.split("/");
    if (pathVars[1] == "viewer") {
        return (
            <SmallMenu
                viewerDesc={{
                    shape: pathVars[2],
                    camPos: pathVars[3],
                    rotation_axis: pathVars[4],
                }}
                exitIcon={true}
            />
        );
    }

    // TODO : animated is temp
    if (pathVars[1] == "freeview" || pathVars[1] == "animated") {
        return <SmallMenu exitIcon={true} />;
    }

    return (
        <>
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
                        variant={
                            pathVars[1] == "resources" ? "outline" : "ghost"
                        }
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
                            window.open(
                                "https://www.buymeacoffee.com/jakubwojcik",
                                "_blank"
                            )
                        }
                    >
                        <img src={buymeacoffee} alt="coffee" />
                    </Button>
                </div>
                {/* <div className="ml-auto">
                <Menu />
            </div> */}

                <div className="ml-auto">
                    <ModeToggle />
                </div>
            </div>

            <div className="sm:hidden py-6">
                <SmallMenu exitIcon={false} />
            </div>
        </>
    );
}
