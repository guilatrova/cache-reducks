const createApi = () => {}; // Axios/Ajax/etc.
const handleError = () => {}; // Your default error handler func

export class Operation {
    constructor(requestAction, receiveAction) {
        this.requestAction = requestAction;
        this.receiveAction = receiveAction;
    }

    dispatch = () => (dispatch) => {
        this.onRequest(dispatch, this.requestAction);
        
        const api = this.createApiService();
        return this.getApiPromise(api)
            .then(response => this.onGetResponse(response))
            .then(data => this.onSucceed(dispatch, this.receiveAction, this.getSucceedData(data)))
            .catch(err => this.onFailed(dispatch, this.receiveAction, err));
    }

    getId() {
        let seedId = "";
        let hash = "";
        for (let key in this) {
            if (this.hasOwnProperty(key) && typeof this[key] !== 'function') {
                seedId += this[key];
            }
        }

        for (let i = 0; i < seedId.length; i++) {
            let chr   = seedId.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    createApiService() {
        return createApi();
    }

    onGetResponse(response) {
        return response.data;
    }
    
    onRequest(dispatch, requestAction) {
        dispatch(requestAction());
    }

    onSucceed(dispatch, receiveAction, data) {
        return dispatch(receiveAction('success', data));        
    }

    onFailed(dispatch, receiveAction, errors) {
        return dispatch(receiveAction('fail', handleError(errors)));
    }

    getSucceedData(raw) {
        return raw;
    }
    
    getApiPromise(api) { }
}