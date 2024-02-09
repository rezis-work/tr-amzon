import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({ title, image, price, rating, id }) {
  const [state, dispatch] = useStateValue();
  function addToBasket() {
    // dispach the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      payload: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  }

  return (
    <div key={id} className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array.from({ length: rating }, (_, i) => (
            <p key={i}>⭐</p>
          ))}
        </div>
        <img className="product__image" src={image} alt="Lean start up image" />

        <button className="product__btn" onClick={addToBasket}>
          Add to basket
        </button>
      </div>
    </div>
  );
}

export default Product;
