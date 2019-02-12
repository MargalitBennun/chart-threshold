import DATA_SOURCES from '../assets/dataSources';

const STATES = {
    EMPTY: 'empty',
    SUCCESS: 'success',
    ERROR: 'error',
};

const STATE_KEYS = {
    DATA: 'data',
    FULL_DATA: 'fullData',
    DATA_SOURCE: 'dataSource',
    SOURCE_URL: 'sourceUrl',
    DATA_POINTS: 'dataPoints',
    THRESHOLD: 'threshold',
    DATA_STATE: 'dataState',
    ERROR: 'error',
};

const state = {
    [STATE_KEYS.DATA]: [],
    [STATE_KEYS.FULL_DATA]: [],
    [STATE_KEYS.DATA_SOURCE]: DATA_SOURCES[0],
    [STATE_KEYS.DATA_POINTS]: 10,
    [STATE_KEYS.THRESHOLD]: 0,
    [STATE_KEYS.DATA_STATE]: STATES.EMPTY,
    [STATE_KEYS.ERROR]: '',
};

export {state, STATE_KEYS, STATES};
