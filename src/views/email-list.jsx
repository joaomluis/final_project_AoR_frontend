import { Api } from "../api";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { ListGroup } from "react-bootstrap";

import { useUserStore } from "../components/stores/useUserStore.js";
import { Card, Button, Col, Row } from "react-bootstrap";
import { tsuccess, terror, twarn } from "../components/toasts/message-toasts.jsx";
import PaginationComponent from "../components/pagination/pagination.jsx";
import ListLayout from "../layout/list-layout/list.jsx";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

function EmailList() {
  const { t } = useTranslation();
  const email = useUserStore((state) => state.email);
  const token = useUserStore((state) => state.token);
  const [searchParams, setSearchParams] = useSearchParams({ page: 1, receiver: email, sender: "" });
  const pageParam = searchParams.get("page") || 1;

  const [loading, setLoading] = useState(true);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [ModalOrders, setModalOrder] = useState(false);
  const [ModalFilters, setModalFilter] = useState(false);
  const toggleFilter = () => setModalFilter(!ModalFilters);
  const toggleOrder = () => setModalOrder(!ModalOrders);

  const [mails, setMails] = useState([]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
      to: email,
    };

    try {
      const response = await Api.getMails(token, props);
      setMails(response.data.results);
      setTotalPages(response.data.totalPages);
      setLoading(false);
      setModalOrder(false);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getMails();
  }, []);
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

  function EmailLineLarge(mail) {
    return (
      <div style={{ position: "relative", display: "flex", boxShadow: "var(--box-shadow)", borderRadius: "5px", padding: "0.9rem", margin: "0.5rem" }}>
        <div style={{ fontWeight: mail.read ? "normal" : "bold", flexDirection: "column" }}>
          {mail.fromName}
          <div>{truncate(mail.subject, 10)}</div>
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
          {" "}
          {truncate(mail.body, 30)}
          <div style={{ position: "absolute", top: "0", right: "0", marginRight: "1rem", fontWeight: mail.read ? "normal" : "bold" }}>
            {new Date(mail.sentDate).toLocaleDateString()}
          </div>
          <div style={{ position: "absolute", right: "0", bottom: "0", top: "0", display: "flex", alignItems: "center", marginRight: "1rem" }}>
            <button className="button-icon">
              <FaRegTrashAlt />
            </button>
          </div>
        </div>
      </div>
    );
  }

  function EmailLineSmall(mail) {
    return (
      <div
        style={{
          boxShadow: "var(--box-shadow)",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "row",
          marginBottom: "1rem",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <img src={mail.imgSrc} alt="email" style={{ height: "70px", marginRight: "10px" }} />
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ fontWeight: mail.read ? "normal" : "bold" }}>{mail.fromName}</div>
            <div>{new Date(mail.sentDate).toLocaleDateString()}</div>
          </div>
          <div style={{ fontWeight: mail.read ? "normal" : "bold" }}>{truncate(mail.subject, 20)}</div>
          <div> {truncate(mail.body, 50)}</div>
        </div>
      </div>
    );
  }

  return (
    <ListLayout title={t("emails")} toggleOrder={toggleOrder} toggleFilter={toggleFilter} loading={loading}>
      <div style={{ margin: "1rem" }}>{mails.map((mail) => (windowWidth > 580 ? EmailLineLarge(mail) : EmailLineSmall(mail)))}</div>
    </ListLayout>
  );
}

export default EmailList;
