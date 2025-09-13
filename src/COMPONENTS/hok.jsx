import React, { useEffect, useState } from "react";
import { supabase } from "./API/supabaseClient";

function HeadOfKitchen() {
  const [orders, setOrders] = useState([]);          // list of all orders
  const [selectedOrderNo, setSelectedOrderNo] = useState(null); // selected order number
  const [items, setItems] = useState([]);            // items belonging to the selected order
  const [loading, setLoading] = useState(false);

  // Fetch all orders on mount
  useEffect(() => {
    const fetchOrders = async () => {
      let { data, error } = await supabase
        .from("order")
        .select("order_no");

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data);
      }
    };

    fetchOrders();
  }, []);

  // Fetch items for a given order
  const fetchItemsForOrder = async (orderNo) => {
    setSelectedOrderNo(orderNo);
    setLoading(true);

    let { data, error } = await supabase
      .from("items")
      .select("*")
      .eq("order_no", orderNo);

    if (error) {
      console.error("Error fetching items:", error);
    } else {
      setItems(data);
    }

    setLoading(false);
  };

  return (
    <div id="viewAllOrders">
      <h2>Head of Kitchen - All Orders</h2>

      {/* Table of orders */}
      <table border="1" style={{ width: "100%", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>Order Number</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_no}>
              <td>
                <button onClick={() => fetchItemsForOrder(order.order_no)}>
                  {order.order_no}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Items for the selected order */}
      {selectedOrderNo && (
        <div>
          <h3>Items for Order #{selectedOrderNo}</h3>
          {loading ? (
            <p>Loading items...</p>
          ) : items.length > 0 ? (
            <table border="1" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.item_id}>
                    <td>{item.order_name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No items for this order.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default HeadOfKitchen;
