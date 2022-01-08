import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
    ApolloClient,
    InMemoryCache,    
    gql,
} from '@apollo/client';

let result = "";

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
    result = result;
});

ReactDOM.render(
    <App result={result} />, 
    document.getElementById('root')
);