export const Types = {
    MINIMIZE: `MINIMIZE`,
    EXPAND: `EXPAND`
};

const minimize = () => ({type: Types.MINIMIZE, payload: {}});
const expand = () => ({type: Types.EXPAND, payload: {}});

export const Actions = {
    minimize,
    expand
};

