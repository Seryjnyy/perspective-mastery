import React from "react";

export default function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-2 sm:px-16 md:px-24 pt-24 md:pb-12 ">
      <div className="flex flex-col mx-1 md:mx-8 mt-8 relative">
        {" "}
        <div>
          <span>
            Well you can do this in blender or any other 3D modeling software
          </span>
          <span>
            {
              "well of course you can, but its extra resistance that you don't need when your facing something as tedious as learning perspective."
            }
          </span>
        </div>
        <div>
          <h2>Why?</h2>
          <p>
            If you tried to learn how to draw before you might have come across
            drawabox, or you might have heard of the infamous 250 box challenge.
          </p>
          <p>
            {
              "I think these challenges are great way to really ingrain that perspective knowledge you've learnt, but drawing random boxes and cylinders in my opinion isn't the most efficient way to do so."
            }
          </p>
          <p>
            You should look at references of how things look like before drawing
            them, so why not boxes and cylinders?
          </p>
        </div>
      </div>
    </main>
  );
}
