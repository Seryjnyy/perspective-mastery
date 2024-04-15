import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function HowDoIUseThis() {
  return (
    <Dialog>
      <DialogTrigger className={cn(buttonVariants({ variant: "outline" }))}>
        How do I use this?
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>How do I use this?</DialogTitle>
          <ScrollArea className="max-h-[36rem] md:max-h-[40rem]">
            <div className="space-y-8">
              <div className="my-4">
                <p>There are many ways you can use this site.</p>
                <ul className="list-disc ml-8 opacity-80">
                  <li>You can use it to study perspective by doing Journey.</li>
                  <li>
                    You can use if for references by putting models in desired
                    positions.
                  </li>
                  <li>You can use it for warm ups before drawing.</li>
                </ul>
              </div>

              <div>
                <p>
                  Primarily it is a tool for you to practice drawing things in
                  various positions and angles.
                </p>
              </div>

              <div>
                <span className="font-bold">What I recommend</span>
                <ol className="space-y-4 list-disc ml-8 opacity-80">
                  <li>
                    <p>
                      Go through each frame, draw it out, see how things change
                      when you rotate/move the object.
                    </p>
                  </li>
                  <li>
                    <p>
                      Next, draw it out again without looking at any reference,
                      then you can compare to see what it meant to look like.
                    </p>
                  </li>
                </ol>
              </div>

              <div className="flex flex-col gap-4 text-sm opacity-80 pt-4">
                <p>
                  <span className="font-bold">Note:</span> it takes repeated
                  practice to really learn something, come back every now and
                  then to revisit challenges.
                </p>
                <p>
                  <span className="font-bold">Tip:</span>{" "}
                  {
                    "don't try to rush through the entire catalogue, take your time on to understand things."
                  }
                </p>
              </div>
            </div>
          </ScrollArea>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
