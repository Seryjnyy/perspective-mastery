"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ConfettiCannonButton from "@/components/ui/confetti-cannon-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import {
  ArrowLeftIcon,
  DotsVerticalIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";
import { Canvas } from "@react-three/fiber";
import { Check } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Group } from "three";
import { animationPresetRepo } from "../../features/animation/animation-preset-repo";
import { AnimationStepper } from "../../features/animation/components/animation-stepper";
import SceneVisualisationPreview from "../../features/scene-previewer/scene-visualisation-preview";
import localPrimitiveModelsRepo from "../../features/animation/model-repo";
import ModelLoader from "../../features/scene/components/model-loader";
import { useModelsData } from "../../features/scene/models/use-models";
import { AnimationPresetLocalModel } from "../../types2";
import { CameraData } from "../../scene-store";
import {
  CameraControlsInScene,
  CameraDataCollector,
  SceneStoreProvider,
  useTestingNewStore,
} from "../../page-content";
import ModelGetterLoader from "../../features/scene/components/model-getter-loader";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export default function GuidedChallengePage() {
  const { challenge } = useParams();

  if (!challenge || typeof challenge !== "string") {
    return <div>No challenge selected</div>;
  }
  const animationPreset = animationPresetRepo.getAnimationPreset(challenge);
  if (!animationPreset) {
    return <div>Animation preset not found</div>;
  }

  return (
    <SceneStoreProvider>
      <GuidedChallenge animationPreset={animationPreset} />
    </SceneStoreProvider>
  );
}

function GuidedChallenge({
  animationPreset,
}: {
  animationPreset: AnimationPresetLocalModel;
}) {
  // Camera state
  const camera = useTestingNewStore((state) => state.camera.data);
  const setCamera = useTestingNewStore((state) => state.setCamera);

  const setObjectRotation = useTestingNewStore(
    (state) => state.setObjectRotation
  );
  const setObjectPosition = useTestingNewStore(
    (state) => state.setObjectPosition
  );
  const setCameraPosition = useTestingNewStore(
    (state) => state.setCameraDesiredPosition
  );
  const setCameraFov = useTestingNewStore((state) => state.setCameraDesiredFov);
  const setLookAtTargetPosition = useTestingNewStore(
    (state) => state.setLookAtTargetPosition
  );

  const lookAtTarget = useTestingNewStore((state) => state.lookAtTarget.data);
  const setLookAtTarget = useTestingNewStore((state) => state.setLookAtTarget);

  const object = useTestingNewStore((state) => state.object.data);
  const setObject = useTestingNewStore((state) => state.setObjectModel);

  const ground = useTestingNewStore((state) => state.ground.data);

  const navigate = useRouter();

  const models = useModelsData();

  // Sync store data with actual camera data
  const handleCameraDataChange = (data: CameraData) => {
    setCamera({
      fov: data.fov,
      position: data.position,
      aspect: data.aspect,
      far: data.far,
      near: data.near,
      rotation: data.rotation,
      zoom: data.zoom,
    });
  };

  // Look at object position
  const lookAtObject = () => {
    setLookAtTarget({
      position: {
        x: object.position.x,
        y: object.position.y,
        z: object.position.z,
      },
    });
    setLookAtTarget({
      mode: "manual",
    });
  };

  const model = useMemo(() => {
    const modelData = animationPreset.animationPresetData.modelData;
    return (
      <ModelGetterLoader
        modelId={modelData.modelId}
        position={modelData.position}
        rotation={modelData.rotation}
        scale={modelData.scale}
        showBoundingBox={true}
      />
    );
  }, [animationPreset]);

  const groundModel = useMemo(() => {
    const groundData = animationPreset.animationPresetData.groundData;

    return (
      <ModelGetterLoader
        modelId={groundData.modelId}
        position={groundData.position}
        rotation={groundData.rotation}
        scale={groundData.scale}
        showBoundingBox={true}
      />
    );
  }, [animationPreset]);

  // TODO : duplicate code
  const lookAtTargetModel = useMemo(() => {
    const lookAtTargetData =
      animationPreset.animationPresetData.lookAtTargetData;
    return localPrimitiveModelsRepo.getLocalModel(
      lookAtTargetData.model.modelId,
      lookAtTargetData.position,
      lookAtTargetData.scale,
      lookAtTargetData.rotation
    );
  }, [animationPreset]);

  const staticBackgroundModels = useMemo(() => {
    const staticBackgroundData =
      animationPreset.animationPresetData.staticBackground;
    const models = staticBackgroundData.models.map((model) =>
      localPrimitiveModelsRepo.getLocalModel(
        model.modelId,
        model.position,
        model.scale,
        model.rotation
      )
    );
    return <group>{models}</group>;
  }, [animationPreset]);

  const lights = useMemo(() => {
    const lightData = animationPreset.animationPresetData.lightData;
    return lightData.lights.map((light) =>
      localPrimitiveModelsRepo.getLightModel(
        light.type,
        light.position,
        light.scale,
        light.rotation,
        light.intensity
      )
    );
  }, [animationPreset]);

  const [showGround, setShowGround] = useState(true);

  const [showPreview, setShowPreview] = useState(true);
  const [showMetadata, setShowMetadata] = useState(true);

  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  const isAbleToHideGround = true;
  const [isCompleted, setIsCompleted] = useState(false);

  const [isModelLoaded, setIsModelLoaded] = useState(false);

  useEffect(() => {
    setObjectRotation(
      animationPreset.animationPresetData.animationData.keyframes[0].config
        .objectRotation
    );
    setObjectPosition(
      animationPreset.animationPresetData.animationData.keyframes[0].config
        .objectPosition
    );
    setCameraPosition(
      animationPreset.animationPresetData.animationData.keyframes[0].config
        .cameraPosition
    );
    setCameraFov(
      animationPreset.animationPresetData.animationData.keyframes[0].config
        .cameraFov
    );

    setLookAtTargetPosition(
      animationPreset.animationPresetData.animationData.keyframes[0].config
        .lookAtTargetPosition
    );
  }, [isModelLoaded]);

  return (
    <div className="w-full h-[90vh] relative">
      {/* Data Info Panel */}
      {/* <div className="absolute top-2 left-2 bg-black/70 text-white p-3 rounded-md font-mono text-xs max-w-[300px] z-10">
        <DataDisplayWindow
          camera={camera}
          object={object}
          lookAtTarget={lookAtTarget}
        />
      </div> */}
      {showMetadata && (
        <div className="absolute top-2 right-2 backdrop-blur-sm text-white p-3 rounded-md font-mono text-xs max-w-[300px] z-10">
          <div className="flex flex-col">
            <div className="text-sm font-bold">
              {animationPreset.metadata.name}
            </div>
            <div className="text-xs">{animationPreset.metadata.desc}</div>
            <div className="text-xs">{animationPreset.metadata.difficulty}</div>
          </div>
        </div>
      )}
      {showPreview && (
        <div className="absolute bottom-2 right-2 backdrop-blur-md  text-white overflow-hidden p-3 rounded-md w-fit h-fit z-10 border">
          <SceneVisualisationPreview
            lookAtTargetPosition={lookAtTarget.position}
            cameraPosition={camera.position}
            cameraRotation={camera.rotation}
            fov={camera.desiredFov}
            aspect={camera.aspect}
            near={camera.near}
            far={camera.far}
            objectPosition={object.position}
            objectRotation={object.rotation}
            objectScale={object.scale}
            groundPosition={ground.position}
            model={model}
            groundModel={groundModel}
            lookAtTargetModel={lookAtTargetModel}
            staticBackgroundModels={staticBackgroundModels}
            showFrustum={true}
            actions={
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowPreview(false);
                }}
              >
                <EyeOpenIcon />
              </Button>
            }
          />
        </div>
      )}

      {/* <div className="absolute top-2 right-2 bg-black/70 text-white p-3 rounded-md font-mono z-10 min-w-[250px]">
        <ControlsPanel lookAtObject={lookAtObject} />
      </div> */}

      <div className="absolute top-2 left-2 p-3 rounded-md text-white  z-10 backdrop-blur-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            navigate.back();
          }}
        >
          <ArrowLeftIcon />
        </Button>
      </div>

      <div className="absolute bottom-2 left-2 text-white p-3 rounded-md  z-10 flex flex-row gap-8 backdrop-blur-sm border">
        <AnimationStepper
          keyframes={
            animationPreset.animationPresetData.animationData.keyframes
          }
          apply={(state) => {
            setObjectRotation(state.objectRotation);
            setObjectPosition(state.objectPosition);
            setCameraPosition(state.cameraPosition);
            setCameraFov(state.cameraFov);
            setLookAtTargetPosition(state.lookAtTargetPosition);
          }}
          recommendedSteps={animationPreset.metadata.recommendedSteps}
          canChangeSteps={false}
          onProgressChange={(completed) => {
            setHasReachedEnd(completed);
          }}
          enabled={isModelLoaded}
        />
        {hasReachedEnd && (
          <div className="absolute -top-12 left-0 select-none flex">
            {isCompleted && (
              <div className="flex items-center gap-2 p-1 text-emerald-500">
                <Check className="size-4" /> Completed
              </div>
            )}
            {!isCompleted && (
              <ConfettiCannonButton onClick={() => setIsCompleted(true)}>
                <Check className="size-4" /> Level completed?
              </ConfettiCannonButton>
            )}
          </div>
        )}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <DotsVerticalIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Difficulty</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={"show-ground-checkbox"}
                      checked={showGround}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setShowGround(true);
                        } else {
                          setShowGround(false);
                        }
                      }}
                    />
                    <label htmlFor={"show-ground-checkbox"} className="text-sm">
                      Show ground
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={"show-preview-checkbox"}
                      checked={showPreview}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setShowPreview(true);
                        } else {
                          setShowPreview(false);
                        }
                      }}
                    />
                    <label
                      htmlFor={"show-preview-checkbox"}
                      className="text-sm"
                    >
                      Show preview
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={"show-metadata-checkbox"}
                      checked={showMetadata}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setShowMetadata(true);
                        } else {
                          setShowMetadata(false);
                        }
                      }}
                    />
                    <label
                      htmlFor={"show-metadata-checkbox"}
                      className="text-sm"
                    >
                      Show metadata
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={"show-look-at-target-checkbox"}
                      checked={lookAtTarget.isShowTargetMarker}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setLookAtTarget({
                            isShowTargetMarker: true,
                          });
                        } else {
                          setLookAtTarget({
                            isShowTargetMarker: false,
                          });
                        }
                      }}
                    />
                    <label
                      htmlFor={"show-look-at-target-checkbox"}
                      className="text-sm"
                    >
                      Show look at target
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Canvas>
        <TestingScene
          objectPosition={object.position}
          objectScale={object.scale}
          groundPosition={ground.position}
          objectRotation={object.rotation}
          lookAtTarget={lookAtTarget.position}
          showTarget={lookAtTarget.isShowTargetMarker}
          model={model}
          groundModel={groundModel}
          lookAtTargetModel={lookAtTargetModel}
          staticBackgroundModels={staticBackgroundModels}
          lights={lights}
          showGround={showGround}
        />
        <CameraControlsInScene
          cameraPosition={camera.desiredPosition}
          cameraFov={camera.desiredFov}
          lookAtTarget={lookAtTarget.position}
          lookAtMode={lookAtTarget.mode}
          isShowGizmos={false}
        />
        <CameraDataCollector onCameraDataChange={handleCameraDataChange} />
      </Canvas>
    </div>
  );
}

export const TestingScene = ({
  objectPosition,
  objectScale,
  objectRotation,
  groundPosition,
  lookAtTarget,
  showTarget,
  model,
  groundModel,
  lookAtTargetModel,
  staticBackgroundModels,
  lights,
  showGround,
}: {
  objectPosition: { x: number; y: number; z: number };
  groundPosition: { x: number; y: number; z: number };
  objectScale: { x: number; y: number; z: number };
  objectRotation: { x: number; y: number; z: number };
  lookAtTarget: { x: number; y: number; z: number };
  model: React.ReactNode;
  groundModel: React.ReactNode;
  lookAtTargetModel: React.ReactNode;
  staticBackgroundModels: React.ReactNode;
  lights: React.ReactNode;
  showTarget?: boolean;
  showGround?: boolean;
}) => {
  const groupRef = useRef<Group>(null);

  // Apply position and scale to the group
  // TODO : IDK WHAT THIS DOES ANYMORE
  // useEffect(() => {
  //   if (groupRef.current) {
  //     groupRef.current.position.set(
  //       objectPosition.x,
  //       objectPosition.y,
  //       objectPosition.z
  //     );
  //     groupRef.current.scale.set(objectScale.x, objectScale.y, objectScale.z);
  //   }
  // }, [objectPosition, objectScale]);

  return (
    <>
      {/* <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} /> */}
      {/* TODO : NOT WORKING PROPERLY, there is light in the scene no matter what, and im not sure if additional light work */}
      {lights}
      {/* Controllable group that can contain any mesh/models */}
      <group
        ref={groupRef}
        position={[objectPosition.x, objectPosition.y, objectPosition.z]}
        scale={[objectScale.x, objectScale.y, objectScale.z]}
        rotation={[objectRotation.x, objectRotation.y, objectRotation.z]}
      >
        {model}
      </group>

      {showGround && (
        <group
          position={[groundPosition.x, groundPosition.y, groundPosition.z]}
        >
          {groundModel}
        </group>
      )}

      {/* Visual indicator for the look-at target point */}
      {showTarget && (
        <group position={[lookAtTarget.x, lookAtTarget.y, lookAtTarget.z]}>
          {lookAtTargetModel}
        </group>
      )}

      <group>{staticBackgroundModels}</group>
    </>
  );
};
