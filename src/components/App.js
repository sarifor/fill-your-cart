import React from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,    
  gql,
} from '@apollo/client';
import MyComponent from './MyComponent';
import CartList from './CartList';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          value: "test",
          accountId: "",
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
              value: result.data.hello,
              accountId: result.data.getCart.accountId,
              items: result.data.getCart.items,
          });
      });        
  };

  render() {
      const { value, accountId, items } = this.state;

      if(value) {
          return (
              <Router>
                  <Switch>
                      <Route path="/cart_list">
                          <CartList accountId={accountId} items={items} />
                      </Route>                      
                      <Route path="/">
                          <MyComponent value={value} />
                      </Route>
                  </Switch>
              </Router>
          )
      };
  };
};

export default App;