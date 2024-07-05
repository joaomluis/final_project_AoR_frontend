import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, ListGroup, Card } from "react-bootstrap";

import { useParams } from "react-router-dom";
import { Gantt, ViewMode } from "gantt-task-react";
import { Api } from "../../api.js";
import "gantt-task-react/dist/index.css";
import { useUserStore } from "../../stores/useUserStore";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { terror } from "../toasts/message-toasts.jsx";
import { ModalTask } from "../modals/modal-task.jsx";
const transformTasksData = (tasks) => {
  return tasks
    .filter((task) => {
      return task.initialDate && task.finalDate;
    })
    .map((task) => {
      // Conversão das datas
      const startDate = new Date(task.initialDate);
      const endDate = new Date(task.finalDate);
      return {
        id: task.systemTitle,
        name: task.title,
        type: "task",
        start: startDate,
        end: endDate,
        // progress: task.status === "FINISHED" ? 100 : task.status === "IN_PROGRESS" ? 50 : 0,
        dependencies: task.dependentTasks ? task.dependentTasks.map((dep) => dep.systemTitle) : [],
        styles: {
          backgroundColor:
            task.status === "FINISHED"
              ? "var(--color-task-complete)"
              : task.status === "IN_PROGRESS"
              ? "var(--in-progress)"
              : task.status === "PRESENTATION"
              ? "#F44336"
              : "#2196F3",
          progressColor: "#ffbb54",
          progressSelectedColor: "#ff9e0d",
        },
        originalTask: task,
        isDisabled: task.status === "PRESENTATION", // Se for apresentação, desabilitar a edição
      };
    });
};

const formatToLocalDateTime = (date) => {
  return `${date}T00:00:00`;
};

const viewModeOptions = [
  { value: ViewMode.Day, label: "Day" },
  { value: ViewMode.Week, label: "Week" },
  { value: ViewMode.Month, label: "Month" },
  { value: ViewMode.Year, label: "Year" },
];

const displayModeOptions = [
  { value: "gantt", label: "Gantt Chart" },
  { value: "list", label: "Task List" },
];

const GanttChart = ({ id }) => {
  const [tasks, setTasks] = useState([]);
  const [viewMode, setViewMode] = useState(ViewMode.Month);
  const token = useUserStore((state) => state.token);
  const [displayMode, setDisplayMode] = useState("gantt");
  const [columnWidth, setColumnWidth] = useState(200);
  const [isChecked, setIsChecked] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const triggerUpdate = () => {
    console.log("Triggering update...");
    setUpdateTrigger((prev) => prev + 1); // Incrementa o contador para disparar a atualização
  };
  const toggleModal = () => setIsTaskModalOpen(!isTaskModalOpen);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleColumnWidth = () => {
    setColumnWidth(columnWidth === 200 ? 0 : 200);
    setIsChecked(!isChecked);
  };
  const { t } = useTranslation();
  const fetchData = async () => {
    const props = {
      dtoType: "TaskGanttDto",
    };
    try {
      const response = await Api.getTasks(token, id, props);
      const data = response.data;
      const transformedTasks = transformTasksData(data);
      setTasks(transformedTasks);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id, token, updateTrigger]);

  const handleTaskClick = (task) => {
    console.log("Task clicked:", task);
  };

  const handleDateChange = async (task) => {
    console.log("Task date changed:", task);

    try {
      if (task.start.getTime() === task.end.getTime()) {
        // Ajustar a data final para ser um dia depois da data inicial
        task.end.setDate(task.start.getDate() + 1);
      }
      const props = {
        initialDate: task.start.toISOString().split("T")[0], // Formatar para ISO 8601 (sem tempo)
        finalDate: task.end.toISOString().split("T")[0], // Formatar para ISO 8601 (sem tempo)
      };
      console.log("Props:", props);
      // Enviar solicitação para atualizar a data da tarefa no backend
      const response = await Api.updateTaskDate(token, task.originalTask.id, props);
      // Opcional: Realizar uma nova busca ou atualização global dos dados
    } catch (error) {
      terror(error.message);
    } finally {
      fetchData();
    }
  };

  const renderTaskList = () => {
    const taskMap = new Map();
    const topLevelTasks = [];

    tasks.forEach((task) => {
      taskMap.set(task.id, { ...task, dependents: [] });
      if (!task.dependencies.length) {
        topLevelTasks.push(task);
      }
    });

    tasks.forEach((task) => {
      task.dependencies.forEach((depId) => {
        if (taskMap.has(depId)) {
          taskMap.get(depId).dependents.push(task);
        }
      });
    });

    const renderTask = (task) => (
      <Card key={task.id}>
        <Card.Body style={{ borderTop: "1rem solid var(--greyish)" }}>
          <Card.Title>{task.name}</Card.Title>
          <Card.Text>
            <strong>Start:</strong> {task.start.toLocaleDateString()}
            <br />
            <strong>End:</strong> {task.end.toLocaleDateString()}
          </Card.Text>
        </Card.Body>
        {task.dependents.length > 0 && (
          <ListGroup className="list-group-flush">
            {task.dependents.map((dependent) => (
              <ListGroup.Item key={dependent.id}>
                <strong>{dependent.name}</strong>: {dependent.start.toLocaleDateString()} - {dependent.end.toLocaleDateString()}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card>
    );

    return (
      <div>
        <h3>Task List</h3>
        <ListGroup>
          {topLevelTasks.map((task) => (
            <ListGroup.Item key={task.id}>{renderTask(taskMap.get(task.id))}</ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  };

  function handleCreateTask() {
    console.log("Create task");
  }

  return (
    <>
      {/* <Container style={{ height: "91%", position: "relative" }}> */}
      <Row>
        <Col lg="12">
          <Row>
            <Col lg="10" md="8" sm="6"></Col>
            <Col lg="2" md="4" sm="6" style={{}}>
              <Button className="mt-3 mb-0" onClick={toggleModal} variant="secondary" style={{ width: "100%" }}>
                {t("Add-task")}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col lg="4" md="4" sm="5" style={{ display: "flex", alignItems: "center" }}>
              <Select
                className="mt-2 mb-2 mr-2"
                options={displayModeOptions}
                defaultValue={displayModeOptions.find((option) => option.value === displayMode)}
                onChange={(selectedOption) => setDisplayMode(selectedOption.value)}
                styles={{ container: (provided) => ({ ...provided, display: "inline-block", width: "100%" }) }} // Ajusta marginRight para espaçamento
              />
            </Col>
            <Col lg="4" md="4" sm="1" />
            <Col lg="4" md="4" sm="6" style={{ display: "flex", alignItems: "center" }}>
              {" "}
              {displayMode === "list" ? null : (
                <>
                  <Select
                    options={viewModeOptions}
                    defaultValue={viewModeOptions.find((option) => option.value === viewMode)}
                    onChange={(selectedOption) => setViewMode(selectedOption.value)}
                    styles={{ container: (provided) => ({ ...provided, display: "inline-block", width: "100%" }) }} // Ajusta marginRight para espaçamento
                  />
                </>
              )}
            </Col>
          </Row>
          <label style={{ marginRight: "1rem" }}>
            <input type="checkbox" onChange={toggleColumnWidth} checked={columnWidth === 200} style={{ marginRight: "1rem" }} /> {t("view-tasks-list")}
          </label>
          {displayMode === "list"
            ? renderTaskList()
            : tasks.length > 0 && (
                <Gantt
                  tasks={tasks}
                  viewMode={viewMode}
                  onClick={handleTaskClick}
                  onDateChange={handleDateChange}
                  onProgressChange={""}
                  onDoubleClick={""}
                  onDelete={""}
                  listCellWidth={windowWidth < 768 ? 0 : columnWidth}
                  barBackgroundColor=""
                  rowHeight={35}
                  headerHeight={60}
                  barCornerRadius={6}
                  ganttHeight={""}
                />
              )}
        </Col>
      </Row>
      {/* </Container> */}
      <ModalTask isOpen={isTaskModalOpen} toggle={toggleModal} title={"create-task"} edit={""} id={id} token={token} trigger={() => triggerUpdate()} />
    </>
  );
};

export default GanttChart;
