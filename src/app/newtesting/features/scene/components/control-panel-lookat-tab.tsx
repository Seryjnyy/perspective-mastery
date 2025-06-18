// import { ControlPanelButton } from "@/app/newtesting/app/components/control-panel/components/control-panel-button";
// import { ControlPanelCheckbox } from "@/app/newtesting/app/components/control-panel/components/control-panel-checkbox";
// import { ControlPanelSlider } from "@/app/newtesting/app/components/control-panel/components/control-panel-slider";

// export const ControlPanelLookAtTab = ({
//   lookAtEnabled,
//   setLookAtEnabled,
//   showTarget,
//   setShowTarget,
//   lookAtTarget,
//   setLookAtTarget,
//   resetLookAt,
//   lookAtObject,
// }: {
//   lookAtEnabled: boolean;
//   setLookAtEnabled: (enabled: boolean) => void;
//   showTarget: boolean;
//   setShowTarget: (show: boolean) => void;
//   lookAtTarget: { x: number; y: number; z: number };
//   setLookAtTarget: (target: { x: number; y: number; z: number }) => void;
//   resetLookAt: () => void;
//   lookAtObject: () => void;
// }) => (
//   <div>
//     <h3 className="font-bold mb-2">Look-At Target</h3>
//     <ControlPanelCheckbox
//       label="Enable Look-At"
//       checked={lookAtEnabled}
//       onChange={() => setLookAtEnabled(!lookAtEnabled)}
//     />
//     <ControlPanelCheckbox
//       label="Show Target Marker"
//       checked={showTarget}
//       onChange={() => setShowTarget(!showTarget)}
//     />
//     <ControlPanelSlider
//       label="Target X"
//       value={lookAtTarget.x}
//       min={-5}
//       max={5}
//       step={0.1}
//       onChange={(value) => setLookAtTarget({ ...lookAtTarget, x: value })}
//       disabled={!lookAtEnabled}
//     />
//     <ControlPanelSlider
//       label="Target Y"
//       value={lookAtTarget.y}
//       min={-5}
//       max={5}
//       step={0.1}
//       onChange={(value) => setLookAtTarget({ ...lookAtTarget, y: value })}
//       disabled={!lookAtEnabled}
//     />
//     <ControlPanelSlider
//       label="Target Z"
//       value={lookAtTarget.z}
//       min={-5}
//       max={5}
//       step={0.1}
//       onChange={(value) => setLookAtTarget({ ...lookAtTarget, z: value })}
//       disabled={!lookAtEnabled}
//     />
//     <div className="flex gap-2">
//       <ControlPanelButton onClick={resetLookAt} disabled={!lookAtEnabled}>
//         Reset Target
//       </ControlPanelButton>
//       <ControlPanelButton onClick={lookAtObject} variant="success">
//         Look At Object
//       </ControlPanelButton>
//     </div>
//   </div>
// );
