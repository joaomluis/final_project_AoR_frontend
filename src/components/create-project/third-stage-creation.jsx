import React, { useState, useEffect } from "react";
import {
  CardBody,
  Form,
  FormGroup,
  Input,
  Button,
  Row,
  Col,
  Label,
} from "reactstrap";

import { Api } from "../../api.js";
import { useUserStore } from "../stores/useUserStore.js";

function ThirdStageCreation() {
  const token = useUserStore((state) => state.token);

  const [searchTerm, setSearchTerm] = useState("");
  const [allMembers, setAllMembers] = useState([]);
  const [matchedMembers, setMatchedMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    const matched = allMembers?.filter((member) =>
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMatchedMembers(matched);
  };

  const handleSelect = (userId) => {
    const newSelectedMembers = [...selectedMembers];
    const index = newSelectedMembers.indexOf(userId);
    if (index > -1) {
      newSelectedMembers.splice(index, 1);
    } else {
      newSelectedMembers.push(userId);
    }
    setSelectedMembers(newSelectedMembers);
    console.log(selectedMembers);
  };

  useEffect(() => {
    const matched = allMembers?.filter((member) =>
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMatchedMembers(matched);
  }, [searchTerm, allMembers]);

  useEffect(() => {}, [selectedMembers]);

  const selectedMemberObjects = selectedMembers.map((id) =>
    allMembers.find((member) => member.userId === id)
  );

  const props = {
    privateProfile: true,
    dtoType: "UserAddToProjectDto",
  };

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await Api.getUsersByDto(token, props);
        setAllMembers(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchUsers();
  }, []);

  return (
    <>
      <CardBody>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h3>Invite people to your project</h3>
        </div>
        <Form onSubmit={handleSearch}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Input
                  type="text"
                  placeholder="Add new members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </FormGroup>

              <div
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              >
                {matchedMembers.map((member) => (
                  <div
                    key={member.userId}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "10px",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={member.imagePath}
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                      />
                      {`${member.firstName} ${member.lastName}`}
                    </div>
                    <input
                      type="checkbox"
                      name="memberSelect"
                      value={member.userId}
                      onChange={() => handleSelect(member.userId)}
                    />
                  </div>
                ))}
              </div>
            </Col>
            <Col md={1}> </Col>
            <Col md={5}>
              <FormGroup
                style={{
                  textAlign: "center",
                  backgroundColor: "#f0f0f0", // light grey background
                  borderRadius: "5px", // rounded corners
                  padding: "10px", // padding around the form group
                  margin: "10px 0", // margin around the form group
                }}
              >
                <Label
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px", // larger font size
                    color: "#333", // dark grey color
                  }}
                >
                  Group Preview
                </Label>
              </FormGroup>

              <div
                style={{
                  maxHeight: "175px",
                  overflowY: "auto",
                  border: "1px solid #ccc",
                  padding: "10px",
                  margin: "10px 0",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                }}
              >
                {selectedMemberObjects.map((member) => (
                  <div
                    key={member.userId}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "10px",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={member.imagePath}
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                      />
                      {`${member.firstName} ${member.lastName}`}
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </>
  );
}

export default ThirdStageCreation;
