import '../CSS/footer.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';

function Footer() {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/hok')
    }
    const handleBack = () => {
        navigate('/')
    }
    return(
        <footer>
            <span className='allergyWarning'>ALLERGIES: Please be mindful of your allergies. 
                <br />Let the kitchen team know of any allergies that you may have to prevent issues.
                <br />
                INQUIRE OF THE INGREDIENT
                <br />
                <br />
                <hr />
            </span>
            <button className='hokButton' onClick={handleRedirect}>HEAD OF KITCHEN</button>
            <br />
            <br />
            <button onClick={handleBack}> &#8592; HOME</button>
            <p>Created and Hosted by Code-de-Sac, LLC. &copy; 2025 </p>
            <p>ALL RIGHTS RESERVED</p>
        </footer>
    );
};

export default Footer;