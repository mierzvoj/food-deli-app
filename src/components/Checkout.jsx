import { useContext } from "react";
import CartContext from "../store/CartContext";
import { curencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "./UI/Modal";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserProgressContext);
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  function handleClose() {
    userCtx.hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target)
    const customerData = Object.fromEntries(fd.entries());

    fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        })
    })
    handleClose();

  }
  return (
    <Modal open={userCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {curencyFormatter.format(cartTotal)}</p>
        <Input label="Full name" type="text" id="name"></Input>
        <Input label="E-mail address" type="email" id="email"></Input>
        <Input label="Street" type="text" id="street"></Input>
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code"></Input>
          <Input label="City" type="text" id="city"></Input>
        </div>
        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleSubmit}>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
