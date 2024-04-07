type Level = {
    id:string,
    axis?:string,
    camera:string,
    imgSrc:string,
    viewerLink:string
}

type Challenge = {
    id:string,
    title:string,
    desc:string,
    levels: Level[]
}

const createImgSrcPath = (img:string) => {
    return `/src/assets/journey/${img}.png`
}

const boxCircleChallenges : Challenge[]= [
    {
      id: "box_circle_y",
      title: "Circling box",
      desc: "Circle around the y axis.",
      levels: [
        {
          id: "boxCircleAboveY",
          axis: "y",
          camera: "above",
          imgSrc: createImgSrcPath("boxCircleAboveY"),
          viewerLink: "/viewer/box/circle/above/y",
        },
        {
          id: "boxCircleLevelY",
          axis: "y",
          camera: "level",
          imgSrc: createImgSrcPath("boxCircleLevelY"),
          viewerLink: "/viewer/box/circle/level/y",
        },
        {
          id: "boxCircleBelowY",
          axis: "y",
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
      levels: [
        {
          id: "boxCircleAboveX",
          axis: "x",
          camera: "above",
          imgSrc: createImgSrcPath("boxCircleAboveX"),
          viewerLink: "/viewer/box/circle/above/x",
        },
        {
          id: "boxCircleLevelX",
          axis: "x",
          camera: "level",
          imgSrc: createImgSrcPath("boxCircleLevelX"),
          viewerLink: "/viewer/box/circle/level/x",
        },
        {
          id: "boxCircleBelowX",
          axis: "x",
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
      levels: [
        {
          id: "boxCircleAboveZ",
          axis: "z",
          camera: "above",
          imgSrc: createImgSrcPath("boxCircleAboveZ"),
          viewerLink: "/viewer/box/circle/above/z",
        },
        {
          id: "boxCircleLevelZ",
          axis: "z",
          camera: "level",
          imgSrc: createImgSrcPath("boxCircleLevelZ"),
          viewerLink: "/viewer/box/circle/level/z",
        },
        {
          id: "boxCircleBelowZ",
          axis: "z",
          camera: "below",
          imgSrc: createImgSrcPath("boxCircleBelowZ"),
          viewerLink: "/viewer/box/circle/below/z",
        },
      ],
    },
  ];




const cylinderCircleChallenges : Challenge[]= [
{
    id: "cylinder_circle_y",
    title: "Circling cylinder",
    desc: "Circle around the y axis.",
    levels: [
    {
        id: "cylinder_circle_above_y",
        axis: "y",
        camera: "above",
        imgSrc: createImgSrcPath("cylinderCircleAboveY"),
        viewerLink: "/viewer/cylinder/circle/above/y",
    },
    {
        id: "cylinder_circle_level_y",
        axis: "y",
        camera: "level",
        imgSrc: createImgSrcPath("cylinderCircleLevelY"),
        viewerLink: "/viewer/cylinder/circle/level/y",
    },
    {
        id: "cylinder_circle_below_y",
        axis: "y",
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
    levels: [
    {
        id: "cylinderCircleAboveX",
        axis: "x",
        camera: "above",
        imgSrc: createImgSrcPath("cylinderCircleAboveX"),
        viewerLink: "/viewer/cylinder/circle/above/x",
    },
    {
        id: "cylinderCircleLevelX",
        axis: "x",
        camera: "level",
        imgSrc: createImgSrcPath("cylinderCircleLevelX"),
        viewerLink: "/viewer/cylinder/circle/level/x",
    },
    {
        id: "cylinderCircleBelowX",
        axis: "x",
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
    levels: [
    {
        id: "cylinderCircleAboveZ",
        axis: "z",
        camera: "above",
        imgSrc: createImgSrcPath("cylinderCircleAboveZ"),
        viewerLink: "/viewer/cylinder/circle/above/z",
    },
    {
        id: "cylinderCircleLevelZ",
        axis: "z",
        camera: "level",
        imgSrc: createImgSrcPath("cylinderCircleLevelZ"),
        viewerLink: "/viewer/cylinder/circle/level/z",
    },
    {
        id: "cylinderCircleBelowZ",
        axis: "z",
        camera: "below",
        imgSrc: createImgSrcPath("cylinderCircleBelowZ"),
        viewerLink: "/viewer/cylinder/circle/below/z",
    },
    ],
},
];

const boxRotateChallenges : Challenge[]= [
{
    id: "box_rotation_y",
    title: "Box rotation",
    desc: "Rotation around the y axis.",
    levels: [
    {
        id: "boxRotationAboveY",
        axis: "y",
        camera: "above",
        imgSrc: createImgSrcPath("boxRotateAboveY"),
        viewerLink: "/viewer/box/rotate/above/y",
    },
    {
        id: "boxRotationLevelY",
        axis: "y",
        camera: "level",
        imgSrc: createImgSrcPath("boxRotateLevelY"),
        viewerLink: "/viewer/box/rotate/level/y",
    },
    {
        id: "boxRotationBelowY",
        axis: "y",
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
    levels: [
    {
        id: "boxRotationAboveX",
        camera: "above",
        imgSrc: createImgSrcPath("boxRotateAboveX"),
        viewerLink: "/viewer/box/rotate/above/z",
    },
    {
        id: "boxRotationLevelX",
        camera: "level",
        imgSrc: createImgSrcPath("boxRotateLevelX"),
        viewerLink: "/viewer/box/rotate/level/z",
    },
    {
        id: "boxRotationBelowX",
        camera: "below",
        imgSrc: createImgSrcPath("boxRotateBelowX"),
        viewerLink: "/viewer/box/rotate/below/z",
    },
    ],
},
{
    id: "box_rotation_z",
    title: "Box rotation",
    desc: "Rotation around the z axis.",
    levels: [
    {
        id: "boxRotationAboveZ",
        camera: "above",
        imgSrc: createImgSrcPath("boxRotateAboveZ"),
        viewerLink: "/about",
    },
    {
        id: "boxRotationLevelZ",
        camera: "level",
        imgSrc: createImgSrcPath("boxRotateLevelZ"),
        viewerLink: "/about",
    },
    {
        id: "boxRotationBelowZ",
        camera: "below",
        imgSrc: createImgSrcPath("boxRotateBelowZ"),
        viewerLink: "/about",
    },
    ],
},
];

const cylinderRotateChallenges : Challenge[]= [
{
    id: "cylinder_rotation_y",
    title: "Cylinder rotation",
    desc: "Rotation around the y axis.",
    levels: [
    {
        id: "cylinderRotationAboveY",
        axis: "y",
        camera: "above",
        imgSrc: createImgSrcPath("cylinderRotateAboveY"),
        viewerLink: "/viewer/cylinder/rotate/above/y",
    },
    {
        id: "cylinderRotationLevelY",
        axis: "y",
        camera: "level",
        imgSrc: createImgSrcPath("cylinderRotateLevelY"),
        viewerLink: "/viewer/cylinder/rotate/level/y",
    },
    {
        id: "cylinderRotationBelowY",
        axis: "y",
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
    levels: [
    {
        id: "cylinderRotationAboveX",
        axis: "x",
        camera: "above",
        imgSrc: createImgSrcPath("cylinderRotateAboveX"),
        viewerLink: "/viewer/cylinder/rotate/above/x",
    },
    {
        id: "cylinderRotationLevelX",
        axis: "x",
        camera: "level",
        imgSrc: createImgSrcPath("cylinderRotateLevelX"),
        viewerLink: "/viewer/cylinder/rotate/level/x",
    },
    {
        id: "cylinderRotationBelowX",
        axis: "x",
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
    levels: [
    {
        id: "cylinderRotationAboveZ",
        axis: "z",
        camera: "above",
        imgSrc: createImgSrcPath("cylinderRotateAboveZ"),
        viewerLink: "/viewer/cylinder/rotate/above/z",
    },
    {
        id: "cylinderRotationLevelZ",
        axis: "z",
        camera: "level",
        imgSrc: createImgSrcPath("cylinderRotateLevelZ"),
        viewerLink: "/viewer/cylinder/rotate/level/z",
    },
    {
        id: "cylinderRotationBelowZ",
        axis: "z",
        camera: "below",
        imgSrc: createImgSrcPath("cylinderRotateBelowZ"),
        viewerLink: "/viewer/cylinder/rotate/below/z",
    },
    ],
},
];

export const getBoxCircleChallenges = () => {
    return boxCircleChallenges
}

export const getCylinderCircleChallenges = () => {
    return cylinderCircleChallenges
}

export const getBoxRotateChallenges = () => {
    return boxRotateChallenges
}

export const getCylinderRotateChallenges = () => {
    return cylinderRotateChallenges
}

export const getAllChallengesInOrder = () => {
    return [ ...getBoxRotateChallenges(), ...getCylinderRotateChallenges(), ...getBoxCircleChallenges(), ...getCylinderCircleChallenges()]
}