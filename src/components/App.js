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
import Each from './Each';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            testValue: "test",
            items: [],
            selectedItems: [],
        };
    };
    
    saveSelectedItems = (selectedItems) => {
        this.setState({
            selectedItems: this.state.selectedItems.concat(selectedItems)
        });
        console.log(selectedItems);
    };

    componentDidMount() {
        const localCartsVar = makeVar([
            {
                id: 3,
                accountId: "Saint Tail",
                user: "ccc",
                items: [
                    {
                        name: "Bread",
                        price: 600,
                    },
                    {
                        name: "Salad",
                        price: 100,
                    },            
                ],
                exportApproved: true,
            },
            {
                id: 4,
                accountId: "Card Capture Sakura",
                user: "ddd",
                items: [
                    {
                        name: "Cake",
                        price: 500,
                    },
                    {
                        name: "Juice",
                        price: 200,
                    },            
                ],
                exportApproved: false,
            },             
        ]);

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

            // Merge carts
            const serverCart = [result.data.getCart];
            const allItemsArr = serverCart.concat(result.data.localCarts);

            this.setState({
                testValue: updatedHello.hello,
                items: allItemsArr,
            });
        });
    };
    
    render() {
        const { testValue, items, selectedItems } = this.state;

        if(testValue) {
            return (
                <Router>
                    <Switch>
                        <Route path="/cart_list">
                            {items.map(item => <CartList id={item.id} nameAndPrice={item.items.map(each => <Each name={each.name} price={each.price} saveSelectedItems={this.saveSelectedItems} />)} isSelectedItems={false} />)}
                            {selectedItems.map(selectedItem => <CartList id={selectedItem.id} nameAndPrice={selectedItem.items.map(each => <Each name={each.name} price={each.price} />)} isSelectedItems={true} />)}
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