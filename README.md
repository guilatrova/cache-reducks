# Extending re-ducks proposal

Before starting you may want to check both [ducks](https://github.com/erikras/ducks-modular-redux) and [re-ducks](https://github.com/alexnm/re-ducks) proposals.
Although both proposals suits me very well and improved a lot my workplace, I was still missing some more definitions about how to handle operations properly. Also, while handling such operations (which were basically API calls most of time) I noticed that my apps was repeating the same API request in a short time.

I noticed I always follows same patterns:

- Perform a request to notify my app that some background task is running (fetch).
- When request finishes notify my app result (success).
- If my request fails get error message and notify app about this issue (fail).

So, I would like to extend both original ideas (which are great) to support Operation and Cached Responses.

# Original ideas

## Duck rules

A module...

1. MUST export default a function called reducer()
2. MUST export its action creators as functions
3. MUST have action types in the form npm-module-or-app/reducer/ACTION_TYPE
4. MAY export its action types as UPPER_SNAKE_CASE, if an external reducer needs to listen for them, or if it is a published reusable library

## Re-ducks rules

A duck folder...

1. MUST contain the entire logic for handling only ONE concept in your app, ex: product, cart, session, etc.
2. MUST have an index.js file that exports according to the original duck rules.
3. MUST keep code with similar purpose in the same file, ex: reducers, selectors, actions, etc.
4. MUST contain the tests related to the duck.

# Cache Re-ducks implementation

## Types

Will follow same re-ducks recipe, but now will have a new rule for it:

- You can have only **one type** for each request + callback.

In other words: Requests that can be successful or failed should have **same single constant type**.

So, you will **avoid** to have types like:

``` 
const FETCH_DATA   = "app/data/FETCH_DATA";
const RECEIVE_DATA = "app/data/RECEIVE_DATA";
const FAILED_DATA  = "app/data/FAILED_DATA";
```

To have just:

```
const FETCH_DATA = "app/data/FETCH_DATA";
```

## Actions

- You got a couple of actions for each request, one for request itself and other for callback.
- Callback actions should always receive **result** (whether success or fail), **data** (that can be an error or succeed info) and as many additional parameters you want.

```
import types from './types';

const fetchData = () => {
    return {
        type: types.FETCH_DATA        
    }
};

const receiveFetchData = (result, data) => {
    if (result === "success") {
        return {
            type: types.FETCH_DATA,
            result,
            data
        }
    }

    return {
        type: types.FETCH_DATA,
        result,
        errors: data
    }
};

export default {
    fetchData,
    receiveFetchData
};
```

## Operations

Now you get a basic operation class (that should be extended) with some methods that may be overridden.

| Method | Description |
|---|---|
| *constructor* | Expects at least two actions for request and callback respectively |
| dispatch | Invokes operation itself. Probably you don't want to change it. |
| getId | Defines that a request is unique. By default, it generates a hash based on all property values. |
| createApiService | Generates whatever you use to perform requests. |
| onRequest | Called before doing first request. By default dispatches request action. |
| onGetResponse | First request callback. By default returns `response.data`. |
| getSucceedData | Receive data from `onGetResponse` and prepare data to `onSucceed`. By default just pass same arg received from `onGetResponse`. |
| onSucceed | Called when request is succeed. By default dispatches callback action with `"success"` and `"data"` as parameters. |
| onFailed | Called when request fails. By default dispatches callback action with `"fail"` and `"errors"` as parameters. Uses an empty generic error handler to be customized if you want to |
| getApiPromise | Handles api call and returns a promisse. No defaults, **must be implemented**. |

### Basic usage example

```
import actions from './actions';

class FetchProductOperation extends Operation {
    constructor(id) {
        super(actions.fetchProductDetails, actions.receiveProductDetails);
        this.id = id;
    }

    getApiPromise(api) {
        const url = "products/" + this.id;
        return api.get(url);
    }
}

const fetchProduct = (id) => new FetchProductOperation(id).dispatch();

export default {
    fetchProduct
};

```

### Why a class?

Just because is simple to be overridden and easily understood. You don't need to change every method, just those that are specific for some case you're handling.

## Cache MUSTS

A cache MUST...

 1. Avoid repeating same requests in a too small lenght of time.
 2. Have it's timeout lenght set individually for each operation, be customizable, and easily enabled/disabled.
 3. Be invisible to operation and user. So it doesn't mess up with our logic and can be added or removed as you will.
 4. When get stale cache a new result alongside request time.

So you start with following function:

```
import { operations, selectors } from '../core/duck';

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
```

To be applied to any already existing operation, like:

```
import actions from './actions';
import cache from '../cacheOperation';

class FetchProductOperation extends Operation {
    constructor(id) {
        super(actions.fetchProductDetails, actions.receiveProductDetails);
        this.id = id;
    }

    getApiPromise(api) {
        const url = "products/" + this.id;
        return api.get(url);
    }
}

const fetchProduct = (id, timeout = 5) => cache(new FetchProductOperation(id), timeout);

export default {
    fetchProduct
};

```

In this example we've set any repeated request to **same product id** inside 5 minutes to be cached meeting item 1.

We can easily pass a 0 for fetchProduct, disabling cache if we will or even passing a minor timeout. We can change `cacheTimeoutMultiplier` if we want to work with seconds or other thing. We can even create another `fetchProduct` with no cache config at all meeting our item 2.

It works exactly as any other operation, nor user nor your app needs to know that result was cached. In the end it's just a resolved promisse with succeed result. Meeting item 3 :) .

There's no need to explicitly cache it in our operation, our cache func handles it easily. You just need to setup a basic core duck to handle this kind of stuff. Item 4 met!

### Why caching?

This may change from app to app, only you can say if it's really needed. Let's imagine that your app lists some patients, if you perform a `GET` request to `/patients` at **15:00:00**, and at **15:05:30** you perform it again just because your user come back to this screen from another one. **What's the chances to something have changed in just 05:30 minutes?** Of course, your bussiness rules and environment will decide this.

For such reason, I propose something highly customizable and easy to turn on or off. Maybe you can't even think about caching patients (imagining same app), but there's still a medications stock that're only update once a few hours. Maybe you can cache it for 15 minutes? Who knows? It' up to you. Your user doesn't need to be stuck to your predefined timeout, you can always set a refresh button to trigger same operation passing a 0 timeout param.

# Example app

You can check example folder with an app built using material-ui + cache re-ducks structure. 

App basically retrieves a temperature from a location using [OpenWeather](https://openweathermap.org/) api, caching requests to same location in a lenght of 2 minutes. Cache can be disabled and timeout changed by user, also it was customized to extend some functions and meet some needs for this project.

## Conclusion

Of course this project still need to grow, also I could improve by adding tests and more. Sadly I'm kind out of time lately, so I tried hard to create at least a good example showing how to implement such proposal. Always open to suggestions, feel free to contribute :) . 

I thank God for the opportunity to showcase my proposal. Hope someone find it useful.