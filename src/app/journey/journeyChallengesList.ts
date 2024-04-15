type Level = {
  id: string;
  camera: string;
  imgSrc: string;
  viewerLink: string;
};

type Challenge = {
  id: string;
  title: string;
  desc: string;
  axis: string;
  levels: Level[];
};

const createImgSrcPath = (img: string) => {
  console.log(`/journey/${img}.png`);
  return `/journey/${img}.png`;
};

const boxCircleChallenges: Challenge[] = [
  {
    id: "box-circle-y",
    title: "Circling box",
    desc: "Circle around the y axis.",
    axis: "y",
    levels: [
      {
        id: "box-circle-above-y",

        camera: "above",
        imgSrc: createImgSrcPath("box-circle-above-y"),
        viewerLink: "/viewer/box/circle/above/y",
      },
      {
        id: "box-circle-level-y",

        camera: "level",
        imgSrc: createImgSrcPath("box-circle-level-y"),
        viewerLink: "/viewer/box/circle/level/y",
      },
      {
        id: "box-circle-below-y",

        camera: "below",
        imgSrc: createImgSrcPath("box-circle-below-y"),
        viewerLink: "/viewer/box/circle/below/y",
      },
    ],
  },
  {
    id: "box-circle-x",
    title: "Circling box",
    desc: "Circle around the x axis.",
    axis: "x",
    levels: [
      {
        id: "box-circle-above-x",

        camera: "above",
        imgSrc: createImgSrcPath("box-circle-above-x"),
        viewerLink: "/viewer/box/circle/above/x",
      },
      {
        id: "box-circle-level-x",

        camera: "level",
        imgSrc: createImgSrcPath("box-circle-level-x"),
        viewerLink: "/viewer/box/circle/level/x",
      },
      {
        id: "box-circle-below-x",

        camera: "below",
        imgSrc: createImgSrcPath("box-circle-below-x"),
        viewerLink: "/viewer/box/circle/below/x",
      },
    ],
  },
  {
    id: "box-circle-z",
    title: "Circling box",
    desc: "Circle around the z axis.",
    axis: "z",
    levels: [
      {
        id: "box-circle-above-z",

        camera: "above",
        imgSrc: createImgSrcPath("box-circle-above-z"),
        viewerLink: "/viewer/box/circle/above/z",
      },
      {
        id: "box-circle-level-z",

        camera: "level",
        imgSrc: createImgSrcPath("box-circle-level-z"),
        viewerLink: "/viewer/box/circle/level/z",
      },
      {
        id: "box-circle-below-z",

        camera: "below",
        imgSrc: createImgSrcPath("box-circle-below-z"),
        viewerLink: "/viewer/box/circle/below/z",
      },
    ],
  },
];

const cylinderCircleChallenges: Challenge[] = [
  {
    id: "cylinder-circle-y",
    title: "Circling cylinder",
    desc: "Circle around the y axis.",
    axis: "y",
    levels: [
      {
        id: "cylinder-circle-above-y",
        camera: "above",
        imgSrc: createImgSrcPath("cylinder-circle-above-y"),
        viewerLink: "/viewer/cylinder/circle/above/y",
      },
      {
        id: "cylinder-circle-level-y",
        camera: "level",
        imgSrc: createImgSrcPath("cylinder-circle-level-y"),
        viewerLink: "/viewer/cylinder/circle/level/y",
      },
      {
        id: "cylinder-circle-below-y",

        camera: "below",
        imgSrc: createImgSrcPath("cylinder-circle-below-y"),
        viewerLink: "/viewer/cylinder/circle/below/y",
      },
    ],
  },
  {
    id: "cylinder-circle-x",
    title: "Circling cylinder",
    desc: "Circle around the x axis.",
    axis: "x",
    levels: [
      {
        id: "cylinder-circle-above-x",

        camera: "above",
        imgSrc: createImgSrcPath("cylinder-circle-above-x"),
        viewerLink: "/viewer/cylinder/circle/above/x",
      },
      {
        id: "cylinder-circle-level-x",

        camera: "level",
        imgSrc: createImgSrcPath("cylinder-circle-level-x"),
        viewerLink: "/viewer/cylinder/circle/level/x",
      },
      {
        id: "cylinder-circle-below-x",

        camera: "below",
        imgSrc: createImgSrcPath("cylinder-circle-below-x"),
        viewerLink: "/viewer/cylinder/circle/below/x",
      },
    ],
  },
  {
    id: "cylinder-circle-z",
    title: "Circling cylinder",
    desc: "Circle around the z axis.",
    axis: "z",
    levels: [
      {
        id: "cylinder-circle-above-z",

        camera: "above",
        imgSrc: createImgSrcPath("cylinder-circle-above-z"),
        viewerLink: "/viewer/cylinder/circle/above/z",
      },
      {
        id: "cylinder-circle-level-z",

        camera: "level",
        imgSrc: createImgSrcPath("cylinder-circle-level-z"),
        viewerLink: "/viewer/cylinder/circle/level/z",
      },
      {
        id: "cylinder-circle-below-z",

        camera: "below",
        imgSrc: createImgSrcPath("cylinder-circle-below-z"),
        viewerLink: "/viewer/cylinder/circle/below/z",
      },
    ],
  },
];

const boxRotateChallenges: Challenge[] = [
  {
    id: "box-rotate-y",
    title: "Box rotation",
    desc: "Rotation around the y axis.",
    axis: "y",
    levels: [
      {
        id: "box-rotate-above-y",

        camera: "above",
        imgSrc: createImgSrcPath("box-rotate-above-y"),
        viewerLink: "/viewer/box/rotate/above/y",
      },
      {
        id: "box-rotate-level-y",

        camera: "level",
        imgSrc: createImgSrcPath("box-rotate-level-y"),
        viewerLink: "/viewer/box/rotate/level/y",
      },
      {
        id: "box-rotate-below-y",

        camera: "below",
        imgSrc: createImgSrcPath("box-rotate-below-y"),
        viewerLink: "/viewer/box/rotate/below/y",
      },
    ],
  },
  {
    id: "box-rotate-x",
    title: "Box rotation",
    desc: "Rotation around the x axis.",
    axis: "x",
    levels: [
      {
        id: "box-rotate-above-x",
        camera: "above",
        imgSrc: createImgSrcPath("box-rotate-above-x"),
        viewerLink: "/viewer/box/rotate/above/x",
      },
      {
        id: "box-rotate-level-x",
        camera: "level",
        imgSrc: createImgSrcPath("box-rotate-level-x"),
        viewerLink: "/viewer/box/rotate/level/x",
      },
      {
        id: "box-rotate-below-x",
        camera: "below",
        imgSrc: createImgSrcPath("box-rotate-below-x"),
        viewerLink: "/viewer/box/rotate/below/x",
      },
    ],
  },
  {
    id: "box-rotate-z",
    title: "Box rotation",
    desc: "Rotation around the z axis.",
    axis: "z",
    levels: [
      {
        id: "box-rotate-above-z",
        camera: "above",
        imgSrc: createImgSrcPath("box-rotate-above-z"),
        viewerLink: "/viewer/box/rotate/above/z",
      },
      {
        id: "box-rotate-level-z",
        camera: "level",
        imgSrc: createImgSrcPath("box-rotate-level-z"),
        viewerLink: "/viewer/box/rotate/level/z",
      },
      {
        id: "box-rotate-below-z",
        camera: "below",
        imgSrc: createImgSrcPath("box-rotate-below-z"),
        viewerLink: "/viewer/box/rotate/below/z",
      },
    ],
  },
];

const cylinderRotateChallenges: Challenge[] = [
  {
    id: "cylinder-rotate-y",
    title: "Cylinder rotation",
    desc: "Rotation around the y axis.",
    axis: "y",
    levels: [
      {
        id: "cylinder-rotate-above-y",

        camera: "above",
        imgSrc: createImgSrcPath("cylinder-rotate-above-y"),
        viewerLink: "/viewer/cylinder/rotate/above/y",
      },
      {
        id: "cylinder-rotate-level-y",

        camera: "level",
        imgSrc: createImgSrcPath("cylinder-rotate-level-y"),
        viewerLink: "/viewer/cylinder/rotate/level/y",
      },
      {
        id: "cylinder-rotate-below-y",
        camera: "below",
        imgSrc: createImgSrcPath("cylinder-rotate-below-y"),
        viewerLink: "/viewer/cylinder/rotate/below/y",
      },
    ],
  },
  {
    id: "cylinder-rotate-x",
    title: "Cylinder rotation",
    desc: "Rotation around the x axis.",
    axis: "x",
    levels: [
      {
        id: "cylinder-rotate-above-x",

        camera: "above",
        imgSrc: createImgSrcPath("cylinder-rotate-above-x"),
        viewerLink: "/viewer/cylinder/rotate/above/x",
      },
      {
        id: "cylinder-rotate-level-x",

        camera: "level",
        imgSrc: createImgSrcPath("cylinder-rotate-level-x"),
        viewerLink: "/viewer/cylinder/rotate/level/x",
      },
      {
        id: "cylinder-rotate-below-x",

        camera: "below",
        imgSrc: createImgSrcPath("cylinder-rotate-below-x"),
        viewerLink: "/viewer/cylinder/rotate/below/x",
      },
    ],
  },
  {
    id: "cylinder-rotate-z",
    title: "Cylinder rotation",
    desc: "Rotation around the z axis.",
    axis: "z",
    levels: [
      {
        id: "cylinder-rotate-above-z",

        camera: "above",
        imgSrc: createImgSrcPath("cylinder-rotate-above-z"),
        viewerLink: "/viewer/cylinder/rotate/above/z",
      },
      {
        id: "cylinder-rotate-level-z",

        camera: "level",
        imgSrc: createImgSrcPath("cylinder-rotate-level-z"),
        viewerLink: "/viewer/cylinder/rotate/level/z",
      },
      {
        id: "cylinder-rotate-below-z",

        camera: "below",
        imgSrc: createImgSrcPath("cylinder-rotate-below-z"),
        viewerLink: "/viewer/cylinder/rotate/below/z",
      },
    ],
  },
];

export const getBoxCircleChallenges = () => {
  return boxCircleChallenges;
};

export const getCylinderCircleChallenges = () => {
  return cylinderCircleChallenges;
};

export const getBoxRotateChallenges = () => {
  return boxRotateChallenges;
};

export const getCylinderRotateChallenges = () => {
  return cylinderRotateChallenges;
};

export const getAllChallengesInOrder = () => {
  return [
    ...getBoxRotateChallenges(),
    ...getCylinderRotateChallenges(),
    ...getBoxCircleChallenges(),
    ...getCylinderCircleChallenges(),
  ];
};
