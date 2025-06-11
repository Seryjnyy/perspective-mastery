"use client";

import { ReactNode, useEffect, useState } from "react";
import {
    Heart,
    ThumbsUp,
    Calendar,
    Filter,
    ChevronDown,
    Camera,
    Move,
    Eye,
    RotateCcw,
    Star,
    Check,
    Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { AnimationPresetLocalModel, testAnimationPresets } from "./types";
import { useRouter } from "next/navigation";
import modelRepo from "./model-repo";
import { animationPresetRepo } from "./animation-preset-repo";

// Mock data
const libraryItems = [
    {
        id: 1,
        title: "Smooth Camera Pan",
        description:
            "A gentle camera movement that follows the subject smoothly across the scene",
        isFavorite: true,
        lastUsed: "2 hours ago",
        difficulty: "Easy",
        upvotes: 24,
        dateCreated: "2024-01-15",
        properties: ["Camera Moves", "Look at Target"],
        category: "library",
    },
    {
        id: 2,
        title: "Object Rotation Sequence",
        description:
            "Complex rotation animation with multiple objects moving in sync",
        isFavorite: false,
        lastUsed: "1 day ago",
        difficulty: "Hard",
        upvotes: 156,
        dateCreated: "2024-01-10",
        properties: ["Object Moves", "Object Rotates"],
        category: "library",
    },
    {
        id: 3,
        title: "Dynamic Focus Shift",
        description:
            "Professional camera technique that shifts focus between foreground and background",
        isFavorite: true,
        lastUsed: "3 days ago",
        difficulty: "Medium",
        upvotes: 89,
        dateCreated: "2024-01-08",
        properties: ["Camera Moves", "Look at Target"],
        category: "library",
    },
];

const communityItems = [
    {
        id: 4,
        title: "Epic Drone Shot",
        description:
            "Cinematic drone movement that reveals the landscape dramatically",
        isFavorite: false,
        lastUsed: null,
        difficulty: "Extra Hard",
        upvotes: 342,
        dateCreated: "2024-01-12",
        properties: ["Camera Moves", "Object Moves"],
        category: "community",
    },
    {
        id: 5,
        title: "Product Showcase Spin",
        description:
            "Perfect for product demonstrations with smooth 360-degree rotation",
        isFavorite: true,
        lastUsed: "5 hours ago",
        difficulty: "Easy",
        upvotes: 78,
        dateCreated: "2024-01-14",
        properties: ["Object Rotates", "Look at Target"],
        category: "community",
    },
    {
        id: 6,
        title: "Multi-Object Choreography",
        description:
            "Complex animation involving multiple objects with synchronized movements",
        isFavorite: false,
        lastUsed: null,
        difficulty: "Extra Hard",
        upvotes: 203,
        dateCreated: "2024-01-09",
        properties: ["Object Moves", "Object Rotates", "Camera Moves"],
        category: "community",
    },
    {
        id: 7,
        title: "Product Showcase Spin",
        description:
            "Perfect for product demonstrations with smooth 360-degree rotation",
        isFavorite: true,
        lastUsed: "5 hours ago",
        difficulty: "Easy",
        upvotes: 78,
        dateCreated: "2024-01-14",
        properties: ["Object Rotates", "Look at Target"],
        category: "community",
    },
    {
        id: 8,
        title: "Multi-Object Choreography",
        description:
            "Complex animation involving multiple objects with synchronized movements",
        isFavorite: false,
        lastUsed: null,
        difficulty: "Extra Hard",
        upvotes: 203,
        dateCreated: "2024-01-09",
        properties: ["Object Moves", "Object Rotates", "Camera Moves"],
        category: "community",
    },
];

const propertyIcons = {
    "Camera Moves": Camera,
    "Object Moves": Move,
    "Look at Target": Eye,
    "Object Rotates": RotateCcw,
};

const difficultyColors = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hard: "bg-orange-100 text-orange-800",
    "extra hard": "bg-red-100 text-red-800",
};

export default function ContentLibrarySection({
    children,
    selectedAnimationPreset,
    setSelectedAnimationPreset,
}: {
    children: ReactNode;
    selectedAnimationPreset: AnimationPresetLocalModel | null;
    setSelectedAnimationPreset: (
        preset: AnimationPresetLocalModel | null
    ) => void;
}) {
    const [activeTab, setActiveTab] = useState("library");
    const [sortBy, setSortBy] = useState("recent");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
    const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
        []
    );
    const router = useRouter();
    const sortOptions = {
        library: [
            { value: "recent", label: "Used Recently" },
            { value: "upvotes", label: "Highest Upvotes" },
            { value: "uses", label: "Most Uses" },
            { value: "created", label: "Date Created" },
        ],
        community: [
            { value: "upvotes", label: "Highest Upvotes" },
            { value: "recent", label: "Recently Added" },
            { value: "popular", label: "Most Popular" },
            { value: "created", label: "Date Created" },
        ],
    };

    const allProperties = [
        "Camera Moves",
        "Object Moves",
        "Look at Target",
        "Object Rotates",
    ];
    const allDifficulties = ["easy", "medium", "hard", "extra hard"];

    const toggleFavorite = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        // Handle favorite toggle logic here
    };

    const toggleUpvote = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        // Handle upvote logic here
    };

    useEffect(() => {
        const animationPresets = animationPresetRepo.getAnimationPresets();
        if (selectedAnimationPreset == null && animationPresets.length > 0) {
            setSelectedAnimationPreset(animationPresets[0]);
        }
    }, [selectedAnimationPreset]);

    const canUpvote = false;

    return (
        <div className="h-[calc(100vh-4rem)] flex">
            {/* Left Panel - Content Library */}
            <div className="w-1/2 border-r bg-background flex flex-col">
                <div className="p-6 border-b">
                    <h2 className="text-2xl font-bold mb-4">Content Library</h2>
                </div>

                {/* Content List */}
                <div className="flex-1 overflow-y-auto p-6">
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full h-full flex flex-col"
                    >
                        <TabsList className="grid w-full grid-cols-2 mb-4">
                            <TabsTrigger value="library">
                                My Library
                            </TabsTrigger>
                            {/* <TabsTrigger value="community">Community</TabsTrigger> */}
                        </TabsList>

                        <div className="flex gap-4 mb-6">
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sortOptions[
                                        activeTab as keyof typeof sortOptions
                                    ].map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Collapsible
                                open={isFilterOpen}
                                onOpenChange={setIsFilterOpen}
                            >
                                <CollapsibleTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="flex items-center gap-2"
                                    >
                                        <Filter className="w-4 h-4" />
                                        Filter
                                        <ChevronDown className="w-4 h-4" />
                                    </Button>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="absolute z-10 mt-2 p-4 bg-background border rounded-lg shadow-lg min-w-64">
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-medium mb-2">
                                                Properties
                                            </h4>
                                            <div className="space-y-2">
                                                {allProperties.map(
                                                    (property) => (
                                                        <div
                                                            key={property}
                                                            className="flex items-center space-x-2"
                                                        >
                                                            <Checkbox
                                                                id={property}
                                                                checked={selectedProperties.includes(
                                                                    property
                                                                )}
                                                                onCheckedChange={(
                                                                    checked
                                                                ) => {
                                                                    if (
                                                                        checked
                                                                    ) {
                                                                        setSelectedProperties(
                                                                            [
                                                                                ...selectedProperties,
                                                                                property,
                                                                            ]
                                                                        );
                                                                    } else {
                                                                        setSelectedProperties(
                                                                            selectedProperties.filter(
                                                                                (
                                                                                    p
                                                                                ) =>
                                                                                    p !==
                                                                                    property
                                                                            )
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                            <label
                                                                htmlFor={
                                                                    property
                                                                }
                                                                className="text-sm"
                                                            >
                                                                {property}
                                                            </label>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        <Separator />

                                        <div>
                                            <h4 className="font-medium mb-2">
                                                Difficulty
                                            </h4>
                                            <div className="space-y-2">
                                                {allDifficulties.map(
                                                    (difficulty) => (
                                                        <div
                                                            key={difficulty}
                                                            className="flex items-center space-x-2"
                                                        >
                                                            <Checkbox
                                                                id={difficulty}
                                                                checked={selectedDifficulties.includes(
                                                                    difficulty
                                                                )}
                                                                onCheckedChange={(
                                                                    checked
                                                                ) => {
                                                                    if (
                                                                        checked
                                                                    ) {
                                                                        setSelectedDifficulties(
                                                                            [
                                                                                ...selectedDifficulties,
                                                                                difficulty,
                                                                            ]
                                                                        );
                                                                    } else {
                                                                        setSelectedDifficulties(
                                                                            selectedDifficulties.filter(
                                                                                (
                                                                                    d
                                                                                ) =>
                                                                                    d !==
                                                                                    difficulty
                                                                            )
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                            <label
                                                                htmlFor={
                                                                    difficulty
                                                                }
                                                                className="text-sm"
                                                            >
                                                                {difficulty}
                                                            </label>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        </div>

                        <TabsContent
                            value="library"
                            className="flex-1 space-y-4 overflow-y-auto p-2"
                        >
                            {testAnimationPresets.map((item) => (
                                <Card
                                    key={item.id}
                                    className={`cursor-pointer transition-all hover:shadow-md ${
                                        selectedAnimationPreset?.id === item.id
                                            ? "ring-2 ring-primary bg-primary/5"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setSelectedAnimationPreset(item)
                                    }
                                >
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg">
                                                    {item.metadata.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {item.metadata.desc}
                                                </p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) =>
                                                    toggleFavorite(item.id, e)
                                                }
                                                className="ml-2"
                                            >
                                                <Heart
                                                    className={`w-4 h-4 ${
                                                        item.metadata.isFavorite
                                                            ? "fill-red-500 text-red-500"
                                                            : ""
                                                    }`}
                                                />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {item.metadata.tags.map(
                                                (property) => {
                                                    // TODO: Add icons
                                                    // const Icon =
                                                    //   propertyIcons[property as keyof typeof propertyIcons];
                                                    return (
                                                        <Badge
                                                            key={property}
                                                            variant="secondary"
                                                            className="flex items-center gap-1"
                                                        >
                                                            {/* <Icon className="w-3 h-3" /> */}
                                                            {property}
                                                        </Badge>
                                                    );
                                                }
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                                            <div className="flex items-center gap-4">
                                                <Badge
                                                    className={
                                                        difficultyColors[
                                                            item.metadata
                                                                .difficulty as keyof typeof difficultyColors
                                                        ]
                                                    }
                                                >
                                                    {item.metadata.difficulty}
                                                </Badge>
                                                {item.metadata.lastUsedAt && (
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {
                                                            item.metadata
                                                                .lastUsedAt
                                                        }
                                                    </span>
                                                )}

                                                <div className="flex items-center gap-1 text-emerald-500">
                                                    <Check className="w-3 h-3" />
                                                    <span>09/06/2025</span>
                                                </div>
                                            </div>

                                            {canUpvote && (
                                                <div className="flex items-center gap-4">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={(e) =>
                                                            toggleUpvote(
                                                                item.id,
                                                                e
                                                            )
                                                        }
                                                        className="flex items-center gap-1 h-auto p-1"
                                                    >
                                                        <ThumbsUp className="w-3 h-3" />
                                                        {/* TODO: Add upvotes */}
                                                        {/* {item.metadata.upvotes} */}
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </TabsContent>

                        <TabsContent
                            value="community"
                            className="flex-1 space-y-4 overflow-y-auto"
                        >
                            {/* {communityItems.map((item) => (
                <Card
                  key={item.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedItem === item.id
                      ? "ring-2 ring-primary bg-primary/5"
                      : ""
                  }`}
                  onClick={() => setSelectedItem(item.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.description}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => toggleFavorite(item.id, e)}
                        className="ml-2"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            item.isFavorite ? "fill-red-500 text-red-500" : ""
                          }`}
                        />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.properties.map((property) => {
                        const Icon =
                          propertyIcons[property as keyof typeof propertyIcons];
                        return (
                          <Badge
                            key={property}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            <Icon className="w-3 h-3" />
                            {property}
                          </Badge>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <Badge
                          className={
                            difficultyColors[
                              item.difficulty as keyof typeof difficultyColors
                            ]
                          }
                        >
                          {item.difficulty}
                        </Badge>
                        {item.lastUsed && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.lastUsed}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4">
                        <span>{item.dateCreated}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => toggleUpvote(item.id, e)}
                          className="flex items-center gap-1 h-auto p-1"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          {item.upvotes}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))} */}
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Bottom Action Button */}
                <div className="p-6 border-t">
                    <Button
                        className="w-full"
                        disabled={!selectedAnimationPreset}
                        size="lg"
                        onClick={() => {
                            if (selectedAnimationPreset) {
                                // setSelectedAnimationPreset(null);
                                // TODO
                                router.push(
                                    `guided/${selectedAnimationPreset.id}`
                                );
                            }
                        }}
                    >
                        {selectedAnimationPreset
                            ? "Use Selected Item"
                            : "Select an Item to Continue"}
                    </Button>
                </div>
            </div>

            {/* Right Panel - Canvas */}
            <div className="w-1/2  flex items-center justify-center relative">
                {children}
            </div>
        </div>
    );
}
