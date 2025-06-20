import { useTestingNewStore } from "@/app/newtesting/page";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ReloadIcon } from "@radix-ui/react-icons";
import { LookAtMode } from "@/app/newtesting/scene-store";
import { ControlPanelTabSection } from "@/app/newtesting/app/components/control-panel/components/control-panel-section";
import { ControlPanelSlider } from "@/app/newtesting/app/components/control-panel/components/control-panel-slider";
import { ControlPanelCheckbox } from "@/app/newtesting/app/components/control-panel/components/control-panel-checkbox";

export const ControlPanelCameraTab = () => {
  const camera = useTestingNewStore((state) => state.camera.data);
  const setCamera = useTestingNewStore((state) => state.setCamera);
  const setCameraDesiredPosition = useTestingNewStore(
    (state) => state.setCameraDesiredPosition
  );
  const resetCamera = useTestingNewStore((state) => state.resetCamera);

  const lookAtTarget = useTestingNewStore((state) => state.lookAtTarget.data);
  const setLookAtTarget = useTestingNewStore((state) => state.setLookAtTarget);
  const resetLookAtTargetPosition = useTestingNewStore(
    (state) => state.resetLookAtTargetPosition
  );

  return (
    <ControlPanelTabSection>
      <Tabs defaultValue="camera">
        <TabsList>
          <TabsTrigger value="camera">Camera</TabsTrigger>
          <TabsTrigger value="look-at">Look At</TabsTrigger>
        </TabsList>

        <TabsContent value="camera">
          <div className="flex justify-between items-center">
            <h3 className="font-bold mb-2">Camera position</h3>
            {/* TODO : Reset camera position */}
            <Button size={"icon"} variant={"ghost"} onClick={resetCamera}>
              <ReloadIcon />
            </Button>
          </div>
          <ControlPanelSlider
            label="Position X"
            value={camera.desiredPosition.x}
            min={-10}
            max={10}
            step={0.1}
            onChange={(value) =>
              setCameraDesiredPosition({
                ...camera.desiredPosition,
                x: value,
              })
            }
          />
          <ControlPanelSlider
            label="Position Y"
            value={camera.desiredPosition.y}
            min={-10}
            max={10}
            step={0.1}
            onChange={(value) =>
              setCamera({
                desiredPosition: {
                  ...camera.desiredPosition,
                  y: value,
                },
              })
            }
          />
          <ControlPanelSlider
            label="Position Z"
            value={camera.desiredPosition.z}
            min={-10}
            max={10}
            step={0.1}
            onChange={(value) =>
              setCamera({
                desiredPosition: {
                  ...camera.desiredPosition,
                  z: value,
                },
              })
            }
          />
          <div className="flex justify-between items-center">
            <h3 className="font-bold mb-2">Camera fov</h3>
            {/* TODO : Reset camera fov */}
            <Button size={"icon"} variant={"ghost"} onClick={resetCamera}>
              <ReloadIcon />
            </Button>
          </div>
          <ControlPanelSlider
            label="FOV"
            value={camera.desiredFov}
            min={10}
            max={120}
            step={1}
            onChange={(value) =>
              setCamera({
                desiredFov: value,
              })
            }
          />
          {/* <ButtonSetting onClick={resetCamera}>Reset Camera</ButtonSetting> */}
        </TabsContent>

        <TabsContent value="look-at">
          <ToggleGroup
            type="single"
            value={lookAtTarget.mode}
            onValueChange={(value) => {
              // Don't allow empty value so that user can't set it to neither
              if (value === "") return;
              setLookAtTarget({ mode: value as LookAtMode });
            }}
            className="mb-6"
          >
            <ToggleGroupItem value="manual" aria-label="Toggle manual">
              Manual
            </ToggleGroupItem>
            <ToggleGroupItem value="orbit" aria-label="Toggle orbit">
              Orbit controls
            </ToggleGroupItem>
          </ToggleGroup>
          {/* <CheckboxSetting
              label="Enable Look-At"
              checked={lookAtTarget.isEnabled}
              onChange={() => {
                setLookAtTarget({
                  isEnabled: !lookAtTarget.isEnabled,
                });
              }}
            /> */}

          <div className="flex justify-between items-center">
            <h3 className="font-bold mb-2">Look at target position</h3>
            {/* TODO : Reset camera fov */}
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={resetLookAtTargetPosition}
            >
              <ReloadIcon />
            </Button>
          </div>
          <ControlPanelSlider
            label="Target X"
            value={lookAtTarget.position.x}
            min={-5}
            max={5}
            step={0.1}
            onChange={(value) =>
              setLookAtTarget({
                position: {
                  ...lookAtTarget.position,
                  x: value,
                },
              })
            }
            disabled={lookAtTarget.mode === "orbit"}
          />
          <ControlPanelSlider
            label="Target Y"
            value={lookAtTarget.position.y}
            min={-5}
            max={5}
            step={0.1}
            onChange={(value) =>
              setLookAtTarget({
                position: {
                  ...lookAtTarget.position,
                  y: value,
                },
              })
            }
            disabled={lookAtTarget.mode === "orbit"}
          />
          <ControlPanelSlider
            label="Target Z"
            value={lookAtTarget.position.z}
            min={-5}
            max={5}
            step={0.1}
            onChange={(value) =>
              setLookAtTarget({
                position: {
                  ...lookAtTarget.position,
                  z: value,
                },
              })
            }
            disabled={lookAtTarget.mode === "orbit"}
          />
          <div className="mt-6">
            <ControlPanelCheckbox
              label="Show Target Marker"
              checked={lookAtTarget.isShowTargetMarker}
              onChange={() =>
                setLookAtTarget({
                  isShowTargetMarker: !lookAtTarget.isShowTargetMarker,
                })
              }
            />
          </div>
          <div className="flex gap-2">
            {/* <ButtonSetting
                onClick={resetLookAtTargetPosition}
                disabled={!lookAtTarget.isEnabled}
              >
                Reset Target
              </ButtonSetting> */}
            {/* <ButtonSetting onClick={lookAtObject} variant="success">
                Look At Object
              </ButtonSetting> */}
          </div>
        </TabsContent>
      </Tabs>
    </ControlPanelTabSection>
  );
};
