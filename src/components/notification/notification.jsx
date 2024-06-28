import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import NotificationType from "../websockets/NotificationType";
import { Link } from "react-router-dom";

const NotificationItem = ({ notification, onClick }) => {
  function formatNotificationTime(time) {
    return format(new Date(time), "d MMM yyyy, HH:mm");
  }
  console.log(notification);
  console.log(notification.notificationType);
  const { t } = useTranslation();
  const isEmail = NotificationType.NEW_MAIL === notification.notificationType;
  const isInvite = NotificationType.INVITE === notification.notificationType;
  const notificationStyles = {
    email: {
      backgroundColor: "var(--whitey)",
      borderLeft: "0.3rem solid var(--secondary-color)",
      padding: "0.5rem",
      fontSize: "1rem",
    },
    invite: {
      backgroundColor: "var(--whitey)",
      borderLeft: "0.3rem solid var(--primary-color)",
      padding: "0.5rem",
      fontSize: "1rem",
    },
  };

  function truncate(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength - 3) + "..." : text;
  }

  function getNotificationStyle(type, isRead) {
    return {
      ...notificationStyles[type],
      color: isRead ? "var(--primary-color-lighter)" : "var(--primary-color-darker)", // Notificações lidas são mais claras
      opacity: isRead ? 0.5 : 1, // Notificações lidas são mais transparentes
      borderRadius: "0rem",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      transition: "all 0.3s ease",
      cursor: "pointer",
      textDecoration: "none",
      display: "block",
    };
  }

  return (
    <Dropdown.Item
      onClick={onClick}
      style={
        isEmail
          ? getNotificationStyle("email", notification.read)
          : isInvite
          ? getNotificationStyle("invite", notification.read)
          : getNotificationStyle("message", notification.read)
      }
    >
      <Link
        to={isEmail ? `/fica-lab/email-list/` : isInvite ? `/fica-lab/project/${notification.projectId}` : `/messages/${notification.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div
          key={notification.id}
          className="notification"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={notification.senderImg} alt="Sender" style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }} />
            <div style={{ padding: "0.5rem" }}>
              <p style={{ margin: 0 }}>
                <strong>{notification.senderName}</strong>
                <span style={{ fontSize: "small" }}> &lt;{notification.senderEmail}&gt; </span>
              </p>
              <p style={{ fontSize: "0.8rem", color: "#666", margin: "5px 0" }}>{formatNotificationTime(notification.instant)}</p>
              {/* <strong>{truncate(notification.content, 40)}</strong> */}
              <strong>
                {isEmail ? t("you-have-received-a-new-email") : isInvite ? t("you-have-received-an-invite") : t("you-have-received-a-new-message")}
              </strong>
            </div>
          </div>
          <button style={{ border: "none", background: "none", cursor: "pointer" }}>
            <i className="fa fa-reply" aria-hidden="true"></i>
          </button>
        </div>
      </Link>
    </Dropdown.Item>
  );
};

// Estilo para o contêiner das notificações
const notificationContainerStyle = {
  backgroundColor: "var(--whitey)",
  maxWidth: "100%",
  maxHeight: "80vh",
  overflow: "hidden",
  overflowY: "auto",
};

export const Notification = ({ notifications, fetchNotifications, markNotifyAsRead, maxPages, currentPage, setPage }) => {
  const { t } = useTranslation();

  const loadMore = async () => {
    const nextPage = currentPage + 1; // Próxima página
    if (nextPage > maxPages) return; // Não carrega mais notificações se já estiver na última página
    await fetchNotifications(nextPage); // Carrega a próxima página
    setPage(nextPage); // Atualiza o estado da página atual
  };

  async function markAsRead(id) {
    await markNotifyAsRead(id);
  }

  return notifications.length > 0 ? (
    <div style={notificationContainerStyle}>
      {notifications.map((notification, index) => (
        <NotificationItem key={index} notification={notification} onClick={() => markAsRead(notification.id)} />
      ))}
      {currentPage + 1 <= maxPages ? (
        <button onClick={loadMore} className="button-style1" style={{ backgroundColor: "var(--primary-color-darker)" }}>
          {t("load-more")}
        </button>
      ) : null}
    </div>
  ) : (
    <Dropdown.Item style={{ padding: "8px 12px" }}>{t("no-notify")}</Dropdown.Item>
  );
};
