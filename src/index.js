import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
    ApolloClient,
    InMemoryCache,    
    gql,
} from '@apollo/client';

let resultTopass = "test";

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()    
})

client.query({
    query: gql`
        query {
            hello
        }
    `
})
.then(result => {
    resultTopass = result;
});

ReactDOM.render(
    <App result={resultTopass} />, 
    document.getElementById('root')
);