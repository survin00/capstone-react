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
          <div className="title">Resolve Ticket</div>
      <Form>
        {error?error.map(err=><div style={{'color':'red'}}>{err}</div>):null}
        <Row className="mb-3 mt-5">
          {/* First input (Ticket ID) */}
          <Col md={6}>
            <Form.Group controlId="ticketId">
              <Form.Label>Ticket ID</Form.Label>
              <Form.Control type="text" size='lg' value={ticketId} disabled/>
            </Form.Group>
          </Col>

          {/* Second input (EMail) */}
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Created By</Form.Label>
              <Form.Control type="text" size='lg' value={createdBy} disabled/>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          {/* Third input (Location ID) */}
          <Col md={6}>
            <Form.Group controlId="locationId">
              <Form.Label>Location ID</Form.Label>
              <Form.Control type="text" size='lg' value={locationId} disabled/>
            </Form.Group>
          </Col>

          {/* Fourth input (Furniture ID) */}
          <Col md={6}>
            <Form.Group controlId="furnitureId">
              <Form.Label>Furniture ID</Form.Label>
              <Form.Control type="number" size='lg' value={furnitureId} disabled/>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          {/* Fifth input (CreatedDate) */}
          <Col md={6}>
            <Form.Group controlId="createdDate">
              <Form.Label>Created Date</Form.Label>
              <Form.Control type="date" size='lg' value={createdDate.split('T')[0]} disabled/>
            </Form.Group>
          </Col>

          {/* Sixth input (Issue Status) */}
          <Col md={6}>
            <Form.Group controlId="phone">
              <Form.Label>Issue Status</Form.Label>
              <Form.Control type="text" placeholder="Issue Status"  size='lg' value={issueStatus} disabled/>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          {/* Third input (Issue Description) */}
          <Col md={12}>
            <Form.Group controlId="issueDescription">
              <Form.Label>Issue Description</Form.Label>
              <Form.Control as="textarea" size='lg' value={issueDesc} disabled/>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          {/* Seventh input (Resolution Type) */}
          <Col md={6}>
            <Form.Group controlId="resolutionType">
              <Form.Label>Resolution Type</Form.Label>
              <Form.Control type="text" placeholder="Enter Resolution Type" size='lg' value={resolutionType} onChange={e=>setResolutionType(e.target.value)}/>
            </Form.Group>
          </Col>

          {/* Eighth input (ResolutionDate) */}
          <Col md={6}>
            <Form.Group controlId="resolutionDate">
              <Form.Label>Resolution Date</Form.Label>
              <Form.Control type="date" placeholder="Enter Resolution Date"  size='lg' value={resolutionDate} onChange={e=>setResolutionDate(e.target.value)}/>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          {/* Third input (Resolution Comments) */}
          <Col md={12}>
            <Form.Group controlId="resolutionComments">
              <Form.Label>Resolution Comments</Form.Label>
              <Form.Control as="textarea" placeholder="Enter Resolution Comments" size='lg' value={resolutionComments} onChange={e=>setResolutionComments(e.target.value)}/>
            </Form.Group>
          </Col>
        </Row>

        {/* Submit Button */}
        <Row className="mb-3">
          <Col className="submit-container">
          <button type="submit" onClick={handleSubmit}>
              Resolve
            </button>
          </Col>
        </Row>
      </Form>
    </Container>

    </div>
  );
};

export default ResolveTicket;
