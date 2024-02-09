import CheckoutProduct from "./CheckoutProduct";
import "./Order.css";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import { getbasketTotal } from "./reducer";
function Order({ order }) {
  return (
    <div className="order">
      <h2 className="order__main">Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order__id">
        <small>{order?.id}</small>
      </p>
      {order.data.basket?.map((item) => (
        <CheckoutProduct
          key={item.id + Math.random()}
          title={item.title}
          price={item.price}
          rating={item.rating}
          image={item.image}
          id={item.id}
          hideButton
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <>
            <h3>Order Total: {value}</h3>
          </>
        )}
        decimalScale={2}
        value={getbasketTotal(order.data.basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
}

export default Order;
