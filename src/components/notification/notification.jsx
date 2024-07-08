import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import NotificationType from "../websockets/NotificationType";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const NotificationItem = ({ notification, onClick }) => {
  function formatNotificationTime(time) {
    return format(new Date(time), "d MMM yyyy, HH:mm");
  }

  const { t } = useTranslation();
  const isEmail = NotificationType.NEW_MAIL === notification.notificationType;
  const isInvite = NotificationType.INVITE === notification.notificationType;
  const isProjectMessage = NotificationType.PROJECT_MESSAGE === notification.notificationType;
  const isInviteAccepted = NotificationType.INVITE_ACCEPTED === notification.notificationType;
  const isInviteProposed = NotificationType.INVITE_PROPOSED === notification.notificationType;
  const isUserKicked = NotificationType.PROJECT_KICKED === notification.notificationType;
  const isRoleChanged = NotificationType.PROJECT_ROLE_CHANGED === notification.notificationType;
  const isTaskExecutorChanged = NotificationType.TASK_EXECUTOR_CHANGED === notification.notificationType;
  const navigate = useNavigate();
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
    project_message: {
      backgroundColor: "var(--whitey)",
      borderLeft: "0.3rem solid var(--greyish)",
      padding: "0.5rem",
      fontSize: "1rem",
    },
    task: {
      backgroundColor: "var(--whitey)",
      borderLeft: "0.3rem solid var(--yellowy)",
      padding: "0.5rem",
      fontSize: "1rem",
    },
  };

  // function truncate(text, maxLength) {
  //   return text.length > maxLength ? text.substring(0, maxLength - 3) + "..." : text;
  // }

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

  const navigateTo = () => {
    const path = isEmail
      ? `/fica-lab/email-list/?page=1`
      : isInvite
      ? `/fica-lab/project/${notification.projectId}`
      : isProjectMessage
      ? `/fica-lab/project/${notification.projectId}`
      : isInviteAccepted
      ? `/fica-lab/project/${notification.projectId}`
      : isInviteProposed
      ? `/fica-lab/project/${notification.projectId}`
      : isUserKicked
      ? `/fica-lab/project/${notification.projectId}`
      : isRoleChanged
      ? `/fica-lab/project/${notification.projectId}`
      : isTaskExecutorChanged
      ? `/fica-lab/project/${notification.projectId}`
      : `/fica-lab/email-list/?page=1`;
    navigate(path);
  };

  return (
    <Dropdown.Item
      onClick={onClick}
      style={
        isEmail
          ? getNotificationStyle("email", notification.read)
          : isInvite
          ? getNotificationStyle("invite", notification.read)
          : isProjectMessage
          ? getNotificationStyle("project_message", notification.read)
          : isInviteAccepted
          ? getNotificationStyle("invite", notification.read)
          : isInviteProposed
          ? getNotificationStyle("invite", notification.read)
          : isUserKicked
          ? getNotificationStyle("invite", notification.read)
          : isRoleChanged
          ? getNotificationStyle("invite", notification.read)
          : isTaskExecutorChanged
          ? getNotificationStyle("task", notification.read)
          : getNotificationStyle("message", notification.read)
      }
    >
      <div onClick={navigateTo} style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
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
                {isEmail
                  ? t("you-have-received-a-new-email")
                  : isInvite
                  ? t("you-have-received-an-invite")
                  : isProjectMessage
                  ? t("you-have-received-a-new-project-message")
                  : isInviteAccepted
                  ? t("you-are-accepted-to-join-the-project")
                  : isInviteProposed
                  ? t("you-have-received-a-new-propose-to-join-the-project")
                  : isUserKicked
                  ? t("you-have-been-kicked-from-the-project")
                  : isRoleChanged
                  ? t("your-role-has-been-changed")
                  : isTaskExecutorChanged
                  ? t("task-executor-changed")
                  : t("you-have-received-a-new-message")}
              </strong>
            </div>
          </div>
          <button style={{ border: "none", background: "none", cursor: "pointer" }}>
            <i className="fa fa-reply" aria-hidden="true"></i>
          </button>
        </div>
      </div>
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
