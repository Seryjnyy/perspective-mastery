const store_name = "completed_challenges";

const makeChallengeID = (
    shape: string,
    camPos: string,
    rotation_axis: string
) => {
    return shape + camPos + rotation_axis;
};

const getCompletedChallenges = () => {
    const completedChallenges = localStorage.getItem(store_name);

    if (completedChallenges == null) {
        return [];
    }

    return JSON.parse(completedChallenges) as string[];
};

const addCompletedChallenge = (
    shape: string,
    camPos: string,
    rotation_axis: string
) => {
    const id = shape + camPos + rotation_axis;

    const completed_challenges = getCompletedChallenges();

    completed_challenges.push(id);

    localStorage.setItem(store_name, JSON.stringify(completed_challenges));
};

const removeCompletedChallenge = (
    shape: string,
    camPos: string,
    rotation_axis: string
) => {
    const completedChallenges = getCompletedChallenges();

    const id = shape + camPos + rotation_axis;

    localStorage.setItem(
        store_name,
        JSON.stringify(completedChallenges.filter((item) => item != id))
    );
};

export {
    getCompletedChallenges,
    addCompletedChallenge,
    removeCompletedChallenge,
    makeChallengeID,
};
