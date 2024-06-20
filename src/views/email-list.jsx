import { Api } from "../api";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import { useUserStore } from "../components/stores/useUserStore.js";
import { Card, Col, Row } from "react-bootstrap";
import { tsuccess, terror, twarn } from "../components/toasts/message-toasts.jsx";
import PaginationComponent from "../components/pagination/pagination.jsx";
import ListLayout from "../layout/list-layout/list.jsx";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import ModalOrder from "../components/modals/modal-order.jsx";
import EmailComponent from "../components/email/email-component.jsx";
import ConfirmModal from "../components/modals/modal-confirm.jsx";
import "../components/email/email-component.css";
function EmailList() {
  const { t } = useTranslation();
  const email = useUserStore((state) => state.email);
  const token = useUserStore((state) => state.token);
  const [searchParams, setSearchParams] = useSearchParams({ page: 1, to: email, from: "", search: "" });
  const pageParam = searchParams.get("page") || 1;
  const toParam = searchParams.get("to") || email;
  const fromParam = searchParams.get("from") || "";
  const searchParam = searchParams.get("search") || "";
  const [loading, setLoading] = useState(true);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteMailId, setDeleteMailId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleDelete = (id) => {
    setDeleteModal(!deleteModal);
    setDeleteMailId(id); // Armazene o id no estado
  };
  const [mails, setMails] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const storeEmail = useUserStore((state) => state.email);

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    searchParams.set("search", event.target.value);
    setSearchParams(searchParams);
  };

  const handleSearchSubmit = () => {
    getMails();
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  async function getMails() {
    const props = {
      page_number: pageParam,
      page_size: 30,
      to: searchParams.get("to"),
      from: searchParams.get("from"),
      search: searchParam,
    };

    try {
      const response = await Api.getMails(token, props);
      setMails(response.data.results);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function deleteMail(id) {
    console.log(id);
    console.log(token);
    try {
      const response = await Api.deleteMail(token, id);
      tsuccess("Mail deleted successfully");
      getMails();
      toggleDelete(id);
      backToMailPage();
      console.log(response);
    } catch (error) {
      console.log(error.message);
      terror("Error deleting mail");
    }
  }

  useEffect(() => {
    getMails();
  }, [pageParam, toParam, fromParam]);

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setCurrentPage(parseInt(page, 10));
    }
    getMails();
  }, [pageParam]);

  const handlePageChange = (page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  function truncate(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  function setFilter(filter) {
    if (filter === "to") {
      searchParams.set("to", email);
      searchParams.delete("from");
    }
    if (filter === "from") {
      searchParams.set("from", email);
      searchParams.delete("to");
    }
    setSearchParams(searchParams);
  }

  function handleClickEmail(mail) {
    setSelectedMail(mail);
    mail.read = true;
  }
  function backToMailPage() {
    setSelectedMail(null);
  }

  function EmailLineLarge(mail) {
    return (
      <div className="email-container" onClick={() => handleClickEmail(mail)}>
        {" "}
        <div
          style={{
            fontWeight: mail.read || mail.from === storeEmail ? "normal" : "bold",
            flexDirection: "column",
            width: "10rem",
          }}
        >
          {truncate(mail.fromName, 9)}
          <div>{truncate(mail.subject, 16)}</div>
        </div>
        <div
          style={{
            fontSize: "medium",
            justifyContent: "space-between",
            textAlign: "center",
            alignContent: "center",
            marginLeft: "1rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {windowWidth > 1030 ? truncate(mail.body, 70) : truncate(mail.body, 20)}
          <div
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              marginRight: "1rem",
              fontWeight: mail.read || mail.from === storeEmail ? "normal" : "bold",
            }}
          >
            {new Date(mail.sentDate).toLocaleDateString()}
          </div>
          <div style={{ position: "absolute", right: "0", bottom: "0", top: "0", display: "flex", alignItems: "center", marginRight: "1rem" }}>
            <button
              className="button-icon"
              onClick={(event) => {
                event.stopPropagation();
                toggleDelete(mail.id);
              }}
            >
              <FaRegTrashAlt />
            </button>
          </div>
        </div>
      </div>
    );
  }

  function EmailLineSmall(mail) {
    return (
      <div className="email-container" onClick={() => handleClickEmail(mail)}>
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ fontWeight: mail.read || mail.from === storeEmail ? "normal" : "bold" }}>{mail.fromName}</div>
            <div style={{ fontWeight: mail.read || mail.from === storeEmail ? "normal" : "bold" }}>{new Date(mail.sentDate).toLocaleDateString()}</div>
          </div>
          <div style={{ fontWeight: mail.read || mail.from === storeEmail ? "normal" : "bold" }}>{truncate(mail.subject, 20)}</div>
          <div> {truncate(mail.body, 50)}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {selectedMail ? (
        <EmailComponent mail={selectedMail} loading={loading} back={backToMailPage} deleteToggle={toggleDelete} />
      ) : (
        <ListLayout title={t("emails")} loading={loading}>
          <Row className="center-btn-input">
            <Col xl="8" lg="8" md="12" xs="12" className="margin-row">
              <InputGroup>
                <Input type="text" value={searchParam} onChange={handleSearchChange} placeholder={t("search-mail")} />
                <InputGroupText onClick={handleSearchSubmit} style={{ cursor: "pointer" }}>
                  <Button outline className="" color="" style={{ border: "none", padding: "0" }}>
                    <FaSearch />
                  </Button>
                </InputGroupText>
              </InputGroup>
            </Col>
            <Col xl="2" lg="2" md="6" xs="12" className="margin-row">
              <Button color="light" className="button-style1" onClick={() => setFilter("to")}>
                {t("received-emails")}
              </Button>
            </Col>
            <Col xl="2" lg="2" md="6" xs="12" className="margin-row">
              <Button color="light" className="button-style1" onClick={() => setFilter("from")}>
                {t("sent-emails")}
              </Button>
            </Col>
          </Row>
          <div style={{ margin: "1rem" }}>{mails.map((mail) => (windowWidth > 580 ? EmailLineLarge(mail) : EmailLineSmall(mail)))}</div>
          <PaginationComponent currentPage={currentPage} totalPages={totalPages} setCurrentPage={handlePageChange} />
        </ListLayout>
      )}
      <ConfirmModal isOpen={deleteModal} toggle={toggleDelete} title={t("delete-email")} onConfirm={() => deleteMail(deleteMailId)} />
    </>
  );
}

export default EmailList;
