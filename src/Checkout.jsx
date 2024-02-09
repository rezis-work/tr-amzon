import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import Subtotal from "./Subtotal";
function Checkout() {
  const [{ basket, user }] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__add"
          src="https://m.media-amazon.com/images/I/71nwqPZaNRL._SX3000_.jpg"
          alt="add"
        />

        <div>
          <h3 className="checkout__user">{user && `Hello ${user?.email}`}</h3>
          <h2 className="checkout__title">Your shipping basket</h2>

          {basket?.map((item) => (
            <CheckoutProduct
              key={item.id + Math.random()}
              title={item.title}
              price={item.price}
              rating={item.rating}
              image={item.image}
              id={item.id}
            />
          ))}
        </div>
      </div>
      <div className="checkout__right">
        <div className="checkout__subtotal">
          <Subtotal />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
