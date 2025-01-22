import { useState, useEffect } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import { use } from "react";
import Error from "./Error";

const requestConfig = {}

export default function Meals() {

  const{data: loadedMeals, isLoading, error} = useHttp("http://localhost:3000/meals", requestConfig, [])

  console.log(loadedMeals)

  if(isLoading){
    return <p className="center">Fetching meals...</p>
  }

  if(error){
    return <Error title="Failed to fetch" message={error}></Error>
  }

  // if(!data){
  //   return <p>No meals found</p>
  // }
  
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
