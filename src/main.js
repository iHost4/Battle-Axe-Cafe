import './CSS/main.css'
import Items from './COMPONENTS/items';
import { useState } from 'react';
import { supabase } from './API/supabaseClient';
import OrderSubmitted from './COMPONENTS/ordersubmitted';
import { useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
//IMPORTANT: YOU MUST CALCULATE THE ORDER TOTAL ON THE POP-UP FOR THOSE PAYING IN CASH
//THE ORDERS DATABASE MUST SHOW THE TOTAL...IT WILL CALCULATE THE ITEM PRICE * QUANTITY
function Main(){
    /*const [showRank, setShowRank] = useState(false);
    const rank =["Officer20","Officer10","Soldier","Sister"]
    */
   
    //THE FOLLOWING useState INPUTS THE USER INFORMATION INSIDE SUPABASE//
    const [rank, setRank] = useState('Officer 80')//
    const [name, setName] = useState('')
    const [orders, setOrders] = useState([]) //gets all the orders

    const [showPopup, setShowPopup] = useState(false)
    const [submittedOrderNo, setSubmittedOrderNo] = useState(null)//handles fetching the submitted order numbers
    const [viewAllOrders, setViewAllOrders] = useState();
    //THE FOLLOWING useState ENSURES AT LEAST ONE ITEM HAS A QUANTITY GREATER THAN 0
    const [orderSelections, setOrderSelections] = useState({})

    useEffect(() =>{
        if(showPopup){
            document.body.style.setProperty('overflow', 'hidden', 'important')
        }else{
            document.body.style.overflow=""
        }
        return() =>{
            document.body.style.overflow=""
        }
    }, [showPopup])
    //READ AND UNDERSTAND THE CODE BELOW
    //THE FOLLOWING CODE ENSURES AT LEAST ONE ITEM HAS A QUANTITY GREATER THAN 0
    const handleOrderChange = (order_name, quantity, price) => {
        setOrders(prev => {
            const updated = prev.filter(item => item.order_name != order_name)
            if(quantity !== '0'){
                updated.push({
                    order_name,
                    quantity: parseInt(quantity),
                    price: parseFloat(price.replace('$', ''))
                })
            }
            return updated
        })
        //THE FOLLOWING CODE ENSURES AT LEAST ONE ITEM HAS A QUANTITY GREATER THAN 0
        setOrderSelections(prev => ({
            ...prev,
            [order_name]: { quantity, price }
        }));
    };
    //START OF: FORM SUBMISSION HANDLING
    const handleSubmit = async (e) => {
        e.preventDefault();

        //THE FOLLOWING CODE ENSURES AT LEAST ONE ITEM HAS A QUANTITY GREATER THAN 0
        const atleastOneSelection = Object.values(orderSelections).some(
            item => parseInt(item.quantity) > 0
        );
        if(!atleastOneSelection){
            alert("Please select at least one item to order");
            return;
        }

        try{
            //insert the customer to DB
            const { data: customerData, error: customerError } = await supabase
            .from('customer')
            .insert([{rank, name}])
            .select('customer_id')

            if(customerError) throw customerError
            const customer_id = customerData[0].customer_id

            //insert order ONCE
            const { data: orderData, error: orderError } = await supabase
                .from('order')
                .insert([{customer_id}]) //adds the customer_id to the database
                .select('order_no')

                if(orderError) throw orderError;
                const order_no = orderData[0].order_no

                //insert the items with the same order_no
                const itemPayload = orders.map(order => ({
                    order_no,
                    order_name: order.order_name,
                    quantity: order.quantity,
                    price: order.price
                }));
            //insert the order to DB
           //new line for items
           const { error: itemError } = await supabase
                .from('items')
                .insert(itemPayload)
                console.log("item payload", itemPayload)
            
            if(orderError) throw itemError
            //if(orderError) throw orderError
            //grabs the first order_no
            //setSubmittedOrderNo(orderData[0].order_no)
            setSubmittedOrderNo(order_no);//this line is new for making items have the same order_no
            setShowPopup(true)
            console.log("Order placed successfully!")
        } catch(err){
            console.error('Database Error from Supabase: ', err)
        }
        //display the display order button
        const showOrderNoButton = document.querySelector('.showOrderNoButton')
        showOrderNoButton.style.position="absolute"
        showOrderNoButton.style.left='0'
        showOrderNoButton.style.right='0'
        showOrderNoButton.width="80%"
        showOrderNoButton.style.display="flex"
        showOrderNoButton.style.justifyContent="center"
    }
    //END OF: FORM SUBMISSION HANDLING
   // const navigate = useNavigate();
    return(
        <div id="mainContent">
            {/*THE BOX THAT WILL ALERT THE USER TO SELECT AT LEAST ONE ITEM*/}
            <div className='selectAnItem'>
                <p>PLEASE SELECT AT LEAST ONE ITEM TO ORDER</p>
            </div>
            <img className='logo' src='/IMAGES/BattleAxeCafeLogo.png'></img>
            <br />
            <hr />
            <br />
            {/*START OF FORM*/}
            <form id='userForm' onSubmit={handleSubmit}>
                <label htmlFor="genderRank">Rank (or select Sister):</label><br/>
                <select id="genderRank" name="genderRank" value={rank} onChange={(e) => setRank(e.target.value)}>
                    <option value="Officer 80">Officer 80</option>
                    <option value="Officer 50">Officer 50</option>
                    <option value="Officer 20">Officer 20</option>
                    <option value="Officer 10">Officer 10</option>
                    <option value="Soldier">Soldier</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                </select>
                <br/>
                <br/>
                {/*evaluate the input tag*/}
                <label htmlFor="name">Enter your full name:</label><br/>
                <input
                    required
                    type ="text" 
                    placeholder='First and last name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                
                <br/>
                {/*Meals*/}
                <h4>Select Your Meal&#40;s&#41;</h4>
                <span className='allergyWarning'>
                    <strong>ALLERGIES: Please let the kitchen team know of any allergies that you may have to prevent issues.</strong>
                    <br />
                    <strong>INQUIRE OF THE INGREDIENTS</strong>
                </span>
                <br />
                <br />
                <div className='meals'>
                    <Items 
                        image={"/IMAGES/bowl.jpg"}
                        imageAlt={''}
                        order_name={"Food item 1"}
                        price={'$14'}
                        quantity={['0','1','2','3']}
                        onChange={handleOrderChange}
                    />
                    <Items 
                        image={"/IMAGES/bowl.jpg"}
                        imageAlt={''}
                        order_name={"Food item 2"}
                        price={'$14'}
                        quantity={['0','1','2','3']}
                        onChange={handleOrderChange}
                    />
                    <Items 
                        image={"/IMAGES/bowl.jpg"}
                        imageAlt={''}
                        order_name={"Food item 3"}
                        price={'$14'}
                        quantity={['0','1','2','3']}
                        onChange={handleOrderChange}
                    />
                    <Items 
                        image={"/IMAGES/bowl.jpg"}
                        imageAlt={''}
                        order_name={"Food item 4"}
                        price={'$14'}
                        quantity={['0','1','2','3']}
                        onChange={handleOrderChange}
                    />
                </div>
                <input type="submit" value="Place Order" />
            </form>
            <br />
            <br />
            <button className='showOrderNoButton' onClick={() =>setShowPopup(true)}>DISPLAY MY ORDER# </button>   

            {showPopup && (
                <OrderSubmitted 
                orderNo={submittedOrderNo} 
                onClose={() =>setShowPopup(false) } 
                />
            )}
            {/* END OF FORM*/}
            <br/>
        </div>
    );
}
export default Main;