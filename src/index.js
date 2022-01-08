import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
    ApolloClient,
    InMemoryCache,    
    gql,
} from '@apollo/client';

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "test"
        };
    };

    componentDidMount() {
        const client = new ApolloClient({
            uri: 'http://localhost:4000',
            cache: new InMemoryCache()    
        });
        
        client.query({
            query: gql`
                query {
                    hello
                }
            `
        })
        .then(result => {
            this.setState({
                value: result.data.hello,
            });
        });        
    };

    render() {
        const { value } = this.state;

        if(value) {
            return (
                <App value={value} />
            )
        };
    };
}

ReactDOM.render(
    <MyComponent />, 
    document.getElementById('root')
);