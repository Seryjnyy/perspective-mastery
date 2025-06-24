import PresetCreatorPage from "@/app/newtesting/recorder/page-content";
import { CreatePresetForm } from "../features/animation-recorder/components/create-preset-form";

export default function Page() {
  return (
    <PresetCreatorPage />
    // <div className="pt-[10rem] px-[2rem]">
    //   <CreatePresetForm
    //     defaultValues={{
    //       name: "My Preset",
    //       desc: "This is a preset description.",
    //       difficulty: "medium",
    //       tags: ["camera moves", "object moves"],
    //       recommendedSteps: 6,
    //     }}
    //   />
    // </div>
  );
}
