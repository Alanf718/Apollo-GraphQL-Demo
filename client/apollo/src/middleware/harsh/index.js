global.harshScore = {
    promotions: 0,
    demotions: 0,
    harshness: 0,
    update: () => {
        if(harshScore.promotions != 0) {
            harshScore.harshness = harshScore.demotions / (harshScore.demotions + harshScore.promotions);
        } else {
            if(harshScore.demotions > 0) {
                harshScore.harshness = 1;
            }
        }
    }
};

export const harshMiddleware = store => next => action => {
    if(action.type === 'PERSON_DEMOTED'){
        harshScore.demotions++;
        harshScore.update();
    }

    if(action.type === 'PERSON_PROMOTED'){
        harshScore.promotions++;
        harshScore.update();
    }

    if(action.type !== 'custom') return next(action)
}
