import React from 'react';
import Layout from './Layout';
import { Card, Button } from 'react-bootstrap';




const card = (
    <React.Fragment>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </React.Fragment>
  );


const Home=()=>{
    return(
      <div>
        <Layout />
        <div className='landing-backdrop'>

            <div className='text-container'>
              <div className="welcome-message-loghome">
                            <h5>
                            Welcome to Furnifix Application, you're logged in. Please choose the activity you would like to perform
                            </h5> 
              </div>
              <div className='card-horizontal'>
                <Card bg='secondary' style={{ width: '14rem', height:'10rem', marginTop:'30px'}}>
                  <Card.Body>
                    <Card.Title style={{color: '#dfdcdc', fontSize:'15px'}}>Open Tickets</Card.Title>
                    <Card.Text style={{color: '#dfdcdc', fontSize:'35px'}}>20</Card.Text>
                    <Button variant="link" size="sm">Click to view.. </Button>
                  </Card.Body>
                </Card>
                <Card bg='secondary' style={{ width: '14rem', height:'10rem', marginTop:'30px', marginLeft:'20px' }}>
                  <Card.Body>
                    <Card.Title style={{color: '#dfdcdc', fontSize:'15px'}}>Resolved Tickets</Card.Title>
                    <Card.Text style={{color: '#dfdcdc', fontSize:'35px'}}>1</Card.Text>
                    <Button variant="link" size="sm">Click to view.. </Button>
                  </Card.Body>
                </Card>
              </div>
              
              
            </div>
        </div>
    </div>
    )
    
}

export default Home;

