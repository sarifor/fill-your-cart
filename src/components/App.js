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
                  exportApproved
                }
              }
          `
      })
      .then(result => {
          this.setState({
              value: result.data.hello,
              accountId: result.data.getCart.accountId,
          });
      });        
  };

  render() {
      const { value, accountId } = this.state;

      if(value) {
          return (
              <Router>
                  <Switch>
                      <Route path="/cart_list">
                          <CartList accountId={accountId} />
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