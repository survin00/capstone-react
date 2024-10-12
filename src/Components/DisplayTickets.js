// src/components/TicketForm.js

import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Layout from './Layout';
import { Container, Form, Row, Col, Table, Button } from 'react-bootstrap';
import {baseURL} from './constants';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TicketForm = () => {
  const [error, setError] = useState([]);
  const [ticketId, setTicketId] = useState();
  const [issueStatus, setIssueStatus] = useState();
  const [furnitureId, setFurnitureId] = useState();
  const [locationId, setLocationId] = useState();
  const [ticketDetails, setTicketDetails] = useState([]);
  const [dataGridShow,setDataGridShow] = useState(false);
  const [checker, setChecker] = useState(true);
  const [corporate, setCorporate] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic, e.g., sending data to the backend
    let getPay;
    if(ticketId) getPay = 'ticketid='+ticketId+'&';
    if(furnitureId) getPay += 'furnitureid='+furnitureId+'&'
    if(issueStatus) getPay += 'issueStatus='+issueStatus+'&'
    if(locationId) getPay += 'locationid='+locationId;
    console.log(getPay,'ticketid='+ticketId+'&'+'furnitureid='+furnitureId+'&',"getPay")
    try {
    const response = await axios.get(`${baseURL}/apis/ticket/?${getPay}`
    );

    if (response.status === 200) {
      // Store the tokens in localStorage
      console.log("TEST",response)
      setTicketDetails(response.data);
      setDataGridShow(true);
    } else {
      alert('Cannot Fetch Ticket ID');
    }
  } catch (error) {
    console.log("ERROR", error.response.data)
    const err = Object.keys(error.response.data).map(val=>"Field is not valid - " + val);
    console.log(err)
    setError(err); //login failure
  }
  };

  const handleResolveTicket=(e, ticket)=>{
    e.preventDefault();
    navigate('/resolveTicket', {state :{ticketId:ticket.ticketid,locationId:ticket.locationid,furnitureId:ticket.furnitureid,issueStatus: ticket.issuestatus,createdBy: ticket.reportedby,createdDate: ticket.createddate, issueDesc:ticket.issuedescription}})
  }

  const handleViewTicket=(e, ticket)=>{
    e.preventDefault();
    navigate('/viewTicket', {state :{ticketId:ticket.ticketid,locationId:ticket.locationid,furnitureId:ticket.furnitureid,issueStatus: ticket.issuestatus,createdBy: ticket.reportedby,createdDate: ticket.createddate, issueDesc:ticket.issuedescription}})
  
  }

  return (
    <div style={{backgroundColor:'#dfe6e69a'}}>
    <Layout/>
    <Container className="mt-5">
      <div className="title">Search Ticket</div>
      <Form>
        {error?error.map(err=><div style={{'color':'red'}}>{err}</div>):null}
        <Row className="mb-3 mt-5">
          {/* First input (First Name) */}
          <Col md={6}>
            <Form.Group controlId="ticketId">
              <Form.Label>Ticket ID</Form.Label>
              <Form.Control type="text" placeholder="Enter Ticket ID" size='lg' value={ticketId} onChange={e=>setTicketId(e.target.value)}/>
            </Form.Group>
          </Col>

          {/* Second input (Last Name) */}

          <Col md={6}>
            <Form.Group controlId="locationId">
              <Form.Label>Location ID</Form.Label>
              <Form.Control type="text" placeholder="Enter Location ID" size='lg' value={locationId} onChange={e=>setLocationId(e.target.value)}/>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">

          {/* Fourth input (Phone) */}
          <Col md={{span:6}}>
            <Form.Group controlId="phone">
              <Form.Label>Furniture ID</Form.Label>
              <Form.Control type="number" placeholder="Enter Furniture ID"  size='lg' value={furnitureId} onChange={(e)=>setFurnitureId(e.target.value)}/>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="phone">
              <Form.Label>Issue Status</Form.Label>
              <Form.Control type="text" placeholder="Issue Status"  size='lg' value={issueStatus} onChange={e=>setIssueStatus(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
        {/* Submit Button */}
        <Row className="mb-12">
          <Col className="submit-container">
          <button type="submit" onClick={handleSubmit}>
              Search
            </button>
          </Col>
        </Row>
      </Form>
      {dataGridShow &&
      <Table className='table-striped' bordered hover>
          <thead>
            <tr>
              <th style={{'text-align': 'center', 'backgroundColor':'gray'}}>Ticket ID</th>
              <th style={{'text-align': 'center', 'backgroundColor':'gray'}}>Furniture ID</th>
              <th style={{'text-align': 'center', 'backgroundColor':'gray'}}>Issue Status</th>
              <th style={{'text-align': 'center', 'backgroundColor':'gray'}}>Created By</th>
              {!!checker || !!corporate ? <th style={{'text-align': 'center', 'backgroundColor':'gray'}}>Actions</th>:null}
            </tr>
          </thead>
          <tbody>
          {ticketDetails ? ticketDetails.map((ticket)=>
            (
            <tr key={ticket.ticketid}>
              <td>{ticket.ticketid}</td>
              <td>{ticket.furnitureid}</td>
              <td>{ticket.issuestatus}</td>
              <td>{ticket.reportedby}</td>
              {!!checker || !!corporate ? <td><Button className='cus-btn' onClick={(e)=>handleResolveTicket(e,ticket)}>Resolve</Button>
              <Button className='cus-btn' onClick={(e)=>handleViewTicket(e,ticket)}>View</Button></td>:null}
            </tr>)
          ):null
          }
          </tbody>
          
      </Table>
      }
       
    </Container>

  </div>
  );
};

export default TicketForm;
