import { Link, useNavigate } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { getbasketTotal } from "./reducer";
import Axios from "./Axios";
import { db } from "./firebase";
import { doc, setDoc, collection } from "firebase/firestore";
function Payment() {
  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await Axios({
        method: "post",
        url: `/payments/create?total=${getbasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  console.log("The Secter Is >>>>", clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // Use the new modular syntax for Firestore
      const orderDocRef = doc(
        collection(db, "users", user?.uid, "orders"),
        paymentIntent.id
      );

      await setDoc(orderDocRef, {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      setSucceeded(true);
      setError(null);
      setProcessing(false);

      dispatch({
        type: "EMPTY_BASKET",
      });

      navigate("/orders");
    } catch (error) {
      console.error("Unexpected error during payment confirmation:", error);
      setSucceeded(false);
      setError("Unexpected error occurred during payment confirmation");
      setProcessing(false);
    }
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout ({<Link to={"/checkout"}>{basket?.length} items</Link>})
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Adress</h3>
          </div>
          <div className="payment__adress">
            <p>{user?.email}</p>
            <p>Evgeni Mikeladze str.</p>
            <p>Tbilisi Georgia</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id + Math.random() + Math.random()}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
                id={item.id}
              />
            ))}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getbasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
