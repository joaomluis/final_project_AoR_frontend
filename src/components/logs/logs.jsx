import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { useTranslation } from "react-i18next";
function TaskCreateLog({ log }) {
  return (
    <ListGroupItem>
      Task {log.task.id} was created by {log.user.email} at{" "}
      {log.instant.toString()}
    </ListGroupItem>
  );
}

function UserJoinLog({ log }) {
  return (
    <ListGroupItem>
      User {log.user.email} joined project {log.project.name} at{" "}
      {log.instant.toString()}
    </ListGroupItem>
  );
}

function DefaultLog({ log }) {
  return (
    <ListGroupItem>
      {log.type} at {log.instant.toString()}
    </ListGroupItem>
  );
}

function LogsCard(props) {
  const logsByDate = props.logs.reduce((acc, log) => {
    const date = log.instant.toISOString().split("T")[0]; // Converte a data para o formato YYYY-MM-DD
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(log);
    return acc;
  }, {});

  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  const { t } = useTranslation();
  return (
    <ListGroup>
      {Object.entries(logsByDate).map(([date, logsForDate], index) => (
        <div key={index}>
          <ListGroupItem>
            <strong>
              {date === today && `${t("today")} ${date}`}
              {date === yesterday && `${t("yesterday")} ${date}`}
              {date !== today && date !== yesterday && date}
            </strong>
          </ListGroupItem>
          {logsForDate.map((log, index) => {
            switch (log.type) {
              case "TASK_CREATE":
                return <TaskCreateLog key={index} log={log} />;
              case "USER_JOIN":
                return <UserJoinLog key={index} log={log} />;
              default:
                return <DefaultLog key={index} log={log} />;
            }
          })}
        </div>
      ))}
    </ListGroup>
  );
}

export default LogsCard;
