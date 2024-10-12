// src/components/TicketForm.js

import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Layout from './Layout';
import { Container, Form, Row, Col, Button, Modal, ListGroup } from 'react-bootstrap';
import {baseURL} from './constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TicketForm = () => {
  const [formData, setFormData] = useState({
    description: '',
    image: null,
  });
  const [error, setError] = useState([]);
  const [popUp, setPopup] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [ticketId, setTicketId] = useState(null);
  const [createdBy, setCreatedBy] = useState(null);
  const [createdDate, setCreatedDate] = useState(null);
  const [issueStatus, setIssueStatus] = useState(null);
  const [issueDesc, setIssueDesc] = useState(null);
  const [furnitureId, setFurnitureId] = useState(null);
  const [locationId, setLocationId] = useState(null);
  const navigate = useNavigate();


  const onDrop = (acceptedFiles) => {
    setFormData({
      ...formData,
      image: acceptedFiles[0],
    });
  };

  const handleClose=()=>{
    setPopup(false)
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic, e.g., sending data to the backend
    console.log('Form data submitted:', formData);
    try {
    const response = await axios.patch(`${baseURL}/apis/ticketupdate/${ticketId}/`, {
    "ticketid":ticketId,
    "issuestatus":"OPEN",
    "createdDate":createdDate,
    "reportedby": createdBy,
    "issuedescription":issueDesc,
    "resolutiontype": null,
    "resolutioncomments": null,
    "resolutiondate": null,
    "lastupdateddate": null,
    "furnitureid": furnitureId,
    "locationid": locationId
      });

    if (response.status === 200) {
      // Store the tokens in localStorage
      console.log("Success HTTP200",response)
      setTicketId(response.data.ticketid);
      setCreatedDate(response.data.createddate.split('T')[0]);
      setIssueStatus(response.data.issuestatus);
      navigate('/displayTickets');
      alert('Ticket successfully created');
      

    } else {
      alert('Error. Cannot Fetch Ticket ID. Please contact admin.');
    }
  } catch (error) {
    console.log("ERROR", error.response.data)
    const err = Object.keys(error.response.data).map(val=> val + " - field is not valid ");
    console.log(err)
    alert(err); //Validation failure
  }
  };

  const handlePopUp=()=>{
    setPopup(true);
  }

   const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files)); // Store multiple files as an array
  };

  // Function to handle file upload submission
  const handleFileUpload = (event) => {
    event.preventDefault();
    if (selectedFiles.length > 0) {
      console.log('Files selected:', selectedFiles);
      // Here you would typically upload the files to the server
      alert(`Files uploaded: ${selectedFiles.map(file => file.name).join(', ')}`);
    } else {
      alert('Please select at least one file before uploading');
    }
    handleClose(); // Close the modal after file upload
  };

  useEffect(()=>{
    fetchTicketId();
    
  },[])

  const fetchTicketId=async()=>{
    try {
    const response = await axios.post(`${baseURL}/apis/ticket/`, {
    "furnitureid":5,
    "locationid":1,
    "issuestatus":"DRAFT",
    "issuedescription":"XXXX"
});

    if (response.status === 201) {
      // Store the tokens in localStorage
      console.log("TEST",response)
      setTicketId(response.data.ticketid);
      setCreatedDate(response.data.createddate.split('T')[0]);
      setIssueStatus(response.data.issuestatus);
    } else {
      alert('Cannot Fetch Ticket ID');
    }
  } catch (error) {
    // setError(error.response.data.detail); //login failure
  }
  }

  return (
    <div style={{backgroundColor:'#dfe6e69a'}}>
    <Layout/>
        <Container className="mt-5">
          <div className="title">Create Ticket</div>
      <Form>
        {error?error.map(err=><div style={{'color':'red'}}>{err}</div>):null}
        <Row className="mb-3 mt-5">
          {/* First input (First Name) */}
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label>Ticket ID</Form.Label>
              <Form.Control type="text" placeholder="Enter Ticket ID" size='lg' value={ticketId} disabled/>
            </Form.Group>
          </Col>

          {/* Second input (Last Name) */}
          <Col md={6}>
            <Form.Group controlId="lastName">
              <Form.Label>Created By</Form.Label>
              <Form.Control type="text" placeholder="Enter Created By" size='lg' value={createdBy} onChange={(e)=>setCreatedBy(e.target.value)}/>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          {/* Third input (Email) */}
          <Col md={6}>
            <Form.Group controlId="locationid">
              <Form.Label>Location ID</Form.Label>
              <Form.Control type="text" placeholder="Enter Location ID" size='lg'value={locationId} onChange={(e)=>setLocationId(e.target.value)}/>
            </Form.Group>
          </Col>

          {/* Fourth input (Phone) */}
          <Col md={6}>
            <Form.Group controlId="phone">
              <Form.Label>Furniture ID</Form.Label>
              <Form.Control type="number" placeholder="Enter Furniture ID"  size='lg' value={furnitureId} onChange={(e)=>setFurnitureId(e.target.value)}/>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          {/* Third input (Email) */}
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Created Date</Form.Label>
              <Form.Control type="date" placeholder="Enter Created Date" size='lg' value={createdDate} disabled/>
            </Form.Group>
          </Col>

          {/* Fourth input (Phone) */}
          <Col md={6}>
            <Form.Group controlId="phone">
              <Form.Label>Issue Status</Form.Label>
              <Form.Control type="text" placeholder="Issue Status"  size='lg' value={issueStatus} disabled/>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          {/* Third input (Email) */}
          <Col md={12}>
            <Form.Group controlId="email">
              <Form.Label>Issue Description</Form.Label>
              <Form.Control as="textarea" placeholder="Enter Issue Description" size='lg' value={issueDesc} onChange={e=>setIssueDesc(e.target.value)}/>
            </Form.Group>
          </Col>
        </Row>

        {/* Submit Button */}
        <Row>
          <Col className="submit-container">
            <button type="button" onClick={handlePopUp}>
              Upload Images
            </button>
          </Col>
          <Col className="submit-container">
          <button type="submit" onClick={handleSubmit}>
              Submit Ticket
            </button>
          </Col>
        </Row>
      </Form>
      <Modal show={popUp} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Multiple File Upload Input */}
            <Form.Group controlId="fileUpload">
              <Form.Label>Choose files to upload</Form.Label>
              <Form.Control type="file" multiple onChange={handleFileChange} />
            </Form.Group>

            {/* Displaying the list of uploaded files */}
            {selectedFiles.length > 0 && (
              <ListGroup className="mt-3">
                {selectedFiles.map((file, index) => (
                  <ListGroup.Item key={index}>{file.name}</ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleFileUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    

    </div>
  );
};

export default TicketForm;
