import Header from "./components/Header";
import Meals from "./components/Meals";
import CartContextProvider  from "./store/CartContext";
import UserProgressContextProvider from "./store/UserProgressContext";
import Cart from "./components/Cart";
import CartContext from "./store/CartContext";
import UserProgressContext from "./store/UserProgressContext";

function App() {
  return (
    <>
      <UserProgressContextProvider>
        <CartContextProvider>
          <Header />
          <Meals />
          <Cart />
        </CartContextProvider>
      </UserProgressContextProvider>
    </>
  );
}

export default App;
