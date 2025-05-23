import { ReactNode } from "react";

const DataDisplaySection = ({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) => {
    return (
        <div>
            <h3 className="font-bold mb-1">{title}</h3>
            <div>{children}</div>
        </div>
    );
};

// const DataDisplayObject = (data: Record<string, any>) => {
//     return (
//         <div>
//             {/* <strong>Position:</strong> x: {cameraData.position.x}, y:{" "}
//                     {cameraData.position.y}, z: {cameraData.position.z} */}

//             <div className="space-y-1 text-sm font-mono">
//                 {Object.entries(data).map(([key, value]) => (
//                     <div key={key} className="flex justify-between gap-2">
//                         <strong className="text-gray-500">{key}:</strong>
//                         <span>{JSON.stringify(value).substring()}</span>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
type KeyValueDisplayProps = {
    data: Record<string, any>;
    level?: number;
};

function DataDisplayObject({ data, level = 0 }: KeyValueDisplayProps) {
    return (
        <div className={`space-y-1 pl-${level * 4}`}>
            {Object.entries(data).map(([key, value]) => (
                <div key={key}>
                    <div className="flex gap-2">
                        <span className="text-gray-500">{key}:</span>
                        {typeof value === "object" && value !== null ? (
                            <DataDisplayObject data={value} level={level + 1} />
                        ) : (
                            <span className="text-white">{String(value)}</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export { DataDisplaySection, DataDisplayObject };
