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
  return `/journey/${img}.png`;
};

const boxCircleChallenges: Challenge[] = [
  {
    id: "box_circle_y",
    title: "Circling box",
    desc: "Circle around the y axis.",
    axis: "y",
    levels: [
      {
        id: "boxCircleAboveY",

        camera: "above",
        imgSrc: createImgSrcPath("boxCircleAboveY"),
        viewerLink: "/viewer/box/circle/above/y",
      },
      {
        id: "boxCircleLevelY",

        camera: "level",
        imgSrc: createImgSrcPath("boxCircleLevelY"),
        viewerLink: "/viewer/box/circle/level/y",
      },
      {
        id: "boxCircleBelowY",

        camera: "below",
        imgSrc: createImgSrcPath("boxCircleBelowY"),
        viewerLink: "/viewer/box/circle/below/y",
      },
    ],
  },
  {
    id: "box_circle_x",
    title: "Circling box",
    desc: "Circle around the x axis.",
    axis: "x",
    levels: [
      {
        id: "boxCircleAboveX",

        camera: "above",
        imgSrc: createImgSrcPath("boxCircleAboveX"),
        viewerLink: "/viewer/box/circle/above/x",
      },
      {
        id: "boxCircleLevelX",

        camera: "level",
        imgSrc: createImgSrcPath("boxCircleLevelX"),
        viewerLink: "/viewer/box/circle/level/x",
      },
      {
        id: "boxCircleBelowX",

        camera: "below",
        imgSrc: createImgSrcPath("boxCircleBelowX"),
        viewerLink: "/viewer/box/circle/below/x",
      },
    ],
  },
  {
    id: "box_circle_z",
    title: "Circling box",
    desc: "Circle around the z axis.",
    axis: "z",
    levels: [
      {
        id: "boxCircleAboveZ",

        camera: "above",
        imgSrc: createImgSrcPath("boxCircleAboveZ"),
        viewerLink: "/viewer/box/circle/above/z",
      },
      {
        id: "boxCircleLevelZ",

        camera: "level",
        imgSrc: createImgSrcPath("boxCircleLevelZ"),
        viewerLink: "/viewer/box/circle/level/z",
      },
      {
        id: "boxCircleBelowZ",

        camera: "below",
        imgSrc: createImgSrcPath("boxCircleBelowZ"),
        viewerLink: "/viewer/box/circle/below/z",
      },
    ],
  },
];

const cylinderCircleChallenges: Challenge[] = [
  {
    id: "cylinder_circle_y",
    title: "Circling cylinder",
    desc: "Circle around the y axis.",
    axis: "y",
    levels: [
      {
        id: "cylinder_circle_above_y",
        camera: "above",
        imgSrc: createImgSrcPath("cylinderCircleAboveY"),
        viewerLink: "/viewer/cylinder/circle/above/y",
      },
      {
        id: "cylinder_circle_level_y",
        camera: "level",
        imgSrc: createImgSrcPath("cylinderCircleLevelY"),
        viewerLink: "/viewer/cylinder/circle/level/y",
      },
      {
        id: "cylinder_circle_below_y",

        camera: "below",
        imgSrc: createImgSrcPath("cylinderCircleBelowY"),
        viewerLink: "/viewer/cylinder/circle/below/y",
      },
    ],
  },
  {
    id: "cylinder_circle_x",
    title: "Circling cylinder",
    desc: "Circle around the x axis.",
    axis: "x",
    levels: [
      {
        id: "cylinderCircleAboveX",

        camera: "above",
        imgSrc: createImgSrcPath("cylinderCircleAboveX"),
        viewerLink: "/viewer/cylinder/circle/above/x",
      },
      {
        id: "cylinderCircleLevelX",

        camera: "level",
        imgSrc: createImgSrcPath("cylinderCircleLevelX"),
        viewerLink: "/viewer/cylinder/circle/level/x",
      },
      {
        id: "cylinderCircleBelowX",

        camera: "below",
        imgSrc: createImgSrcPath("cylinderCircleBelowX"),
        viewerLink: "/viewer/cylinder/circle/below/x",
      },
    ],
  },
  {
    id: "cylinder_circle_z",
    title: "Circling cylinder",
    desc: "Circle around the z axis.",
    axis: "z",
    levels: [
      {
        id: "cylinderCircleAboveZ",

        camera: "above",
        imgSrc: createImgSrcPath("cylinderCircleAboveZ"),
        viewerLink: "/viewer/cylinder/circle/above/z",
      },
      {
        id: "cylinderCircleLevelZ",

        camera: "level",
        imgSrc: createImgSrcPath("cylinderCircleLevelZ"),
        viewerLink: "/viewer/cylinder/circle/level/z",
      },
      {
        id: "cylinderCircleBelowZ",

        camera: "below",
        imgSrc: createImgSrcPath("cylinderCircleBelowZ"),
        viewerLink: "/viewer/cylinder/circle/below/z",
      },
    ],
  },
];

const boxRotateChallenges: Challenge[] = [
  {
    id: "box_rotation_y",
    title: "Box rotation",
    desc: "Rotation around the y axis.",
    axis: "y",
    levels: [
      {
        id: "boxRotationAboveY",

        camera: "above",
        imgSrc: createImgSrcPath("boxRotateAboveY"),
        viewerLink: "/viewer/box/rotate/above/y",
      },
      {
        id: "boxRotationLevelY",

        camera: "level",
        imgSrc: createImgSrcPath("boxRotateLevelY"),
        viewerLink: "/viewer/box/rotate/level/y",
      },
      {
        id: "boxRotationBelowY",

        camera: "below",
        imgSrc: createImgSrcPath("boxRotateBelowY"),
        viewerLink: "/viewer/box/rotate/below/y",
      },
    ],
  },
  {
    id: "box_rotation_x",
    title: "Box rotation",
    desc: "Rotation around the x axis.",
    axis: "x",
    levels: [
      {
        id: "boxRotationAboveX",
        camera: "above",
        imgSrc: createImgSrcPath("boxRotateAboveX"),
        viewerLink: "/viewer/box/rotate/above/x",
      },
      {
        id: "boxRotationLevelX",
        camera: "level",
        imgSrc: createImgSrcPath("boxRotateLevelX"),
        viewerLink: "/viewer/box/rotate/level/x",
      },
      {
        id: "boxRotationBelowX",
        camera: "below",
        imgSrc: createImgSrcPath("boxRotateBelowX"),
        viewerLink: "/viewer/box/rotate/below/x",
      },
    ],
  },
  {
    id: "box_rotation_z",
    title: "Box rotation",
    desc: "Rotation around the z axis.",
    axis: "z",
    levels: [
      {
        id: "boxRotationAboveZ",
        camera: "above",
        imgSrc: createImgSrcPath("boxRotateAboveZ"),
        viewerLink: "/viewer/box/rotate/above/z",
      },
      {
        id: "boxRotationLevelZ",
        camera: "level",
        imgSrc: createImgSrcPath("boxRotateLevelZ"),
        viewerLink: "/viewer/box/rotate/level/z",
      },
      {
        id: "boxRotationBelowZ",
        camera: "below",
        imgSrc: createImgSrcPath("boxRotateBelowZ"),
        viewerLink: "/viewer/box/rotate/below/z",
      },
    ],
  },
];

const cylinderRotateChallenges: Challenge[] = [
  {
    id: "cylinder_rotation_y",
    title: "Cylinder rotation",
    desc: "Rotation around the y axis.",
    axis: "y",
    levels: [
      {
        id: "cylinderRotationAboveY",

        camera: "above",
        imgSrc: createImgSrcPath("cylinderRotateAboveY"),
        viewerLink: "/viewer/cylinder/rotate/above/y",
      },
      {
        id: "cylinderRotationLevelY",

        camera: "level",
        imgSrc: createImgSrcPath("cylinderRotateLevelY"),
        viewerLink: "/viewer/cylinder/rotate/level/y",
      },
      {
        id: "cylinderRotationBelowY",

        camera: "below",
        imgSrc: createImgSrcPath("cylinderRotateBelowY"),
        viewerLink: "/viewer/cylinder/rotate/below/y",
      },
    ],
  },
  {
    id: "cylinder_rotation_x",
    title: "Cylinder rotation",
    desc: "Rotation around the x axis.",
    axis: "x",
    levels: [
      {
        id: "cylinderRotationAboveX",

        camera: "above",
        imgSrc: createImgSrcPath("cylinderRotateAboveX"),
        viewerLink: "/viewer/cylinder/rotate/above/x",
      },
      {
        id: "cylinderRotationLevelX",

        camera: "level",
        imgSrc: createImgSrcPath("cylinderRotateLevelX"),
        viewerLink: "/viewer/cylinder/rotate/level/x",
      },
      {
        id: "cylinderRotationBelowX",

        camera: "below",
        imgSrc: createImgSrcPath("cylinderRotateBelowX"),
        viewerLink: "/viewer/cylinder/rotate/below/x",
      },
    ],
  },
  {
    id: "cylinder_rotation_z",
    title: "Cylinder rotation",
    desc: "Rotation around the z axis.",
    axis: "z",
    levels: [
      {
        id: "cylinderRotationAboveZ",

        camera: "above",
        imgSrc: createImgSrcPath("cylinderRotateAboveZ"),
        viewerLink: "/viewer/cylinder/rotate/above/z",
      },
      {
        id: "cylinderRotationLevelZ",

        camera: "level",
        imgSrc: createImgSrcPath("cylinderRotateLevelZ"),
        viewerLink: "/viewer/cylinder/rotate/level/z",
      },
      {
        id: "cylinderRotationBelowZ",

        camera: "below",
        imgSrc: createImgSrcPath("cylinderRotateBelowZ"),
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
