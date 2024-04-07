// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Typography } from "@/components/ui/typography";
// import { GearIcon } from "@radix-ui/react-icons";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import React, { ReactNode, useEffect, useState } from "react";
// import { useAnimatedContext } from "./AnimatedContext";
// import { Progress } from "@/components/ui/progress";
// import { useToast } from "@/components/ui/use-toast";
// import { ToastAction } from "@/components/ui/toast";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   addCompleteChallengeLevel,
//   addCompletedChallenge,
// } from "@/Services/challengeService";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";

// export function ViewerSettingsTitle({children}:{children:ReactNode}){
//     return(<SheetHeader>
//         <SheetTitle className="text-2xl">{children}</SheetTitle>
//       </SheetHeader>)
// }

// export default function ViewerSettings() {
//   return (
//     <Sheet>
//         <SheetTrigger className="absolute left-52 bottom-5  z-20">
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <GearIcon className="w-6 h-6" />
//               </TooltipTrigger>
//               <TooltipContent align="center" side="right">
//                 <p>Settings</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </SheetTrigger>
//         <SheetContent>
//           <SheetHeader>
//             <SheetTitle className="text-2xl">Settings</SheetTitle>
//           </SheetHeader>
//           <ScrollArea className="h-screen ">
//             <div className="flex items-center gap-2">
//               <Label className="scroll-m-20 text-xl font-semibold tracking-tight">
//                 Fisheye
//               </Label>

//               <Checkbox
//                 checked={true}
//                 // onCheckedChange={(checked) =>
//                 //   handleFisheyeChange(
//                 //     checked == "indeterminate" ? false : checked
//                 //   )
//                 // }
//               />
//             </div>
//           </ScrollArea>
//         </SheetContent>
//       </Sheet>
//   )
// }
