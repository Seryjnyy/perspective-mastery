import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { WebcamIcon } from "lucide-react";
import React from "react";

const websites = [
    {
        iconSrc:
            "https://d15v304a6xpq4b.cloudfront.net/assets/images/drawabox-logo.png",
    },
];

const WebsiteCard = () => {
    return (
        <Card className="w-80 md:w-[20rem] h-full">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            src={
                                "https://d15v304a6xpq4b.cloudfront.net/assets/images/icons/favicon-32x32.png"
                            }
                            onClick={() =>
                                window.open("https://drawabox.com", "_blank")
                            }
                            className="w-8 h-8 rounded-lg cursor-pointer"
                        />

                        <div>
                            <div>{"Drawabox"}</div>
                            <div className="text-sm text-muted-foreground">
                                {"https://drawabox.com"}
                            </div>
                        </div>
                    </div>

                    <Badge variant="outline" className="ml-4 h-6">
                        {"recommend"}
                    </Badge>
                </CardTitle>
            </CardHeader>
        </Card>
    );
};

export default function Websites() {
    return (
        <div>
            {websites.map((website) => (
                <WebsiteCard />
            ))}
        </div>
    );
}
