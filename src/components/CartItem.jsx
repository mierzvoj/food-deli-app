import { useContext } from "react";
import { curencyFormatter } from "../util/formatting";
import CartContext from "../store/CartContext";

export default function CartItem({
  name,
  quantity,
  price,
  onIncrease,
  onDecrease,
}) {
  useContext(CartContext);
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {curencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
