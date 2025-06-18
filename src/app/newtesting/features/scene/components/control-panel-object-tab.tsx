import { useTestingNewStore } from "@/app/newtesting/page";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReloadIcon } from "@radix-ui/react-icons";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Model } from "../models/model";
import { useModels } from "../models/use-models";
import { ControlPanelTabSection } from "@/app/newtesting/app/components/control-panel/components/control-panel-section";
import { ControlPanelSlider } from "@/app/newtesting/app/components/control-panel/components/control-panel-slider";
import { ControlPanelButton } from "@/app/newtesting/app/components/control-panel/components/control-panel-button";

export const ControlPanelObjectTab = () => {
  const object = useTestingNewStore()((state) => state.object.data);
  const setObject = useTestingNewStore()((state) => state.object.setObject);
  const setObjectModel = useTestingNewStore()(
    (state) => state.object.setObjectModel
  );
  const resetObject = useTestingNewStore()((state) => state.object.resetObject);
  const objectDefaults = useTestingNewStore()(
    (state) => state.object.getDefaults
  )();

  const resetObjectPosition = () => {
    setObject({ position: objectDefaults.position });
  };
  const resetObjectRotation = () => {
    setObject({ rotation: objectDefaults.rotation });
  };
  const resetObjectScale = () => {
    setObject({ scale: objectDefaults.scale });
  };

  return (
    <ControlPanelTabSection>
      <Tabs defaultValue="model" className="w-full ">
        <ScrollArea className={"w-full"}>
          <TabsList className={"mb-4"}>
            <TabsTrigger value="model">Model</TabsTrigger>
            <TabsTrigger value="position">Position</TabsTrigger>
            <TabsTrigger value="rotation">Rotation</TabsTrigger>
            <TabsTrigger value="scale">Scale</TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <TabsContent value="model">
          <ObjectModelSection
            selectedModel={object.model}
            onModelChange={setObjectModel}
          />
        </TabsContent>
        <TabsContent value="position">
          <ObjectPositionSection
            objectPosition={object.position}
            setObjectPosition={(data) => setObject({ position: data })}
            resetObject={resetObjectPosition}
          />
        </TabsContent>
        <TabsContent value="rotation">
          <ObjectRotationSection
            objectRotation={object.rotation}
            setObjectRotation={(data) => setObject({ rotation: data })}
            resetObject={resetObjectRotation}
          />
        </TabsContent>
        <TabsContent value="scale">
          <ObjectScaleSection
            objectScale={object.scale}
            setObjectScale={(data) => setObject({ scale: data })}
            resetObject={resetObjectScale}
          />
        </TabsContent>
      </Tabs>
      {/* <Button onClick={resetObject}>Reset all</Button> */}
    </ControlPanelTabSection>
  );
};

const ObjectModelSection = ({
  selectedModel,
  onModelChange,
}: {
  selectedModel: Model;
  onModelChange: (model: Model) => void;
}) => {
  const { models, getModel } = useModels();

  const handleModelChange = (modelId: string) => {
    const model = getModel(modelId);
    if (model) {
      onModelChange(model);
    }
  };
  return (
    <div>
      <div className="flex gap-2">
        <h4>Local model</h4>
        <Select value={selectedModel.id} onValueChange={handleModelChange}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a timezone" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Local models</SelectLabel>
              {models.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* <div className="flex gap-2">
          <Button>Load Model</Button>
        </div> */}
    </div>
  );
};

const ObjectPositionSection = ({
  objectPosition,
  setObjectPosition,
  resetObject,
}: {
  objectPosition: { x: number; y: number; z: number };
  setObjectPosition: (pos: { x: number; y: number; z: number }) => void;
  resetObject: () => void;
}) => (
  <div>
    <div className="flex justify-between items-center">
      <h3 className="font-bold mb-2">Object Position</h3>
      <Button size={"icon"} variant={"ghost"} onClick={resetObject}>
        <ReloadIcon />
      </Button>
    </div>
    <ControlPanelSlider
      label="Position X"
      value={objectPosition.x}
      min={-5}
      max={5}
      step={0.1}
      onChange={(value) => setObjectPosition({ ...objectPosition, x: value })}
    />
    <ControlPanelSlider
      label="Position Y"
      value={objectPosition.y}
      min={-5}
      max={5}
      step={0.1}
      onChange={(value) => setObjectPosition({ ...objectPosition, y: value })}
    />
    <ControlPanelSlider
      label="Position Z"
      value={objectPosition.z}
      min={-5}
      max={5}
      step={0.1}
      onChange={(value) => setObjectPosition({ ...objectPosition, z: value })}
    />
  </div>
);

const ObjectScaleSection = ({
  objectScale,
  setObjectScale,
  resetObject,
}: {
  objectScale: { x: number; y: number; z: number };
  setObjectScale: (scale: { x: number; y: number; z: number }) => void;
  resetObject: () => void;
}) => (
  <div>
    <div className="flex justify-between items-center">
      <h3 className="font-bold mb-2">Object Scale</h3>
      <Button size={"icon"} variant={"ghost"} onClick={resetObject}>
        <ReloadIcon />
      </Button>
    </div>
    <ControlPanelSlider
      label="Scale X"
      value={objectScale.x}
      min={0.1}
      max={3}
      step={0.1}
      onChange={(value) => setObjectScale({ ...objectScale, x: value })}
    />
    <ControlPanelSlider
      label="Scale Y"
      value={objectScale.y}
      min={0.1}
      max={3}
      step={0.1}
      onChange={(value) => setObjectScale({ ...objectScale, y: value })}
    />
    <ControlPanelSlider
      label="Scale Z"
      value={objectScale.z}
      min={0.1}
      max={3}
      step={0.1}
      onChange={(value) => setObjectScale({ ...objectScale, z: value })}
    />
  </div>
);

const ObjectRotationSection = ({
  objectRotation,
  setObjectRotation,
  resetObject,
}: {
  objectRotation: {
    x: number;
    y: number;
    z: number;
  };
  setObjectRotation: (rotation: { x: number; y: number; z: number }) => void;
  resetObject: () => void;
}) => {
  const rotateObject = (axis: "x" | "y" | "z", degrees: number) => {
    const radians = (degrees * Math.PI) / 180;

    setObjectRotation({
      ...objectRotation,
      [axis]: objectRotation[axis] + radians,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="font-bold mb-2">Object Rotation</h3>
        <Button size={"icon"} variant={"ghost"} onClick={resetObject}>
          <ReloadIcon />
        </Button>
      </div>
      <ControlPanelSlider
        label="Rotation X"
        value={objectRotation.x}
        min={0}
        max={2 * Math.PI}
        step={0.1}
        onChange={(value) =>
          setObjectRotation({
            ...objectRotation,
            x: value,
          })
        }
      />
      <ControlPanelSlider
        label="Rotation Y"
        value={objectRotation.y}
        min={0}
        max={2 * Math.PI}
        step={0.1}
        onChange={(value) =>
          setObjectRotation({
            ...objectRotation,
            y: value,
          })
        }
      />
      <ControlPanelSlider
        label="Rotation Z"
        value={objectRotation.z}
        min={0}
        max={2 * Math.PI}
        step={0.1}
        onChange={(value) =>
          setObjectRotation({
            ...objectRotation,
            z: value,
          })
        }
      />

      <div className="mt-3 border-t border-gray-600 pt-3">
        <h4 className="font-semibold mb-2">Quick Rotation</h4>
        <div className="grid grid-cols-2 gap-2">
          <ControlPanelButton
            size="small"
            variant="danger"
            onClick={() => rotateObject("x", 10)}
          >
            X +10°
          </ControlPanelButton>
          <ControlPanelButton
            size="small"
            variant="danger"
            onClick={() => rotateObject("x", -10)}
          >
            X -10°
          </ControlPanelButton>
          <ControlPanelButton
            size="small"
            variant="success"
            onClick={() => rotateObject("y", 10)}
          >
            Y +10°
          </ControlPanelButton>
          <ControlPanelButton
            size="small"
            variant="success"
            onClick={() => rotateObject("y", -10)}
          >
            Y -10°
          </ControlPanelButton>
          <ControlPanelButton
            size="small"
            onClick={() => rotateObject("z", 10)}
          >
            Z +10°
          </ControlPanelButton>
          <ControlPanelButton
            size="small"
            onClick={() => rotateObject("z", -10)}
          >
            Z -10°
          </ControlPanelButton>
        </div>
      </div>
    </div>
  );
};
