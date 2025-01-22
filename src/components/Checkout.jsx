import { useContext, useActionState } from "react";
import CartContext from "../store/CartContext";
import { curencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "./UI/Modal";
import useHttp from "../hooks/useHttp";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserProgressContext);

  const {
    data,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userCtx.hideCheckout();
  }

  function handleFinish() {
    userCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  async function checkoutAction(prevState, fd) {

    const customerData = Object.fromEntries(fd.entries()); // { email: test@example.com }

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  const[formState, formAction, isSending] = useActionState(checkoutAction, null);

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={userCtx.progress === "checkout"} onClose={handleClose}>
        <h2>Successs</h2>
        <p>Your order was submitted successfully</p>
        <p>We will get back to you shortly</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Ok</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userCtx.progress === "checkout"} onClose={handleClose}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {curencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
