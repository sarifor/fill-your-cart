import React from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,    
  gql,
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
      const client = new ApolloClient({
          uri: 'http://localhost:4000',
          cache: new InMemoryCache()    
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
                }
              }
          `
      })
      .then(result => {
          this.setState({
              testValue: result.data.hello,
              items: result.data.getCart.items,
          });
      });        
      
      client.writeQuery({
        query: gql`
            query {
                hello,
            }
        `, 
        data: {
            __typename: 'String!',
            hello: "Bye World!",
        },
        variables: {
            hello: "Hello World!"
        }
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