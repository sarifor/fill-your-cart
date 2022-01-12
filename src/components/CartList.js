import React from "react";

class CartList extends React.Component {
  render() {
    return (
      <div>
          <p>[Items Shared In Public]</p>
          <p>Id: {this.props.id}</p>
          <div>{this.props.nameAndPrice}</div>
      </div>
    );
  };
};
  
  export default CartList;