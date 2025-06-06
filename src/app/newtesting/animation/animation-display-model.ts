
enum AnimationDetail{
    "CAMERA_MOVES",
    "CAMERA_FOV_CHANGES",
    "OBJECT_MOVES",
    "OBJECT_ROTATES",
    "LOOK_AT_TARGET_MOVES"
}

type AnimationCreatorModel = {
    userId: string
    displayName: string
}

type AnimationDisplayModel ={
    id : string
    title: string,
    description: string,
    creator : AnimationCreatorModel
    createdAt: Date
    upvotes:number,
    uses:number,
    detail: AnimationDetail[],
    recommendedSteps:number,
}

export {
    AnimationDetail
}

export type {
    AnimationCreatorModel,
    AnimationDisplayModel
}

