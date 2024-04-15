const completed_challenges_store_name = "completed_challenges";
const completed_levels_store_name = "completed_levels";
export const createChallengeID = (
  shape: string,
  animationType: string,
  axis: string
) => {
  return `${shape}-${animationType}-${axis}`;
};

export const createLevelID = (
  shape: string,
  animationType: string,
  camPos: string,
  axis: string
) => {
  return `${shape}-${animationType}-${camPos}-${axis}`;
};

const getCompletedChallenges = () => {
  const completedChallenges = localStorage.getItem(
    completed_challenges_store_name
  );

  if (completedChallenges == null) {
    return [];
  }

  return JSON.parse(completedChallenges) as string[];
};

const addCompletedChallenge = (id: string) => {
  const completed_challenges = getCompletedChallenges();

  if (completed_challenges.includes(id)) return;

  completed_challenges.push(id);

  localStorage.setItem(
    completed_challenges_store_name,
    JSON.stringify(completed_challenges)
  );
};

const removeCompletedChallenge = (id: string) => {
  const completedChallenges = getCompletedChallenges();

  if (!completedChallenges.includes(id)) return;

  localStorage.setItem(
    completed_challenges_store_name,
    JSON.stringify(completedChallenges.filter((item) => item != id))
  );
};

export type ChallengeLevels = {
  challengeID: string;
  levelCompletion: string[];
};

const getCompletedLevels = () => {
  const completedLevels = localStorage.getItem(completed_levels_store_name);

  if (completedLevels == null) return [];

  return JSON.parse(completedLevels) as ChallengeLevels[];
};

const getCompletedLevelsInChallenge = (challengeID: string) => {
  const completedLevels = getCompletedLevels();

  const result = completedLevels.find(
    (completion) => completion.challengeID == challengeID
  );

  return result?.levelCompletion ?? [];
};

const addCompleteChallengeLevel = (challengeID: string, levelID: string) => {
  const completedLevels = getCompletedLevels();

  let challenge = completedLevels.find(
    (completion) => completion.challengeID == challengeID
  );

  if (challenge == undefined) {
    challenge = { challengeID: challengeID, levelCompletion: [] };
  }

  if (challenge.levelCompletion.includes(levelID)) return;

  challenge.levelCompletion.push(levelID);

  const newCompletedLevels = completedLevels.filter(
    (completion) => completion.challengeID != challengeID
  );

  newCompletedLevels.push(challenge);

  localStorage.setItem(
    completed_levels_store_name,
    JSON.stringify(newCompletedLevels)
  );
};

const removeChallengeLevel = (challengeID: string, levelID: string) => {
  const completedLevels = getCompletedLevels();

  let challenge = completedLevels.find(
    (completion) => completion.challengeID == challengeID
  );

  if (challenge == undefined) return;

  if (!challenge.levelCompletion.includes(levelID)) return;

  challenge.levelCompletion = challenge.levelCompletion.filter(
    (id) => id != levelID
  );

  const newCompletedLevels = completedLevels.filter(
    (completion) => completion.challengeID != challengeID
  );

  newCompletedLevels.push(challenge);

  localStorage.setItem(
    completed_levels_store_name,
    JSON.stringify(newCompletedLevels)
  );
};

export {
  getCompletedChallenges,
  addCompletedChallenge,
  removeCompletedChallenge,
  getCompletedLevelsInChallenge,
  addCompleteChallengeLevel,
  removeChallengeLevel,
};
