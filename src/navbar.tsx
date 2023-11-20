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
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigate = (
        destination: "/" | "/challenges" | "/about" | "/resources"
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
    }
    const SmallMenu = (props: ViewerDesc) => {
        let viewerDesc = <div></div>;

        if (props.viewerDesc) {
            const connective =
                props.viewerDesc.camPos == "level" ? "with" : "the";
            const descString = `Camera ${props.viewerDesc.camPos} ${connective} ${props.viewerDesc.shape}`;

            viewerDesc = (
                <div className="absolute z-20 left-4 top-2 flex items-center">
                    <Button
                        variant={"ghost"}
                        onClick={() => navigate("/challenges")}
                    >
                        <ExitIcon />
                    </Button>
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
                {viewerDesc}

                <div className="absolute z-20 right-2 top-2 ">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Toggle>
                                <HamburgerMenuIcon className="h-6 w-6" />
                            </Toggle>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent sideOffset={8}>
                            <DropdownMenuItem
                                onClick={() => handleNavigate("/challenges")}
                            >
                                Challenges
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleNavigate("/")}
                            >
                                Home
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleNavigate("/")}
                            >
                                About
                            </DropdownMenuItem>
                            <DropdownMenuItem>Donate</DropdownMenuItem>
                            <DropdownMenuItem>Resources</DropdownMenuItem>
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
    if (pathVars[1] == "viewer" || pathVars[1] == "freeview") {
        return (
            <SmallMenu
                viewerDesc={{
                    shape: pathVars[2],
                    camPos: pathVars[3],
                    rotation_axis: pathVars[4],
                }}
            />
        );
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
                        variant={"ghost"}
                        onClick={() => handleNavigate("/challenges")}
                    >
                        Challenges
                    </Button>
                    <Button
                        variant={"ghost"}
                        onClick={() => handleNavigate("/about")}
                    >
                        About
                    </Button>
                    <Button
                        variant={"ghost"}
                        onClick={() => handleNavigate("/resources")}
                    >
                        Resources
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

            {/* HACK : because this is for the viewer, it has to go over the canvas.*/}
            <div className="sm:hidden py-6">
                <SmallMenu />
            </div>
        </>
    );
}
