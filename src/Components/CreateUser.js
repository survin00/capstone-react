import React, {useState} from 'react';
import Layout from './Layout';
import axios from 'axios';
import {baseURL} from './constants';
import { Container, Form, Row, Col, Button, Modal, ListGroup } from 'react-bootstrap';

const CreateUser=()=>{
    const [firstName, setFirstName] = useState('');
    const [userId, setUserId] = useState(null);
    const [userType, setUserType] = useState(null);
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [createdDate, setCreatedDate] = useState(null);
  const [status, setStatus] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    else{
      e.preventDefault(); // Prevent the default form submission behavior
    try {
    const response = await axios.post(`${baseURL}/useracc/register/`, {
      firstname:firstName,
      lastname:lastName,
      email: email,
      phone: phone,
      password: password
    });

    if (response.status === 201) {
      // Store the tokens in localStorage
      alert("User Saved Successfully!");
      setConfirmPassword('');
      setFirstName('');
    setUserId('');
    setUserType('');
  setLastName('');
  setEmail('');
  setUserName('');
  setPhone('');
  setPassword('');
  setConfirmPassword('');
  setCreatedDate('');
  setStatus('');
  setError('');
    } else {
      alert('User Saved has failed');
    }
  } catch (error) {console.log(error.response.data)
    setError(Object.keys(error.response.data)); //login failure
  }
    }
}

    // const newUser = {
    //   firstName,
    //   lastName,
    //   email,
    //   username,
    //   phone,
    //   password,
    //   role,
    //   status
    // };
    return(

        <div style={{backgroundColor:'#dfe6e69a'}}>
    <Layout/>
        <Container className="mt-5">
          <div className="title">Create User</div>
      <Form>
        {error?error.map(err=><div style={{'color':'red'}}>{`${err} is required or cannot be the given value`}</div>):null}
        <Row className="mb-3 mt-5">
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter FirstName" size='lg' value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Last Name" size='lg' value={lastName} onChange={e=>setLastName(e.target.value)}/>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" size='lg' value={email} onChange={e=>setEmail(e.target.value)}/>
            </Form.Group>
          </Col>      
          <Col md={6}>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="tel" placeholder="Enter Phone Number" size='lg' value={phone} onChange={e=>setPhone(e.target.value)}/>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          {/* Fourth input (Phone) */}
          <Col md={6}>
            <Form.Group controlId="userType">
              <Form.Label>User Type</Form.Label>
              <Form.Control as="select" value={userType} onChange={e=>setUserType(e.target.value)} size={'lg'}>
            <option value="">Choose User Type</option>
            <option value="warehouseUser">Warehouse User</option>
            <option value="store User">Store User</option>
            <option value="corporateuser">Corporate User</option>
            <option value="checker">Checker</option>
            <option value="genericUser">Generic User</option>
          </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" value={status} onChange={e=>setStatus(e.target.value)} size={'lg'}>
            <option value="">Choose Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">          
          <Col md={6}>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="text" placeholder="Enter Password" size='lg' value={password} onChange={e=>setPassword(e.target.value)}/>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="text" placeholder="Enter Confirm Password" size='lg' value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}/>
            </Form.Group>
          </Col>
        </Row>

        {/* Submit Button */}
        <Row className="mb-3">
          <Col className="submit-container"  md={{span:4,offset:4}} size={'lg'}>
          <button type="submit" onClick={handleSubmit}>
              Create User
            </button>
          </Col>
        </Row>
      </Form>
      </Container>
      </div>
      
    );
    
}


export default CreateUser;