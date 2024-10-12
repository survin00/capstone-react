// src/components/TicketForm.js

import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Layout from './Layout';
import { Container, Form, Row, Col, Button, Modal, ListGroup } from 'react-bootstrap';
import {baseURL} from './constants';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ResolveTicket = () => {
  const [error, setError] = useState([]);
  const [resolutionType, setResolutionType] = useState(null);
  const [resolutionDate, setResolutionDate] = useState(null);
  const [resolutionComments, setResolutionComments] = useState(null);
  const location = useLocation();
  console.log(location.state,"location")
  const { furnitureId, ticketId, locationId, createdBy, createdDate, issueStatus, issueDesc} = location.state || {};

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic, e.g., sending data to the backend
//     try {
//     const response = await axios.patch(`${baseURL}/apis/ticket/${ticketId}/`, {
//     "ticketid":ticketId,
//     "issuestatus":issueStatus,
//     "createdDate":createdDate,
//     "reportedby": createdBy,
//     "issuedescription": "Paint peeling on Chair",
//     "issuedescription":issueDesc,
//     "resolutiontype": null,
//     "resolutioncomments": null,
//     "resolutiondate": null,
//     "lastupdateddate": null,
//     "furnitureid": furnitureId,
//     "locationid": 1
// });

//     if (response.status === 201) {
//       // Store the tokens in localStorage
//       console.log("TEST",response)
//     //   setTicketId(response.data.ticketid);
//       setCreatedDate(response.data.createddate.split('T')[0]);
//       setIssueStatus(response.data.issuestatus);
//     } else {
//       alert('Cannot Fetch Ticket ID');
//     }
//   } catch (error) {
//     console.log("ERROR", error.response.data)
//     const err = Object.keys(error.response.data).map(val=>"Field is not valid - " + val);
//     console.log(err)
//     setError(err); //login failure
//   }
  };

  return (
    <div style={{backgroundColor:'#dfe6e69a'}}>
    <Layout/>
        <Container className="mt-5">
          <div className="title">View Ticket</div>
      <Form>
        <Row className="mb-3 mt-5">
          {/* First input (First Name) */}
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label>Ticket ID</Form.Label>
              <div className="form-control-lg" style={{ backgroundColor: '#f8f9fa', padding: '10px', border: '1px solid #ced4da', borderRadius: '.25rem' }}>
    {ticketId || 'N/A'}
  </div>
            </Form.Group>
          </Col>

          {/* Second input (Last Name) */}
          <Col md={6}>
            <Form.Group controlId="lastName">
              <Form.Label>Created By</Form.Label>
              <div className="form-control-lg" style={{ backgroundColor: '#f8f9fa', padding: '10px', border: '1px solid #ced4da', borderRadius: '.25rem' }}>
    {createdBy || 'N/A'}
  </div>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          {/* Third input (Email) */}
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Location ID</Form.Label>
              <div className="form-control-lg" style={{ backgroundColor: '#f8f9fa', padding: '10px', border: '1px solid #ced4da', borderRadius: '.25rem'}}>
    {locationId || 'N/A'}
  </div>
            </Form.Group>
          </Col>

          {/* Fourth input (Phone) */}
          <Col md={6}>
            <Form.Group controlId="phone">
              <Form.Label>Furniture ID</Form.Label>
              <div className="form-control-lg" style={{ backgroundColor: '#f8f9fa', padding: '10px', border: '1px solid #ced4da', borderRadius: '.25rem' }}>
    {furnitureId || 'N/A'}
  </div>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          {/* Third input (Email) */}
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Created Date</Form.Label>
              <div className="form-control-lg" style={{ backgroundColor: '#f8f9fa', padding: '10px', border: '1px solid #ced4da', borderRadius: '.25rem' }}>
    {createdDate.split('T')[0] || 'N/A'}
  </div>
            </Form.Group>
          </Col>

          {/* Fourth input (Phone) */}
          <Col md={6}>
            <Form.Group controlId="phone">
              <Form.Label>Issue Status</Form.Label>
              <div className="form-control-lg" style={{ backgroundColor: '#f8f9fa', padding: '10px', border: '1px solid #ced4da', borderRadius: '.25rem' }}>
    {issueStatus || 'N/A'}
  </div>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          {/* Third input (Issue Description) */}
          <Col md={12}>
            <Form.Group controlId="issueDescription">
              <Form.Label>Issue Description</Form.Label>
              <div className="form-control-lg" style={{ backgroundColor: '#f8f9fa', padding: '10px', border: '1px solid #ced4da', borderRadius: '.25rem' }}>
    {issueDesc || 'N/A'}
  </div>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>

    </div>
  );
};

export default ResolveTicket;
