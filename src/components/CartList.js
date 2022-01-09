function CartList(props) {
    return (
      <div>
        <h3>CartList!</h3>
        <p>{props.accountId}</p>
        <p>{props.items}</p>
      </div>
    );
  };
  
  export default CartList;