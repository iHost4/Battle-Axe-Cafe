import { supabase } from "../API/supabaseClient";
import { useState } from "react";
import '../CSS/ordersubmitted.css'

function OrderSubmitted({orderNo, onClose}){
    if(!orderNo) return null
    return(
        <div id="submittedPopUp">
            <h2>ORDER SUBMITTED SUCCESSFULLY</h2>
            <p>Your order # {orderNo}</p>
            <button className="closeButton" onClick={onClose}>C L O S E</button>
        </div>
    );
};
export default OrderSubmitted;