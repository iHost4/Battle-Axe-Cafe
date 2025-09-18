// App.js or Checkout.js
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { supabase } from "../API/supabaseClient";
import { useState, useEffect } from "react";
import '../CSS/paypalButton.css'

const PayPalCheckout = ({orderNo}) => {
    const [total, setTotal] =useState(null);

    //UPDATE TO PAYPAL SECTION IN SUPABASE
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
        //UPDATE DB TO REFLECT PAYPAL PAYMENT SUCCESSFUL
        const handlePayPalSuccess = async () => {
            try{
                const { error: orderError } = await supabase
                .from('"order"')
                .update({ paid_with_paypal: true })
                .eq("order_no",orderNo)
                
                if(orderError){
                    console.log("Could not update DB to reflect PayPal payment successfully: ", orderError.message)
                }
                
                const {error:itemError} = await supabase
                .from("items")
                .update({ paid_with_paypal: true })
                .eq("order_no",orderNo)

                if(itemError){
                    console.log("Could not update DB to reflect PayPal payment successfully:" , itemError.message)
                }
                //const update = data
            }catch(err){
                console.log("Error updating the database:", err)
            }
        }


    if(total === null) return<p>...Loading PayPal Button</p>
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
                    onApprove={async(data, actions) => {
                        const details =await actions.order.capture()
                        //await handlePayPalSuccess()//CALLING FUNCTION TO UPDATE PAYPAL PAYMENT
                        alert(`Transaction completed by ${details.payer.name.given_name}`);
                        
                        setTimeout(() => handlePayPalSuccess(),0)//CLOSE POPUP...MAYBE
                        return Promise.resolve();
                    }}
                    /*
                        onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                            alert(`Transaction completed by ${details.payer.name.given_name}`);
                            // Add post-payment logic here
                        });
                    */
                />
            </PayPalScriptProvider>
        </div>
    );
};

export default PayPalCheckout;
