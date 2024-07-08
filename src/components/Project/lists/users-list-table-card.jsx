import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, CardHeader, CardSubtitle, CardTitle, Row, Table, Col } from "reactstrap";
import Select from "react-select";
import { FaUserCheck, FaUserTimes, FaEye } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";
import UserType from "../../enums/UserType.js";
import "./users-list-table-card.css";

const UserList = ({ users, handleAcceptResume, handleChangeRole, handleKickUser, edit }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const roleOptions = [
    { value: UserType.MANAGER, label: "Manager" },
    { value: UserType.NORMAL, label: "Normal" },
  ];

  const getRoleLabel = (roleValue) => {
    const roleKey = UserType.fromValue(roleValue);
    return roleKey ? roleKey.charAt(0).toUpperCase() + roleKey.slice(1).toLowerCase() : "";
  };

  const renderTable = () => (
    <div className="table-responsive">
      <Table responsive bordered>
        <thead>
          <tr>
            <th>{t("avatar")}</th>
            <th>{t("name")}</th>
            <th>{t("lab")}</th>
            {edit === true ? <th>{t("role")}</th> : null}
            <th>{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <img alt="profile" src={user.img} className="profile-image" style={{ width: "50px", height: "50px" }} />
              </td>
              <td>
                <div>
                  {user.firstname} {user.lastname}
                </div>
                <div>
                  <strong>{getRoleLabel(user.role)}</strong>
                </div>
              </td>
              <td>{user.lab}</td>
              {edit === true ? (
                <>
                  <td>
                    <Select
                      onChange={(e) => handleChangeRole(user.id, e.value)}
                      options={roleOptions}
                      className="w-100"
                      defaultValue={{ value: user.role, label: getRoleLabel(user.role) }}
                    />{" "}
                  </td>
                  <td>
                    <div className="d-flex justify-content-around">
                      <Link to={`/fica-lab/user/${user.id}`} className="btn btn-link p-0">
                        <FaEye size={20} color="blue" />
                      </Link>
                      <Button color="link" onClick={() => handleKickUser(user.id)} className="p-0">
                        <FaUserTimes size={20} color="red" />
                      </Button>
                    </div>
                  </td>
                </>
              ) : (
                <td>
                  <div className="d-flex justify-content-around">
                    <Link to={`/fica-lab/user/${user.id}`} className="btn btn-link p-0">
                      <FaEye size={20} color="blue" />
                    </Link>
                    <Button color="link" onClick={() => handleAcceptResume(user.id, true)} className="p-0">
                      <FaUserCheck size={20} color="green" />
                    </Button>
                    <Button color="link" onClick={() => handleAcceptResume(user.id)} className="p-0">
                      <FaUserTimes size={20} color="red" />
                    </Button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );

  const renderCards = () => (
    <Row>
      {users.map((user) => (
        <Col key={user.id} sm="12" md="6" lg="4" className="mb-4">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">
                <div className="d-flex align-items-center">
                  <img alt="profile" src={user.img} className="profile-image" style={{ width: "50px", height: "50px", marginRight: "10px" }} />
                  {user.firstname} {user.lastname}
                </div>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <CardSubtitle className="mb-2">
                <strong>{getRoleLabel(user.role)}</strong>
              </CardSubtitle>
              <CardSubtitle>
                Lab: <strong>{user.lab}</strong>
              </CardSubtitle>
              {edit === true && (
                <>
                  <Select
                    onChange={(e) => handleChangeRole(user.id, e.value)}
                    options={roleOptions}
                    className="mt-3"
                    defaultValue={{ value: user.role, label: getRoleLabel(user.role) }}
                  />
                  <CardFooter style={{ display: "flex", justifyContent: "space-around" }}>
                    <Link to={`/fica-lab/user/${user.id}`} className="btn btn-link p-0">
                      <FaEye size={20} color="blue" />
                    </Link>
                    <Button color="link" onClick={() => handleKickUser(user.id)} className="p-0">
                      <FaUserTimes size={20} color="red" />
                    </Button>
                  </CardFooter>
                </>
              )}
            </CardBody>
            {edit === true ? null : (
              <CardFooter style={{ display: "flex", justifyContent: "space-around" }}>
                <Link to={`/fica-lab/user/${user.id}`} className="btn btn-link p-0">
                  <FaEye size={20} color="blue" />
                </Link>
                <Button color="link" onClick={() => handleAcceptResume(user.id, true)} className="p-0">
                  <FaUserCheck size={20} color="green" />
                </Button>
                <Button color="link" onClick={() => handleAcceptResume(user.id)} className="p-0">
                  <FaUserTimes size={20} color="red" />
                </Button>
              </CardFooter>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );
  const renderNoDataMessage = () => <div className="no-data-message">{t("no-data-available")}</div>;

  return <div>{users.length === 0 ? renderNoDataMessage() : isMobile ? renderCards() : renderTable()}</div>;
};

export default UserList;
