import FreeviewContent from "./FreeviewContent";
import FreeviewContext from "./FreeviewContext";
import FreeviewUI from "./FreeviewUI/FreeviewUI";

export default function Freeview() {
    return (
        <div className="w-full h-screen relative">
            <FreeviewContext>
                <FreeviewUI />
                <FreeviewContent />
            </FreeviewContext>
        </div>
    );
}
