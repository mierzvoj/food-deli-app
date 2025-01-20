import { useContext } from 'react';
import logoImg from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

export default function Header({ items }) {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserProgressContext)
  const totalCartItems = cartCtx.items.reduce((totaNumberOfItems, item) => {
    return totaNumberOfItems + item.quantity
  }, 0);

function handleShowCart(){
  userCtx.showCart
}

  return (
    <>
      <header id="main-header">
        <div id='title'>
          <img src={logoImg} alt='Broken foody logo'/>
          <h1>ReactFoody</h1>
        </div>
        <nav>
            <Button textOnly={true} onClick={handleShowCart}>Cart ({totalCartItems})</Button>
        </nav>
      </header>
    </>
  );
}
