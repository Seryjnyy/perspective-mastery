"use client";
import {ReactNode} from "react";

const ObjectDataDisplaySection = ({
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

type KeyValueDisplayProps = {
    data: Record<string, any>;
    level?: number;
};

function ObjectDataDisplayObject({data, level = 0}: KeyValueDisplayProps) {
    return (
        <div className={`space-y-1 pl-${level * 4}`}>
            {Object.entries(data).map(([key, value]) => (
                <div key={key}>
                    <div className="flex gap-2">
                        <span className="text-gray-500">{key}:</span>
                        {typeof value === "object" && value !== null ? (
                            <ObjectDataDisplayObject data={value} level={level + 1}/>
                        ) : (
                            <span className="text-white">{String(value)}</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export {ObjectDataDisplaySection, ObjectDataDisplayObject};
