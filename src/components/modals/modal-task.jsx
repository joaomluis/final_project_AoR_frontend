import React, { useState } from "react";
import ModalBase from "./modal-base";
import { useTranslation } from "react-i18next";
import FormInput from "../input/forminput";
import { Button, Form } from "react-bootstrap";
import Select from "react-select";

export function ModalTask(props) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("Geral");
  const changeTab = (tab) => {
    setActiveTab(tab);
  };
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.add) {
      // Lógica para criar tarefa
    } else if (props.edit) {
      // Lógica para editar tarefa
    }
    // Fechar modal após submissão
    props.toggle();
  };

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedExternalUsers, setExternalUsers] = useState([]);
  // Definição de usersForm como uma função interna
  const usersForm = () => {
    const userOptions = [
      { value: "user1", label: "User 1" },
      { value: "user2", label: "User 2" },
      { value: "user3", label: "User 3" },
      // Adicione mais usuários conforme necessário
    ];

    const handleChange = (selectedOptions) => {
      setSelectedUsers(selectedOptions || []);
    };

    return (
      <div>
        <div>{t("member-user")}</div>
        <Select
          isMulti
          name="users"
          options={userOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleChange}
          value={selectedUsers}
        />
      </div>
    );
  };

  const externalUsersEntitiesForm = () => {
    const externalUserOptions = [
      { value: "user1ex", label: "User 1ex" },
      { value: "user2ex", label: "User 2ex" },
      { value: "user3ex", label: "User 3ex" },
      // Adicione mais usuários conforme necessário
    ];

    const handleChange = (selectedOptions) => {
      setExternalUsers(selectedOptions || []);
    };

    return (
      <div>
        <div>{t("external-member-user")}</div>
        <Select
          isMulti
          name="external-users"
          options={externalUserOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleChange}
          value={selectedExternalUsers}
        />
      </div>
    );
  };

  const taskForm = () => {
    const taskOptions = [
      { value: "task1", label: "Task 1" },
      { value: "task2", label: "Task 2" },
      { value: "task3", label: "Task 3" },
      // Adicione mais tarefas conforme necessário
    ];

    const handleTasksChange = (selectedOptions) => {
      setSelectedTasks(selectedOptions);
    };

    return (
      <div>
        <div>{t("dependency-task")}</div>
        <Select
          isMulti
          name="tasks"
          options={taskOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleTasksChange}
          value={selectedTasks}
        />
        {/* Lógica para adicionar/remover tasks */}
      </div>
    );
  };

  const geralForm = (
    <div>
      <FormInput
        label={t("Title")}
        placeholder="t"
        type="text"
        required
        value={taskData.title}
        setValue={(value) => setTaskData({ ...taskData, title: value })}
      />
      <FormInput
        label={t("description")}
        placeholder="d"
        type="textarea"
        required
        value={taskData.description}
        setValue={(value) => setTaskData({ ...taskData, description: value })}
      />
      <FormInput
        label={t("intial-date")}
        type="date"
        required
        value={taskData.initialDate}
        setValue={(value) => setTaskData({ ...taskData, initialDate: value })}
      />
      <FormInput
        label={t("final-date")}
        type="date"
        required
        value={taskData.finalDate}
        setValue={(value) => setTaskData({ ...taskData, finalDate: value })}
      />

      {usersForm()}
      {externalUsersEntitiesForm()}
      {taskForm()}
    </div>
  );

  return (
    <ModalBase isOpen={props.isOpen} toggle={props.toggle} title={props.title} footer={props.footer}>
      {props.add && <button onClick={() => props.toggle()}>Criar Tarefa</button>}
      {/* {props.edit && <button onClick={() => props.toggle()}>Editar Tarefa</button>} */}

      <div>{geralForm}</div>

      <Button className="mt-3 mb-0" onClick={""} variant="secondary" style={{ width: "100%" }}>
        {props.edit ? t("edit-task") : t("create-task")}
      </Button>
    </ModalBase>
  );
}
