import './CSS/main.css'
import Items from './COMPONENTS/items';
import { useState } from 'react';

function Main(){
    /*const [showRank, setShowRank] = useState(false);
    const rank =["Officer20","Officer10","Soldier","Sister"]
    */
    return(
        <div id="mainContent">
            {/*<h1>Welcome to Battle Axe Cafe</h1>*/}
            <img className='logo' src='/IMAGES/BattleAxeCafeLogo.png'></img>
            <hr />
            <br />
            {/*START OF FORM*/}
            <form id='userForm'>
                <label for="genderRank">Rank (or select Sister):</label><br/>
                <select id="genderRank" name="genderRank">
                    <option value="Officer 20">Officer 20</option>
                    <option value="Officer 10">Officer 10</option>
                    <option value="Soldier">Soldier</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                </select>
                <br/>
                <br/>
                <label for="name">Enter your full name:</label><br/>
                <input type ="text" placeholder='First and last name'></input>
                <br/>
                {/*Meals*/}
                <h4>Select Your Meal(s)</h4>
                <div className='meals'>
                    <Items 
                        image={"/IMAGES/bowl.jpg"}
                        imageAlt={''}
                        desc={"Food item 1"}
                        options={['0','1','2','3']}
                    />
                    <Items 
                        image={"/IMAGES/bowl.jpg"}
                        imageAlt={''}
                        desc={"Food item 2"}
                        options={['0','1','2','3']}
                    />
                    <Items 
                        image={"/IMAGES/bowl.jpg"}
                        imageAlt={''}
                        desc={"Food item 3"}
                        options={['0','1','2','3']}
                    />
                    <Items 
                        image={"/IMAGES/bowl.jpg"}
                        imageAlt={''}
                        desc={"Food item 4"}
                        options={['0','1','2','3']}
                    />
                </div>
                <input type="submit" value="Place Order" />
            </form>
            {/* END OF FORM*/}
            <br/>
        </div>
    );
}
export default Main;