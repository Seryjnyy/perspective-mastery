import confetti from "canvas-confetti";
import { Button } from "./button";

export default function ConfettiCannonButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      variant="outline"
      className="flex flex-row gap-2"
      onClick={() => {
        onClick();
        const end = Date.now() + 1 * 1000; // n seconds
        const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

        const frame = () => {
          if (Date.now() > end) return;

          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            startVelocity: 60,
            origin: { x: 0, y: 0.5 },
            colors: colors,
          });
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            startVelocity: 60,
            origin: { x: 1, y: 0.5 },
            colors: colors,
          });

          requestAnimationFrame(frame);
        };

        frame();
      }}
    >
      {children}
    </Button>
  );
}
