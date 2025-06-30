"use client";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  if (!id || typeof id !== "string") {
    return <div>No preset selected</div>;
  }

  return (
    <div>
      <h1>Preset ID: {id}</h1>
      {/* You can add more content here related to the preset */}
    </div>
  );
}
