import React, { useState, useEffect } from 'react';
import {
  CardBody,
  Form,
  FormGroup,
  Input,
  Button,
  Row,
  Col,
} from 'reactstrap';

function ThirdStageCreation() {
  const [searchTerm, setSearchTerm] = useState('');
const [allMembers] = useState([
  { name: 'John Doe' },
  { name: 'Jane Doe' },
  { name: 'Bob Smith' },
]);
const [matchedMembers, setMatchedMembers] = useState([]);

const handleSearch = (event) => {
  event.preventDefault();
  const matched = allMembers.filter(member => member.name.toLowerCase().includes(searchTerm.toLowerCase()));
  setMatchedMembers(matched);
};

useEffect(() => {
  const matched = allMembers.filter(member => member.name.toLowerCase().includes(searchTerm.toLowerCase()));
  setMatchedMembers(matched);
}, [searchTerm, allMembers]);

console.log(matchedMembers);
console.log(searchTerm);
  return (
    <>
      <CardBody>
        <div style={{textAlign:"center", marginBottom:"20px"}}>
      <h3>Invite people to your project</h3>
      </div>
        <Form onSubmit={handleSearch}>
          <Row>
          <Col md={2}></Col>
            <Col md={8}>
              <FormGroup>
                <Input
                  type="text"
                  placeholder="Add new members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </FormGroup>
              
              {matchedMembers.map((member, index) => (
                <p key={index}>{member.name}</p>
              ))}
            </Col>
          </Row>
        </Form>
      </CardBody>
    </>
  );
}

export default ThirdStageCreation;