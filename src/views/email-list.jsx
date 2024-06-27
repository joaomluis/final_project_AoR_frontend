import { Api } from "../api";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import { useUserStore } from "../stores/useUserStore.js";
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
  const [searchParams, setSearchParams] = useSearchParams({ page: 1, to: email, from: "", search: "", tokenAuth: "", accept: "" });
  const pageParam = searchParams.get("page") || 1;
  const toParam = searchParams.get("to") || email;
  const fromParam = searchParams.get("from") || "";
  const searchParam = searchParams.get("search") || "";
  const navigate = useNavigate();

  const tokenAuthParam = searchParams.get("tokenAuth");
  const acceptParam = searchParams.get("accept");

  const [loading, setLoading] = useState(true);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteMailId, setDeleteMailId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const storeEmail = useUserStore((state) => state.email);

  const toggleDelete = (id) => {
    setDeleteModal(!deleteModal);
    setDeleteMailId(id);
  };

  const [mails, setMails] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);

  const setUnreadEmailsCount = useUserStore((state) => state.updateUnreadEmails);
  const unreadCount = useUserStore((state) => state.unreadEmails);
  useEffect(() => {
    if (tokenAuthParam && acceptParam) {
      console.log(tokenAuthParam, acceptParam);
      try {
        const response = Api.acceptInvite(token, tokenAuthParam, acceptParam);
        searchParams.delete("tokenAuth");
        searchParams.delete("accept");
        setSearchParams(searchParam);
        navigate(`?${searchParams.toString()}`, { replace: true });
      } catch (error) {
        terror(error.message);
      }
    }
  }, [tokenAuthParam, acceptParam]);

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    searchParams.set("search", event.target.value);
    setSearchParams(searchParams);
  };

  // useEffect(() => {
  //   // Verifica se o parâmetro 'to' está presente
  //   if (!searchParams.has("to")) {
  //     // Define o parâmetro 'to' com o e-mail do usuário
  //     searchParams.set("to", email);
  //     setSearchParams(searchParams);
  //   }
  // }, [email]); // Adiciona 'email' ao array de dependências

  function handleSearchSubmit(event) {
    event.preventDefault();
    getMails();
  }

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

      //if the request is
      if (props.from === null || props.from === "") {
        setUnreadEmailsCount(response.data.unreadCount);
      }

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
    // Verifica se está na página 1 e se os parâmetros 'from' ou 'to' estão definidos
    const isPageOne = pageParam === "1" || pageParam === 1 || pageParam === null;
    // const hasFromParam = searchParams.get("from") !== null && searchParams.get("from") !== "";
    const hasToParam = searchParams.get("to") !== null && searchParams.get("to") !== "";
    // console.log(isPageOne, hasFromParam, hasToParam);
    console.log(searchParams.get("from"), searchParams.get("to"));
    if (isPageOne && hasToParam) {
      getMails();
    }
  }, [unreadCount]);

  useEffect(() => {
    // allways search to=user email if no search params are set, to avoid white pages
    if (((searchParams.get("to") === null || searchParams.get("to") === "") && searchParams.get("from") === null) || searchParams.get("from") === "") {
      searchParams.set("to", email);
      setSearchParams(searchParams);
    }
    getMails();
    console.log("useEffect");
  }, [pageParam, toParam, fromParam, tokenAuthParam, acceptParam]);

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
      console.log("to");
      searchParams.set("to", email);
      searchParams.delete("from");
      console.log(email);
    }
    if (filter === "from") {
      searchParams.set("from", email);
      searchParams.delete("to");
      console.log(email);
    }
    console.log(Array.from(searchParams.entries()));
    setSearchParams(searchParams);
  }

  function handleClickEmail(mail) {
    setSelectedMail(mail);
    // mail.read = true;
  }
  function backToMailPage() {
    setSelectedMail(null);
  }

  function EmailLineLarge(mail, key) {
    return (
      <div className="email-container" onClick={() => handleClickEmail(mail)} key={key}>
        {" "}
        <div
          style={{
            fontWeight: mail.read || mail.from === storeEmail ? "normal" : "bold",
            flexDirection: "column",
            width: "10rem",
          }}
        >
          {mail.from === email ? t("me") : truncate(mail.fromName, 9)}

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
              fontSize: "small",
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

  function EmailLineSmall(mail, key) {
    return (
      <div className="email-container" onClick={() => handleClickEmail(mail)} key={key}>
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ fontWeight: mail.read || mail.from === storeEmail ? "normal" : "bold" }}>{mail.from === mail ? t("me") : mail.fromName}</div>
            <div style={{ fontSize: "small", fontWeight: mail.read || mail.from === storeEmail ? "normal" : "bold" }}>
              {new Date(mail.sentDate).toLocaleDateString()}
            </div>
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
            <Col xl="2" lg="2" md="6" xs="6" className="margin-row">
              <Button color="light" className="button-style1" onClick={() => setFilter("to")}>
                {t("received-emails")}
              </Button>
            </Col>
            <Col xl="2" lg="2" md="6" xs="6" className="margin-row">
              <Button color="light" className="button-style1" onClick={() => setFilter("from")}>
                {t("sent-emails")}
              </Button>
            </Col>
          </Row>
          <div style={{ margin: "1rem" }}>{mails.map((mail) => (windowWidth > 580 ? EmailLineLarge(mail, mail.id) : EmailLineSmall(mail, mail.id)))}</div>
          <PaginationComponent currentPage={currentPage} totalPages={totalPages} setCurrentPage={handlePageChange} />
        </ListLayout>
      )}
      <ConfirmModal isOpen={deleteModal} toggle={toggleDelete} title={t("delete-email")} onConfirm={() => deleteMail(deleteMailId)} />
    </>
  );
}

export default EmailList;
