import { SupabaseClient } from "@supabase/supabase-js"
import { supabase } from "../API/supabaseClient"

function ViewOrders(){
    //retreive the orders
    const displayOrder = async () =>{
    const { data: orderData, error: orderError } = await supabase
        .from('order')
        .select('order_no' , 'name')

        if(orderError) throw orderError
    }
    return(
        <div id="ordersTable">

        </div>
    )
}
export default ViewOrders