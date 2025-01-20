import { useState, useEffect } from "react";
import MealItem from "./MealItem";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function loadMeals() {
      try {
        const response = await fetch("http://localhost:3000/meals");
        const meals = await response.json();
        setLoadedMeals(meals);
      } catch (error) {}
    }
    loadMeals();
  }, []);
  console.log(loadedMeals);
  return (
    <ul id='meals'>
      {loadedMeals.map((meal) => (
        <li key={meal.id}>
          <MealItem meal={meal} />
        </li>
      ))}
    </ul>
  );
}
