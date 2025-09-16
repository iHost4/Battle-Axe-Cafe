// App.js or Checkout.js
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { supabase } from "../API/supabaseClient";
import { useState, useEffect } from "react";
import '../CSS/paypalButton.css'

const PayPalCheckout = ({orderNo}) => {
    const [orders, setOrders] = useState([]);
        const [total, setTotal] =useState(null);

    //FETCH ITEM TOTAL FOR PAYPAL
        useEffect(() =>{
            async function fetchOrderTotal(){
                const { data, error } = await supabase
                    .from("items")
                    .select("price, quantity")
                    .eq("order_no", orderNo)

                    if(error){
                        console.log("Error fetching your total:", error.message)
                        return
                    }
                    const orderTotal = data.reduce(
                        (sum, item) => sum + item.price * item.quantity, 0
                    );
                    setTotal(orderTotal)
            }
            if(orderNo){
                fetchOrderTotal();
            }

        }, [orderNo])

    if(total === null) return<p>...ERROR</p>
    return (
        <div id="paypalButton">
            <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID , "disable-funding" : "paylater,card"}}>
                <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                        amount: {
                            value: total.toFixed(2)
                        },
                        }],
                    });
                    }}
                    onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        alert(`Transaction completed by ${details.payer.name.given_name}`);
                        // Add post-payment logic here
                    });
                    }}
                />
            </PayPalScriptProvider>
        </div>
    );
};

export default PayPalCheckout;
