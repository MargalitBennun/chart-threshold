import { STATE_KEYS } from './state';

const GETTER_TYPES = {
    GET_DATA: 'getData',
    GET_FULL_DATA: 'getFullData',
    GET_DATA_SOURCE: 'getDataSource',
    GET_DATA_POINTS: 'getDataPoints',
    GET_THRESHOLD: 'getThreshold',
    GET_DATA_STATE: 'getDaraState',
    GET_ERROR: 'getError',
};

const getters = {
    [GETTER_TYPES.GET_DATA](state) {
        return state[STATE_KEYS.DATA];
    },
    [GETTER_TYPES.GET_FULL_DATA](state) {
        return state[STATE_KEYS.FULL_DATA];
    },
    [GETTER_TYPES.GET_DATA_SOURCE](state) {
        return state[STATE_KEYS.DATA_SOURCE];
    },
    [GETTER_TYPES.GET_DATA_POINTS](state) {
        return state[STATE_KEYS.DATA_POINTS];
    },
    [GETTER_TYPES.GET_THRESHOLD](state) {
        return state[STATE_KEYS.THRESHOLD];
    },
    [GETTER_TYPES.GET_DATA_STATE](state) {
        return state[STATE_KEYS.DATA_STATE];
    },
    [GETTER_TYPES.GET_ERROR](state) {
        return state[STATE_KEYS.ERROR];
    },
};

export {
    getters,
    GETTER_TYPES,
};
