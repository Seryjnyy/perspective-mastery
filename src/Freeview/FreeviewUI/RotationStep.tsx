import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { Typography } from "@/components/ui/typographyh3";

interface RotationStepProps {
    rotationDegree: number;
    onRotationDegreeChange: (newRotationDegree: number) => void;
}
export default function RotationStep({
    rotationDegree,
    onRotationDegreeChange,
}: RotationStepProps) {
    const handleRotateDegreePress = (degree: number, pressed: boolean) => {
        if (!pressed) {
            return;
        }

        onRotationDegreeChange(degree);
    };

    return (
        <div>
            <Typography variant="h4">Step</Typography>
            {[15, 30, 45, 60, 75, 90].map((degree) => (
                <Toggle
                    key={degree}
                    pressed={rotationDegree == degree}
                    onPressedChange={(pressed) =>
                        handleRotateDegreePress(degree, pressed)
                    }
                >
                    {degree}
                </Toggle>
            ))}
        </div>
    );
}
