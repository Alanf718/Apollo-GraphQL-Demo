export const Types = {
    PROMOTED: `PERSON_PROMOTED`,
    DEMOTED: `PERSON_DEMOTED`
};

const promoted = () => ({type: Types.PROMOTED, payload: {}});
const demoted = () => ({type: Types.DEMOTED, payload: {}});

export const Actions = {
    promoted,
    demoted
};

