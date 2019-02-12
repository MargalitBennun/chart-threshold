import { map } from "lodash";
import { STATE_KEYS, STATES } from './state';
import DATA_SOURCES from '../logic/DATA_SOURCES';
import { joinAllValues, getArrAverage, shortDecimal } from "../logic/utils";

const MUTATION_TYPES = {
    SET_DATA: 'setData',
    SET_DATA_SOURCE: 'setDataSource',
    SET_THRESHOLD: 'setThreshold',
    SET_DATA_POINTS: 'setDataPoints',
    SET_ERROR: 'setError',
};

/* eslint-disable no-param-reassign */
const mutations = {
    [MUTATION_TYPES.SET_DATA](state, data) {
        const yAxis = state[STATE_KEYS.DATA_SOURCE].yAxis;
        state[STATE_KEYS.FULL_DATA] = parseData(data, yAxis);
        state[STATE_KEYS.DATA] = state[STATE_KEYS.FULL_DATA].slice(0, state[STATE_KEYS.DATA_POINTS]);
        state[STATE_KEYS.THRESHOLD] = calculateThreshold(state[STATE_KEYS.DATA], yAxis);
        state[STATE_KEYS.DATA_STATE] = STATES.SUCCESS;
    },
    [MUTATION_TYPES.SET_DATA_SOURCE] (state, index) {
        state[STATE_KEYS.DATA_SOURCE] = DATA_SOURCES[index] || state[STATE_KEYS.DATA_SOURCE];
    },
    [MUTATION_TYPES.SET_THRESHOLD] (state, threshold) {
        state[STATE_KEYS.THRESHOLD] = threshold;
    },
    [MUTATION_TYPES.SET_DATA_POINTS] (state, dataPoints) {
        state[STATE_KEYS.DATA_POINTS] = dataPoints;
        state[STATE_KEYS.DATA] = state[STATE_KEYS.FULL_DATA].slice(0, state[STATE_KEYS.DATA_POINTS]);
    },
    [MUTATION_TYPES.SET_ERROR] (state, err) {
        state[STATE_KEYS.DATA_STATE] = STATES.ERROR;
        state[STATE_KEYS.ERROR] = err;
    },
};

export {
    mutations,
    MUTATION_TYPES,
};

function parseData(data, yAxises) {
    const isObjects = !Array.isArray(data);
    let parsedData;
    return map(data, (value, key) => {
        parsedData = value;
        yAxises.forEach(yAxis => {
            parsedData[yAxis] = parseFloat(parsedData[yAxis]);
        });
        if(isObjects) {
            parsedData.xAxis = key;
        }
        return parsedData;
    });
}

function calculateThreshold(data, yAxis) {
    const allYAxis = joinAllValues(data, yAxis);
    const aveYAxis = getArrAverage(allYAxis);
    return shortDecimal(aveYAxis);
}
