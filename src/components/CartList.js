import React from "react";

class CartList extends React.Component {
  render() {
    return (
      <div>
        {this.props.isSelectedItems === true ? (
          <p>Items Selected By Anonymous User</p>
        ) : (
          <p>Items Shared In Public</p>
        )}

        <p>Id: {this.props.id}</p>
        <div>{this.props.nameAndPrice}</div>

      </div>
    );
  };
};
  
  export default CartList;