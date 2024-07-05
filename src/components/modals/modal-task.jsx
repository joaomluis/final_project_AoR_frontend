import React, { useEffect, useState } from "react";
import ModalBase from "./modal-base";
import { useTranslation } from "react-i18next";
import { Button, Form } from "react-bootstrap";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { Api } from "../../api.js";

export function ModalTask(props) {
  const { t } = useTranslation();

  const [taskUsers, setTaskUsers] = useState([]);
  const [taskExternalUsers, setTaskExternalUsers] = useState([]);
  const [taskTasks, setTaskTasks] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedExternalUsers, setExternalUsers] = useState([]);
  const [selectedResponsible, setSelectedResponsible] = useState(null);
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
  });

  // Sync the state with the props.task when props.task or props.mode changes
  useEffect(() => {
    if (props.task && props.mode !== "create") {
      const task = props.task;

      // Filtrar e remover duplicações
      const uniqueMembers = task.membersOfTask ? [...new Map(task.membersOfTask.map((user) => [user.id, user])).values()] : [];

      // Separar membros e responsáveis
      const members = uniqueMembers.filter((user) => user.type === "MEMBER");
      const responsible = uniqueMembers.find((user) => user.type === "RESPONSIBLE");

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
      });

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
      console.log("Task Data:", taskData);
      if (props.mode === "edit") {
        await Api.updateTask(props.token, props.task.id, taskData);
      } else {
        await Api.createTask(props.token, taskData);
      }
      resetForm();
      props.trigger();
    } catch (e) {
      console.log(e);
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

  const renderFormInput = (label, value, type) => (
    <div className="mb-3">
      <Form.Label>{label}</Form.Label>
      {props.mode === "view" ? (
        <div>{value}</div>
      ) : (
        <Form.Control
          type={type}
          value={value}
          onChange={(e) => setTaskData({ ...taskData, [type === "date" ? type : label.toLowerCase()]: e.target.value })}
          readOnly={props.mode === "view"}
        />
      )}
    </div>
  );

  const renderSelect = (label, options, value, onChange, isMulti = false, isCreatable = false) => {
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
            value={value}
            isDisabled={props.mode === "view"}
          />
        )}
      </div>
    );
  };

  const geralForm = (
    <div>
      {renderFormInput(t("Title"), taskData.title, "text")}
      {renderFormInput(t("description"), taskData.description, "textarea")}
      {renderFormInput(t("intial-date"), taskData.initialDate, "date")}
      {renderFormInput(t("final-date"), taskData.finalDate, "date")}
      {renderSelect(t("responsible-user"), taskUsers, selectedResponsible, handleResponsibleChange)}
      {renderSelect(t("member-user"), taskUsers, selectedUsers, handleUsersChange, true)}
      {renderSelect(t("external-executor"), taskExternalUsers, selectedExternalUsers, handleExternalUsersChange, true, true)}
      {renderSelect(t("dependency-task"), taskTasks, selectedTasks, handleTasksChange, true)}
    </div>
  );

  return (
    <ModalBase isOpen={props.isOpen} toggle={props.toggle} title={props.title} footer={props.footer}>
      {props.add && <button onClick={() => props.toggle()}>Criar Tarefa</button>}
      <div>{geralForm}</div>
      {props.mode !== "view" ? (
        <Button className="mt-3 mb-0" onClick={handleSubmit} variant="secondary" style={{ width: "100%" }}>
          {props.mode === "edit" ? t("edit-task") : t("create-task")}
        </Button>
      ) : (
        <Button className="mt-3 mb-0" onClick={() => props.setMode("edit")} variant="secondary" style={{ width: "100%" }}>
          {t("edit-task")}
        </Button>
      )}
    </ModalBase>
  );
}
