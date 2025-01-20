import Modal from "../components/UI/Modal";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import { curencyFormatter } from "../util/formatting";
import Button from "./UI/Button"
import UserProgressContext from "../store/UserProgressContext";

export default function Cart() {
     const cartCtx = useContext(CartContext)
     const userCtx = useContext(UserProgressContext);
     const cartTotal = cartCtx.items.reduce((totalPrice, item)=>{

        totalPrice + item.price * item.quantity
     }, 0)
  return (
    <Modal className="cart" open={userCtx.progress === 'cart'}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map(item => <li key={item.id}>{item.name} - {item.quantity}</li>)}
      </ul>
      <p className="cart-total">{curencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions"></p>
      <Button textOnly>Close</Button>
      <Button>Go to checkout</Button>
    </Modal>
  );
}
