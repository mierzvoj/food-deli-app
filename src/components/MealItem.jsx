import { useContext } from "react";
import { curencyFormatter } from "../util/formatting.jsx";
import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext.jsx";

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);
  function handleAddMealToCart() {
    const log = cartCtx.addItem(meal);
  }
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <h3>{meal.name}</h3>
        <p className="meal-item-price">{curencyFormatter.format(meal.price)}</p>
        <p className="meal-item-description">{meal.description}</p>
      </article>
      <p className="meal-item-actions">
        <Button onClick={handleAddMealToCart}>Add to cart</Button>
      </p>
    </li>
  );
}
