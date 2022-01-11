import React from "react";

class CartList extends React.Component {
  handleSaveSelectedItems = (e) => {
    e.preventDefault();
    this.props.saveSelectedItems("Seleted!");
  };

  render() {
    return (
      <div>
        {this.props.isSelectedItems === true ? (
          <p>Items Selected By Anonymous User</p>
        ) : (
          <p>Items Shared In Public</p>
        )}

        <p>Item: {this.props.name}</p>
        <p>Price: {this.props.price}</p>

        {this.props.isSelectedItems === false ? (
          <form onSubmit={this.handleSaveSelectedItems}>
            <button type="submit">Click!</button>
          </form>
        ) : (
          <p></p>
        )}
      </div>
    );
  };
};
  
  export default CartList;