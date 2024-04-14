import FreeviewContent from "./FreeviewContent";
import FreeviewContext from "./FreeviewContext";
import FreeviewUI from "./FreeviewUI";

export default function page() {
  return (
    <div className="w-full h-screen relative">
      <FreeviewContext>
        <FreeviewUI />
        <FreeviewContent />
      </FreeviewContext>
    </div>
  );
}
