import Menu from "./Menu";
import { ModeToggle } from "./components/mode-toggle";

export default function Navbar() {
    return (
        <div className="flex py-4 px-2">
            <h2 className="text-lg font-semibold">Fundamental-master</h2>
            <div className="ml-auto">
                <Menu />
            </div>

            <ModeToggle />
        </div>
    );
}
