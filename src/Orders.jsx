import { useEffect, useState } from "react";
import "./Orders.css";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
import { collection, onSnapshot } from "firebase/firestore";
import Order from "./Order";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const ordersCollectionRef = collection(db, "users", user?.uid, "orders");

      const unsubscribe = onSnapshot(ordersCollectionRef, (snapshot) => {
        // Fetch documents and sort locally by 'created' field
        const sortedOrders = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
          .sort((a, b) => b.data.created - a.data.created); // Adjust the field name if needed

        setOrders(sortedOrders);
      });

      return () => unsubscribe();
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your orders</h1>

      <div className="orders__oreder">
        {orders?.map((order) => (
          <Order key={order.id + Math.random() + Math.random()} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
