import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, ListGroup, Card } from "react-bootstrap";

import { useParams } from "react-router-dom";
import { Gantt, ViewMode } from "gantt-task-react";
import { Api } from "../../api.js";
import "gantt-task-react/dist/index.css";
import { useUserStore } from "../../stores/useUserStore";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { terror, tsuccess } from "../toasts/message-toasts.jsx";
import { ModalTask } from "../modals/modal-task.jsx";
import useMessageStore from "../../stores/useMessageStore";

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
  const [selectedTask, setSelectedTask] = useState(null);
  const [mode, setMode] = useState("create");
  const activeTab = useMessageStore((state) => state.activeTab);
  const { t } = useTranslation();

  const viewModeOptions = [
    { value: ViewMode.Day, label: t("day") },
    { value: ViewMode.Week, label: t("week") },
    { value: ViewMode.Month, label: t("month") },
    { value: ViewMode.Year, label: t("year") },
  ];

  const displayModeOptions = [
    { value: "gantt", label: t("gantt-chart") },
    { value: "list", label: t("task-list") },
  ];
  const triggerUpdate = () => {
    console.log("Triggering update...");
    setUpdateTrigger((prev) => prev + 1); // Incrementa o contador para disparar a atualização
  };
  const toggleModal = () => {
    setMode("create");
    setIsTaskModalOpen(!isTaskModalOpen);
  };
  const toggleModalView = () => {
    setMode("view");
    setIsTaskModalOpen(!isTaskModalOpen);
  };
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
    if (activeTab === "2") {
      fetchData();
      console.log("Fetching tasks...");
    }
  }, [id, token, updateTrigger, activeTab]);

  const handleTaskClick = (task) => {
    if (task.originalTask.status === "PRESENTATION") {
      terror("Task is a presentation, you cannot edit it");
      return;
    }
    setMode("edit");
    setSelectedTask(task.originalTask);
    toggleModalView();
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
      // Enviar solicitação para atualizar a data da tarefa no backend
      const response = await Api.updateTaskDate(token, task.originalTask.id, props);
      tsuccess(response.data.message);
      // Opcional: Realizar uma nova busca ou atualização global dos dados
    } catch (error) {
      terror(error.message);
    } finally {
      fetchData();
    }
  };
  const handleClickTaskMobile = (e) => {
    console.log(e);
    const task = tasks.find((task) => task.originalTask.id === e);
    setMode("view");
    setSelectedTask(task.originalTask);
    toggleModalView();
  };

  const renderTaskList = () => {
    console.log(tasks);
    const filtered = tasks.filter((task) => task.originalTask.status !== "PRESENTATION");
    return (
      <Container>
        <h3 className="mb-4">{t("Task-list")}</h3>
        <ListGroup>
          {filtered.map((task) => (
            <ListGroup.Item key={task.originalTask.id} className="p-0 border-0" onClick={() => handleClickTaskMobile(task.originalTask.id)}>
              <Card className="mb-3" style={{ borderTop: "0.25rem solid var(--greyish)" }}>
                <Card.Body>
                  <Card.Title style={{ fontSize: "1.25rem" }}>{task.originalTask.title}</Card.Title>
                  <Card.Text style={{ fontSize: "0.9rem" }}>
                    <strong>{t("Start")}</strong>: {new Date(task.originalTask.initialDate).toLocaleDateString()}
                    <br />
                    <strong>{t("End")}</strong>: {new Date(task.originalTask.finalDate).toLocaleDateString()}
                  </Card.Text>
                </Card.Body>
                {task.originalTask.dependentTasks && task.originalTask.dependentTasks.length > 0 && (
                  <ListGroup className="list-group-flush">
                    {task.originalTask.dependentTasks.map((dependent) => (
                      <ListGroup.Item key={dependent.id} style={{ fontSize: "0.85rem" }}>
                        <strong>{dependent.title}</strong>: {new Date(dependent.initialDate).toLocaleDateString()} -{" "}
                        {new Date(dependent.finalDate).toLocaleDateString()}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    );
  };

  const handleSetMode = (newMode) => {
    console.log("Setting mode:", newMode);
    setMode(newMode);
  };

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
          {displayMode === "list" ? null : (
            <label style={{ marginRight: "1rem" }}>
              <input type="checkbox" onChange={toggleColumnWidth} checked={columnWidth === 200} style={{ marginRight: "1rem" }} /> {t("view-tasks-list")}
            </label>
          )}
          {displayMode === "list"
            ? renderTaskList()
            : tasks.length > 0 && (
                <Gantt
                  tasks={tasks}
                  viewMode={viewMode}
                  onClick={""}
                  onDateChange={handleDateChange}
                  onProgressChange={""}
                  onDoubleClick={handleTaskClick}
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
      <ModalTask
        mode={mode}
        isOpen={isTaskModalOpen}
        toggle={toggleModal}
        title={mode === "create" ? t("create-task") : mode === "edit" ? t("edit-task") : t("view-task")}
        edit={""}
        id={id}
        token={token}
        trigger={() => triggerUpdate()}
        setMode={handleSetMode}
        task={selectedTask}
      />
    </>
  );
};

export default GanttChart;
