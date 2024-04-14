import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const websites = [
  {
    iconSrc:
      "https://d15v304a6xpq4b.cloudfront.net/assets/images/drawabox-logo.png",
  },
];

const WebsiteCard = () => {
  return (
    <Card className="w-[24rem]">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div className="flex items-center gap-4">
            <img
              src={
                "https://d15v304a6xpq4b.cloudfront.net/assets/images/icons/favicon-32x32.png"
              }
              onClick={() => window.open("https://drawabox.com", "_blank")}
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
    <div className="flex p-0 gap-4 mt-8 flex-wrap justify-center md:justify-start ">
      {websites.map((website, index) => (
        <WebsiteCard key={index} />
      ))}
    </div>
  );
}
