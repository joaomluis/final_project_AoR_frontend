import React, { useEffect, useState } from "react";
import ModalBase from "./modal-base";
import { useTranslation } from "react-i18next";
import { Button, Form } from "react-bootstrap";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { Api } from "../../api.js";
import { terror, tsuccess } from "../toasts/message-toasts.jsx";

export function ModalTask(props) {
  const { t } = useTranslation();

  const [taskUsers, setTaskUsers] = useState([]);
  const [taskExternalUsers, setTaskExternalUsers] = useState([]);
  const [taskTasks, setTaskTasks] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedExternalUsers, setExternalUsers] = useState([]);
  const [selectedResponsible, setSelectedResponsible] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const initialDate = today.toISOString().split("T")[0];
  const finalDate = tomorrow.toISOString().split("T")[0];
  const [taskData, setTaskData] = useState({
    projectId: props.id,
    title: "",
    description: "",
    finalDate: finalDate,
    initialDate: initialDate,
    usersIds: [],
    responsibleId: "",
    additionalExecutorsNames: [],
    dependentTasksIds: [],
    status: null,
  });

  const statusOptions = [
    { label: "PLANNED", value: 10 },
    { label: "IN_PROGRESS", value: 30 },
    { label: "FINISHED", value: 50 },
  ];

  async function fetchData() {
    try {
      const response = await Api.getTasksForProject(props.token, props.id);
      const data = response.data;
      setTaskUsers(data.users);

      setTaskExternalUsers(data.executors);
      setTaskTasks(data.dependentTasks);
      setSelectedStatus(statusOptions.find((s) => s.label === props.task?.status));
    } catch (e) {
      console.log(e);
    }
  }

  // Sync the state with the props.task when props.task or props.mode changes
  useEffect(() => {
    fetchData();
    if (props.task && props.mode !== "create") {
      console.log("Task:", props.task);
      const task = props.task;
      const uniqueMembers = task.membersOfTask;
      // Separar membros e responsáveis
      const responsible = uniqueMembers.find((user) => user.type === "RESPONSIBLE");
      const members = uniqueMembers.filter((user) => user.type === "MEMBER");

      // o responsible nunca pode aparecer no dropdown de membros

      setTaskData({
        projectId: task.projectTask.id || props.id,
        title: task.title || "",
        description: task.description || "",
        finalDate: task.finalDate ? task.finalDate.split("T")[0] : finalDate,
        initialDate: task.initialDate ? task.initialDate.split("T")[0] : initialDate,
        usersIds: members.map((user) => user.id),
        responsibleId: responsible?.id || "",
        additionalExecutorsNames: task.additionalMembersOfTask ? task.additionalMembersOfTask.map((member) => member.name) : [],
        dependentTasksIds: task.dependentTasks ? task.dependentTasks.map((depTask) => depTask.id) : [],
        status: statusOptions.find((s) => s.label === task.status)?.value || null,
      });
      console.log("Task Data:", taskData.status);

      setSelectedUsers(members.map((user) => ({ label: user.name, value: user.id })));
      setSelectedResponsible(responsible ? { label: responsible.name, value: responsible.id } : null);
      setExternalUsers(task.additionalMembersOfTask ? task.additionalMembersOfTask.map((member) => ({ label: member.name, value: member.id })) : []);
      setSelectedTasks(task.dependentTasks ? task.dependentTasks.map((depTask) => ({ label: depTask.title, value: depTask.id })) : []);
    } else {
      resetForm();
    }
  }, [props.task, props.mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Task Data:asdasdasdasd", taskData);
      if (props.mode === "edit") {
        await Api.updateTask(props.token, props.task.id, taskData);
        console.log(taskData);

        tsuccess("Task updated successfully");
      } else {
        await Api.createTask(props.token, taskData);
        tsuccess("Task created successfully");
      }
      resetForm();
      fetchData(); // atualiza as options dos selects
      props.trigger(); // atualiza o gantt
    } catch (e) {}
    props.toggle();
  };

  const handleDeleteTask = async () => {
    try {
      console.log("Task Data:", props.task.id);
      await Api.deleteTask(props.token, props.task.id);
      tsuccess("Task deleted successfully");
      resetForm();
      fetchData(); // atualiza as options dos selects
      props.trigger(); // atualiza o gantt
    } catch (e) {
      terror("Error deleting task");
    }
    props.toggle();
  };

  const resetForm = () => {
    setTaskData({
      projectId: props.id,
      title: "",
      description: "",
      finalDate: finalDate,
      initialDate: initialDate,
      usersIds: [],
      responsibleId: "",
      additionalExecutorsNames: [],
      dependentTasksIds: [],
    });
    setExternalUsers([]);
    setSelectedUsers([]);
    setSelectedTasks([]);
    setSelectedResponsible(null);
  };

  const handleUsersChange = (selectedOptions) => {
    setSelectedUsers(selectedOptions || []);
    setTaskData((prev) => ({
      ...prev,
      usersIds: selectedOptions ? selectedOptions.map((user) => user.value) : [],
    }));
  };

  const handleResponsibleChange = (selectedOption) => {
    setSelectedResponsible(selectedOption);
    setTaskData((prev) => ({
      ...prev,
      responsibleId: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleExternalUsersChange = (selectedOptions) => {
    setExternalUsers(selectedOptions || []);
    setTaskData((prev) => ({
      ...prev,
      additionalExecutorsNames: selectedOptions ? selectedOptions.map((user) => user.label) : [],
    }));
  };

  const handleExternalUserCreate = (inputValue) => {
    const newValue = { value: `new-${selectedExternalUsers.length + 1}`, label: inputValue };
    const updatedSelectedUsers = [...selectedExternalUsers, newValue];
    setExternalUsers(updatedSelectedUsers);
    setTaskData((prev) => ({
      ...prev,
      additionalExecutorsNames: updatedSelectedUsers.map((user) => user.label),
    }));
  };

  const handleTasksChange = (selectedOptions) => {
    setSelectedTasks(selectedOptions);
    setTaskData((prev) => ({
      ...prev,
      dependentTasksIds: selectedOptions ? selectedOptions.map((task) => task.value) : [],
    }));
  };

  const handleStatusChange = (selectedOption) => {
    setSelectedStatus(selectedOption);
    setTaskData((prev) => ({
      ...prev,
      status: selectedOption ? selectedOption.value : "",
    }));
  };

  const renderFormInput = (label, value, type, name) => (
    <div className="mb-3">
      <Form.Label>{label}</Form.Label>
      {props.mode === "view" ? (
        <div>{value}</div>
      ) : (
        <Form.Control
          type={type}
          name={name}
          value={value}
          onChange={(e) => setTaskData({ ...taskData, [name]: e.target.value })}
          readOnly={props.mode === "view"}
        />
      )}
    </div>
  );

  const renderSelect = (label, options, value, onChange, isMulti = false, isCreatable = false, handleExternalUserCreate) => {
    const SelectComponent = isCreatable ? CreatableSelect : Select;
    return (
      <div className="mb-3">
        <Form.Label>{label}</Form.Label>
        {props.mode === "view" ? (
          <div>{isMulti ? value.map((v) => v.label).join(", ") : value?.label}</div>
        ) : (
          <SelectComponent
            isMulti={isMulti}
            name={label}
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={onChange}
            onCreateOption={isCreatable ? handleExternalUserCreate : undefined}
            value={value}
            isDisabled={props.mode === "view"}
          />
        )}
      </div>
    );
  };

  const geralForm = (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          {renderSelect(t("Status"), statusOptions, selectedStatus, handleStatusChange)}
          {renderFormInput(t("Title"), taskData.title, "text", "title")}
          {renderFormInput(t("description"), taskData.description, "textarea", "description")}
          {renderFormInput(t("initial-date"), taskData.initialDate, "date", "initialDate")}
          {renderFormInput(t("final-date"), taskData.finalDate, "date", "finalDate")}
        </div>
        <div className="col-md-6">
          {renderSelect(t("responsible-user"), taskUsers, selectedResponsible, handleResponsibleChange)}
          {renderSelect(t("member-user"), taskUsers, selectedUsers, handleUsersChange, true)}
          {renderSelect(t("external-executor"), taskExternalUsers, selectedExternalUsers, handleExternalUsersChange, true, true, handleExternalUserCreate)}
          {renderSelect(t("dependency-task"), taskTasks, selectedTasks, handleTasksChange, true)}
        </div>
      </div>
    </div>
  );

  return (
    <ModalBase isOpen={props.isOpen} toggle={props.toggle} title={props.title} footer={props.footer}>
      {props.add && <button onClick={() => props.toggle()}>Criar Tarefa</button>}
      <div>{geralForm}</div>
      {props.mode !== "view" ? (
        <>
          <Button className="mt-3 mb-0" onClick={handleSubmit} variant="secondary" style={{ width: "100%" }}>
            {props.mode === "edit" ? t("edit-task") : t("create-task")}
          </Button>
          <Button className="mt-2 mb-0" onClick={handleDeleteTask} variant="danger" size="sm" style={{ width: "auto", float: "left" }}>
            {t("delete-task")}
          </Button>
        </>
      ) : (
        <Button className="mt-3 mb-0" onClick={() => props.setMode("edit")} variant="secondary" style={{ width: "100%" }}>
          {t("edit-task")}
        </Button>
      )}
    </ModalBase>
  );
}
