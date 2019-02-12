import {get} from 'lodash';
import {MUTATION_TYPES} from './mutations';
import {STATE_KEYS} from './state';

const ACTION_TYPES = {
    FETCH_DATA: 'fetchData',
};

const actions = {
    [ACTION_TYPES.FETCH_DATA]: async ({commit, state}) => {
        return new Promise((resolve, reject) => {
            const source = state[STATE_KEYS.DATA_SOURCE];
            fetch(source.url).then(response =>
                response.json().then(data => {
                        let dataObj = get(data, state[STATE_KEYS.DATA_SOURCE].dataKey, data);
                        commit(MUTATION_TYPES.SET_DATA, dataObj);
                        resolve(data);
                    }
                )).catch(function (err) {
                commit(MUTATION_TYPES.SET_ERROR, `Error occur when fetching data: ${err}`);
                reject(err);
            });
        });
    },
};

export {
    actions,
    ACTION_TYPES,
};
