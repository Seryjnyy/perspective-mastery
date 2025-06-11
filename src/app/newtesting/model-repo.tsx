import { Edges } from "@react-three/drei";
import { Vec3 } from "./useGlobalSceneStore";
import { Vector3 } from "@react-three/fiber";
import { GroundModel, LightType, LookAtTargetModel } from "./types";

const modelRepo = {
    /**
     * This returns primitive models.
     * If you want to load a model from a url, use ModelGetter component.
     */
    getModel: (
        modelName: string,
        position?: Vec3 | null,
        scale?: Vec3 | null,
        rotation?: Vec3 | null
    ) => {
        position = position || { x: 0, y: 0, z: 0 };
        scale = scale || { x: 1, y: 1, z: 1 };
        rotation = rotation || { x: 0, y: 0, z: 0 };

        let model: React.ReactNode;
        switch (modelName) {
            case "cube":
                model = (
                    <mesh>
                        <boxGeometry args={[2, 2, 2]} />
                        <meshBasicMaterial
                            color={"#33ff20"}
                            opacity={0}
                            transparent
                        />
                        <Edges scale={1} threshold={10} color="red" />
                    </mesh>
                );
                break;
            case "cylinder":
                model = (
                    <mesh>
                        <cylinderGeometry args={[1.3, 1.3, 2, 32]} />
                        <meshBasicMaterial
                            color={"#33ff20"}
                            opacity={0}
                            transparent
                        />
                        <Edges scale={1} threshold={10} color="white" />
                    </mesh>
                );
                break;
            // check for url
            default:
                model = <></>;
        }

        return (
            <group
                position={[position.x, position.y, position.z]}
                scale={[scale.x, scale.y, scale.z]}
                rotation={[rotation.x, rotation.y, rotation.z]}
            >
                {model}
            </group>
        );
    },
    getGroundModel: (
        modelName: GroundModel,
        position?: Vec3 | null,
        scale?: Vec3 | null,
        rotation?: Vec3 | null
    ) => {
        position = position || { x: 0, y: 0, z: 0 };
        scale = scale || { x: 1, y: 1, z: 1 };
        rotation = rotation || { x: 0, y: 0, z: 0 };

        switch (modelName) {
            case "grid":
                return (
                    <gridHelper
                        args={[10, 10]}
                        position={[position.x, position.y, position.z]}
                        scale={[scale.x, scale.y, scale.z]}
                        rotation={[rotation.x, rotation.y, rotation.z]}
                    />
                );
        }
    },

    getLookAtTargetModel: (
        modelName: LookAtTargetModel,
        position?: Vec3 | null,
        scale?: Vec3 | null,
        rotation?: Vec3 | null
    ) => {
        position = position || { x: 0, y: 0, z: 0 };
        scale = scale || { x: 1, y: 1, z: 1 };
        rotation = rotation || { x: 0, y: 0, z: 0 };

        switch (modelName) {
            case "sphere":
                return (
                    <mesh
                        position={[position.x, position.y, position.z]}
                        scale={[scale.x, scale.y, scale.z]}
                        rotation={[rotation.x, rotation.y, rotation.z]}
                    >
                        <sphereGeometry args={[0.05, 16, 16]} />
                        <meshBasicMaterial color="red" />
                    </mesh>
                );
        }
    },
    getLightModel: (
        lightType: LightType,
        position?: Vec3 | null,
        scale?: Vec3 | null,
        rotation?: Vec3 | null,
        intensity?: number | null
    ) => {
        position = position || { x: 0, y: 0, z: 0 };
        scale = scale || { x: 1, y: 1, z: 1 };
        rotation = rotation || { x: 0, y: 0, z: 0 };
        intensity = intensity || 1;

        switch (lightType) {
            case "point":
                return (
                    <pointLight
                        position={[position.x, position.y, position.z]}
                        intensity={intensity}
                        color="red"
                    />
                );
            case "directional":
                return (
                    <directionalLight
                        position={[position.x, position.y, position.z]}
                        intensity={intensity}
                    />
                );
            case "ambient":
                return <ambientLight intensity={intensity} />;
        }
    },
};

export default modelRepo;
