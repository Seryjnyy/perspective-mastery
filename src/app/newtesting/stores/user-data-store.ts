type SyncFields = {
  updateAt: number;
  needsSync: boolean;
};

type FavouriteAnimationPreset = {
  id: string;
} & SyncFields;

export interface UserProgress {
  favouriteAnimationPresets: FavouriteAnimationPreset[];
}
