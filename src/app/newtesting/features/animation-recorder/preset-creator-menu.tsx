"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function ModelCreator() {
    const [model, setModel] = useState("cube");
    const [difficulty, setDifficulty] = useState("easy");
    const [source, setSource] = useState("local");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [steps, setSteps] = useState(0);
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const addTag = () => {
        if (tagInput && !tags.includes(tagInput)) {
            setTags([...tags, tagInput]);
            setTagInput("");
        }
    };

    const removeTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    };

    return (
        <div className="max-w-xl space-y-4 p-4">
            <Select value={model} onValueChange={setModel}>
                <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="cube">Cube</SelectItem>
                    <SelectItem value="cylinder">Cylinder</SelectItem>
                </SelectContent>
            </Select>

            <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Textarea
                placeholder="Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            />
            <Input
                placeholder="Created At"
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)}
                type="text"
            />

            <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                    {["easy", "medium", "hard", "extra hard"].map((level) => (
                        <SelectItem key={level} value={level}>
                            {level}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Input
                placeholder="Recommended Steps"
                type="number"
                value={steps}
                onChange={(e) => setSteps(Number(e.target.value))}
            />

            <Select value={source} onValueChange={setSource}>
                <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="local">Local</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
            </Select>

            <div>
                <div className="flex gap-2 mb-2">
                    <Input
                        placeholder="Add tag"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addTag()}
                    />
                    <Button onClick={addTag}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <div
                            key={tag}
                            className=" rounded-full px-3 py-1 flex items-center"
                        >
                            <span className="mr-2">{tag}</span>
                            <button onClick={() => removeTag(tag)}>
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
