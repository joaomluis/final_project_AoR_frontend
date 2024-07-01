import { Card, CardHeader, CardBody, ListGroup, ListGroupItem } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "react-i18next";
import { format, formatDate } from "date-fns";
import { Api } from "../../api";
import { useUserStore } from "../../stores/useUserStore";
import useLogStore from "../../stores/useLogStore";
import { useEffect, useState } from "react";
import TaskStatus from "../enums/TaskStatus";
import LogType from "../enums/LogType";
import UserType from "../enums/UserType";
import ProjectStatus from "../enums/ProjectStatus";
function formatNotificationTime(time) {
  return format(new Date(time), "d MMM yyyy, HH:mm");
}
function formatNotificationDay(time) {
  return format(new Date(time), "d MMM yyyy");
}

function formatText(text) {
  return text
    .split("_") // Divide a string em partes, separadas por underscore
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Transforma a primeira letra em maiúscula e o restante em minúscula
    .join(" "); // Junta as partes com um espaço
}

function getLogTypeClass(logType) {
  switch (logType) {
    case LogType.USER_JOIN:
      return "logTypeUserJoin";
    case LogType.USER_LEAVE:
      return "logTypeUserLeave";
    case LogType.TASK_CREATE:
      return "logTypeTaskCreate";
    case LogType.PROJECT_CHANGE:
      return "logTypeProjectChange";
    case LogType.TASK_CHANGE:
      return "logTypeTaskChange";
    case LogType.TASK_DELETE:
      return "logTypeTaskDelete";
    case LogType.TASK_COMPLETE:
      return "logTypeTaskComplete";
    case LogType.TASK_STATE_CHANGE:
      return "logTypeTaskStateChange";
    case LogType.USER_CHANGE:
      return "logTypeUserChange";
    case LogType.USER_KICKED:
      return "logTypeUserKicked";
    case LogType.PROJECT_STATE_CHANGE:
      return "logTypeProjectStateChange";

    default:
      return ""; // Retorna uma string vazia ou uma classe padrão se necessário
  }
}

function LogsCard({ id }) {
  const { t } = useTranslation();
  const token = useUserStore((state) => state.token);
  const logs = useLogStore((state) => state.logs);
  const setLogs = useLogStore((state) => state.setLogs);
  const addLogPage = useLogStore((state) => state.addLogPage);
  const today = formatNotificationDay(new Date());
  const yesterday = formatNotificationDay(new Date(Date.now() - 86400000));
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadMoreLogs = () => {
    if (page >= totalPages) return;
    setPage((prevPage) => prevPage + 1);
    console.log(page);
  };

  const DEF = () => {
    return <>{"log-format-invalid"}</>;
  };

  const TASK_CREATE = (log) => {
    console.log(log.taskName);
    return (
      <>
        {" "}
        {t("created-task")}{" "}
        <span className="bold">
          {log.taskName}
          {" ("}
          {log.taskId}
          {") "}
        </span>
      </>
    );
  };

  const TASK_CHANGE = (log) => {
    return (
      <>
        {" "}
        {t("task-changed")}{" "}
        <span className="bold">
          {log.taskName}
          {" ("}
          {log.taskId}
          {") "}
        </span>
      </>
    );
  };
  const TASK_DELETE = (log) => {
    return (
      <>
        {" "}
        {t("deleted-task")}{" "}
        <span className="bold">
          {log.taskName}
          {" ("}
          {log.taskId}
          {") "}
        </span>
      </>
    );
  };

  const TASK_COMPLETE = (log) => {
    return (
      <>
        {" "}
        {t("completed-task")}{" "}
        <span className="bold">
          {log.taskName}
          {" ("}
          {log.taskId}
          {") "}
        </span>
      </>
    );
  };

  const TASK_STATE_CHANGE = (log) => {
    const statusTypeNew = formatText(TaskStatus.fromValue(log.newTaskStatus));
    const statusTypeOld = formatText(TaskStatus.fromValue(log.oldTaskStatus));

    return (
      <>
        {" "}
        {t("changed-task-state")}{" "}
        <span className="bold">
          {log.taskName}
          {" ("}
          {log.taskId}
          {") "}
        </span>
        {t("from")} <span className="bold">{statusTypeNew} </span>
        {t("to")} <span className="bold">{statusTypeOld} </span>
      </>
    );
  };

  const USER_JOIN = (log) => {
    return (
      <>
        {" "}
        {t("add-user")} <span className="bold">{log.affectedUserFirstName}</span> {t("to-the-project")}
      </>
    );
  };

  const USER_LEAVE = (log) => {
    return (
      <>
        <span className="bold">{log.affectedUserFirstName}</span> {t("left-the-project")}
      </>
    );
  };

  const USER_KICKED = (log) => {
    console.log(log.id);
    return (
      <>
        {" "}
        {t("remove-user")} <span className="bold">{log.affectedUserFirstName}</span> {t("from-the-project")}
      </>
    );
  };

  const USER_CHANGE = (log) => {
    const statusTypeNew = formatText(UserType.fromValue(log.newUserType));
    const statusTypeOld = formatText(UserType.fromValue(log.oldUserType));
    return (
      <>
        {" "}
        {t("changed-user")} <span className="bold">{log.affectedUserFirstName}</span> {t("in-the-project")} {t("from")}{" "}
        <span className="bold">{statusTypeNew} </span>
        {t("to")} <span className="bold">{statusTypeOld} </span>
      </>
    );
  };

  const PROJECT_CHANGE_STATUS = (log) => {
    console.log(log.id);
    const statusTypeNew = formatText(ProjectStatus.fromValue(log.newProjectStatus));
    const statusTypeOld = formatText(ProjectStatus.fromValue(log.oldProjectStatus));
    return (
      <>
        {" "}
        {t("changed-project-state")} {t("from")} <span className="bold">{statusTypeNew}</span> {t("to")} <span className="bold">{statusTypeOld}</span>
      </>
    );
  };

  const PROJECT_CHANGE = (log) => {
    return <> {t("changed-project-details")}</>;
  };

  function defaultLog({ log }) {
    if (!log) {
      console.log("log is null");
      return <div>Log info is missing</div>;
    }
    const type = t(`${LogType.fromValue(log.type)}`);
    // const type = formatText(LogType.fromValue(log.type));
    function renderLogDetail(log) {
      switch (log.type) {
        case LogType.TASK_CREATE:
          console.log(log);
          return TASK_CREATE(log);

        case LogType.TASK_CHANGE:
          console.log(log);
          return TASK_CHANGE(log);

        case LogType.TASK_DELETE:
          console.log(log);
          return TASK_DELETE(log);

        case LogType.TASK_COMPLETE:
          console.log(log);
          return TASK_COMPLETE(log);

        case LogType.TASK_STATE_CHANGE:
          console.log(log);
          return TASK_STATE_CHANGE(log);

        case LogType.USER_JOIN:
          console.log(log);
          return USER_JOIN(log);

        case LogType.USER_LEAVE:
          console.log(log);
          return USER_LEAVE(log);

        case LogType.USER_CHANGE:
          console.log(log);
          return USER_CHANGE(log);

        case LogType.USER_KICKED:
          console.log(log);
          return USER_KICKED(log);

        case LogType.PROJECT_CHANGE:
          console.log(log);
          return PROJECT_CHANGE(log);

        case LogType.PROJECT_STATE_CHANGE:
          console.log(log);
          return PROJECT_CHANGE_STATUS(log);

        default:
          return DEF();
      }
    }
    return (
      <div className={`logContainer ${getLogTypeClass(log.type)}`}>
        <p className="logTitle">{type}</p>
        <p className="logDetail">
          {t("user-log")}&nbsp;
          {log?.type !== LogType.USER_LEAVE ? <span className="bold">{log.userFirstName}</span> : null}
          {renderLogDetail(log)}
          <div style={{ display: "flex", justifyContent: "right" }}>
            {t("at")}&nbsp;<span className="italic">{formatNotificationTime(log.instant)}</span>{" "}
          </div>
        </p>
      </div>
    );
  }

  async function getLogs() {
    const props = {
      page_number: page,
      page_size: 3,
    };
    try {
      const response = await Api.getProjectLogs(token, id, props);
      if (page === 1) {
        setLogs(response.data.results);
      } else if (page > 1 && page <= totalPages) {
        console.log("page", page);
        addLogPage(response.data.results);
        console.log("logs", logs);
      }
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getLogs();
  }, [page]);

  const formatDateLabel = (date) => {
    const logDate = new Date(date);
    if (today(logDate)) {
      return "Hoje";
    } else if (yesterday(logDate)) {
      return "Ontem";
    } else {
      // Formata a data para exibição se não for hoje nem ontem
      return format(logDate, "dd/MM/yyyy");
    }
  };
  const logsByDate = logs?.reduce((acc, log) => {
    const date = formatNotificationDay(log.instant); // Converte a data para o formato YYYY-MM-DD

    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(log);
    return acc;
  }, {});

  return (
    <div>
      <ListGroup style={{ margin: "" }}>
        {Object.entries(logsByDate).map(([date, logsForDate]) => (
          <div key={date}>
            <h4>{date}</h4> {/* Exibe a data */}
            {logsForDate.map((log, index) => (
              <div key={index} style={{ margin: "10px" }}>
                {defaultLog({ log: log })}
              </div>
            ))}
          </div>
        ))}
      </ListGroup>
      {/* Exibe o botão "Carregar Mais" apenas se houver mais páginas a serem carregadas */}
      {page < totalPages ? (
        <Button className="button-style1" onClick={loadMoreLogs} style={{ backgroundColor: "var(--greyish)", color: "var(--secondary-color)" }}>
          {t("load-more")}
        </Button>
      ) : null}
    </div>
  );
}
export default LogsCard;
