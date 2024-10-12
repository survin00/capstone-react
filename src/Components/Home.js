import React from 'react';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';

const Home=()=>{
    const navigate = useNavigate();
    const handleHomeLinkClick=()=>{
        navigate('/login')
    }
    return(
/*<div className='bgstyle'>
        <Layout />
        <h5 className='HomeText'> create a Ticket</h5>
    </div> */
<div >
        <Layout />
            <div className="landing-backdrop">
                <div className="text-container">
                        <div className="welcome-message">
                            <h2>
                                Welcome to Furnifix!
                            </h2> 
                        </div>
                        <div className='para-text'>
                        Furnifix aims at simplifying furniture damage reporting and management at FurniCentre.
                            <br/>  Quickly report damage from transit, warehouses, or stores.
                              Streamline workflows for efficient decision-making on repairs, returns, or discounts.
                              Minimize delays and improve supply chain operations.
                        </div>
                        <div>
                            <h5 className='home-text'>
                            Please login to use the application.
                            </h5>
                        </div>


        
                </div> 
            </div>
        </div>

    ) 

    
}

export default Home;

