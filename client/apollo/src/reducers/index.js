import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import * as homeReducers from '../containers/home/reducers';

// Apollo Client Config
import ApolloClient, {createBatchingNetworkInterface, addTypename} from 'apollo-client';

const batchingNetworkInterface = createBatchingNetworkInterface({
    uri: '/graphql',
    batchInterval: 40, // time in milliseconds to allow graphql calls to get batched
    dataIdFromObject: record => `${record.__typename}-${record.id}`,
    opts: {
        // Options to pass along to `fetch`
    }
});

export const client = new ApolloClient({
    networkInterface: batchingNetworkInterface,
    queryTransformer: addTypename,
    shouldBatch: true
});

// Collect, combine and expose all reducers here
export default combineReducers(
    {
        routing: routerReducer,
        apollo: client.reducer(),
        ...homeReducers
    }
);
