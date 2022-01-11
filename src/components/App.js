import React from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import {
    ApolloClient,
    InMemoryCache,
    gql,
    makeVar,
} from '@apollo/client';
import Test from './Test';
import CartList from './CartList';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            testValue: "test",
            items: [],
        };
    };
    
    componentDidMount() {
        const localCartsVar = makeVar(["cart1", "cart2"]);

        const client = new ApolloClient({
            uri: 'http://localhost:4000',
            cache: new InMemoryCache({
                typePolicies: {
                    Query: {
                        fields: {
                            localCarts: {
                                read() {
                                    return localCartsVar();
                                }
                            }
                        }
                    }
                }

            })    
        });
     
        client.query({
            query: gql`
                query {
                    hello,
                    getCart(accountId: "sailormoon") {
                        id,
                        accountId,
                        user,
                        items {
                            name,
                            price,
                        },
                        exportApproved
                    },
                    localCarts @client
                }
            `
        })
        .then(result => {
            const query = gql `
                query {
                    hello
                }
            `;

            client.writeQuery({
                query, 
                data: {
                    hello: "Bye World!"
                },
            });

            const updatedHello = client.readQuery({
                query: gql`
                    query {
                        hello
                    }
                `
            });

            console.log(result);

            this.setState({
                testValue: updatedHello.hello,
                items: result.data.getCart.items,
            });
        });
    };
    
    render() {
        const { testValue, items } = this.state;

        if(testValue) {
            return (
                <Router>
                    <Switch>
                        <Route path="/cart_list">
                            {items.map(item => <CartList name={item.name} price={item.price} />)}
                        </Route>                      
                        <Route path="/">
                            <Test testValue={testValue} />
                        </Route>
                    </Switch>
                </Router>
            )
        };
    };
};

export default App;