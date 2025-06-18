import { ControlPanelCheckbox } from "@/app/newtesting/app/components/control-panel/components/control-panel-checkbox";

export const ControlPanelGizmosTab = () => {
  return (
    <div>
      <h3 className="font-bold mb-2">Gizmos</h3>
      <div>
        <ControlPanelCheckbox
          label={"Gizmos"}
          checked={false}
          onChange={() => {}}
        />
      </div>
    </div>
  );
};
