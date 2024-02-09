import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

function CheckoutProduct({ image, price, title, rating, id, hideButton }) {
  const [{ basket }, dispatch] = useStateValue();
  const removeFromBasket = () => {
    dispatch({ type: "REMOVE_FROM_BASKET", id: id });
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} alt={title} />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array.from({ length: rating }, (_, i) => (
            <p key={i}>⭐</p>
          ))}
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket} className="checkoutProduct__btn">
            remove from basket
          </button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
