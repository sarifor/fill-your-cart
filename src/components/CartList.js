function CartList(props) {
    return (
      <div>
        <p>Item: {props.name}</p>
        <p>Price: {props.price}</p>
      </div>
    );
  };
  
  export default CartList;