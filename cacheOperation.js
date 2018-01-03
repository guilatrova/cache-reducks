import { operations, selectors } from '../core-duck/duck';

const cacheResponse = operations.cacheResponse; //Avoid mess up with operation object
const cacheTimeoutMultiplier = 1000 * 60; //Convert to minutes

const cacheOperation = (operation, timeout) => (dispatch, getState) => {
    timeout = timeout * cacheTimeoutMultiplier;
    const cache = selectors.getCacheFromId(getState(), operation.getId());
    const isStale = cache ? (Date.now() - cache.time) > timeout : true;

    if (isStale) {
        // Do API request as usual, but when succeed, cache result
        operation.onGetResponse = (response) => {
            dispatch(cacheResponse(operation.getId(), Date.now(), response.data));
            return response.data;
        };
    }    
    else {
        // Don't do any request, use cached result
        operation.getApiPromise = () => {
            return Promise.resolve(cache.result);
        };
        operation.onGetResponse = (data) => {
            return data;
        };
    }

    return operation.dispatch()(dispatch, getState);
};

export default cacheOperation;