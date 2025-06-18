import { ControlPanelCameraTab } from "../../../features/scene/components/control-panel-camera-tab";
import { ControlPanelGizmosTab } from "../../../features/scene/components/control-panle-gizmos-tab";
import { ControlPanelObjectTab } from "../../../features/scene/components/control-panel-object-tab";
import { ControlPanelAnimationTab } from "../../../features/animation/components/control-panel-animation-tab";
import { ControlPanelGroundTab } from "../../../features/scene/components/control-panel-ground-tab";

export const CONTROL_PANEL_TABS = {
  camera: {
    value: "camera",
    label: "Camera",
    content: <ControlPanelCameraTab />,
  },
  object: {
    value: "object",
    label: "Object",
    content: <ControlPanelObjectTab />,
  },
  animation: {
    value: "animation",
    label: "Animation",
    content: <ControlPanelAnimationTab />,
  },
  ground: {
    value: "ground",
    label: "Ground",
    content: <ControlPanelGroundTab />,
  },
  gizmos: {
    value: "gizmos",
    label: "Gizmos",
    content: <ControlPanelGizmosTab />,
  },
} as const;
