import React, { useEffect, useState } from "react";
import ModalBase from "./modal-base";
import { useTranslation } from "react-i18next";
import FormInput from "../input/forminput";
import { Button, Form } from "react-bootstrap";
import Select from "react-select";
import CreatableSelect from "react-select/creatable"; // Passo 1: Importar CreatableSelect

import { Api } from "../../api.js";

export function ModalTask(props) {
  const { t } = useTranslation();

  const [taskUsers, setTaskUsers] = useState({ label: "", value: "" });
  const [taskExternalUsers, setTaskExternalUsers] = useState({ label: "", value: "" });
  const [taskTasks, setTaskTasks] = useState({ label: "", value: "" });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedExternalUsers, setExternalUsers] = useState([]);
  const [selectedResponsible, setSelectedResponsible] = useState([]);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // 3. Adicionar 1 dia para obter a data de amanhã
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

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setTaskData((prev) => ({ ...prev, [name]: value }));
  // };

  const fetchData = async () => {
    try {
      const response = await Api.getTasksForProject(props.token, props.id);
      setTaskUsers(response.data.users);
      setTaskTasks(response.data.dependentTasks);
      setTaskExternalUsers(response.data.executors);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    async function createTask() {
      try {
        console.log("Task Data:", taskData);
        const response = await Api.createTask(props.token, taskData);
        fetchData();
        setTaskData({});
        setExternalUsers([]);
        setSelectedUsers([]);
        setSelectedTasks([]);
        setSelectedResponsible("");
        setTaskData({ initialDate: initialDate, finalDate: finalDate });
        props.trigger();
      } catch (e) {
        console.log(e);
      }
    }
    createTask();

    props.toggle();
  };

  useEffect(() => {
    console.log("ID:", props.id);
    console.log("Token:", props.token);

    // Llamar a la función asíncrona
    fetchData();
  }, [props.id, props.token]);

  // Definição de usersForm como uma função interna
  const usersForm = () => {
    const handleChange = (selectedOptions) => {
      setSelectedUsers(selectedOptions || []);
      setTaskData((prev) => ({ ...prev, usersIds: selectedOptions.map((user) => user.value) }));
    };

    return (
      <div>
        <div>{t("member-user")}</div>
        <Select
          isMulti
          name="users"
          options={taskUsers}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleChange}
          value={selectedUsers}
        />
      </div>
    );
  };

  const responsibleUser = () => {
    const handleChange = (selectedOptions) => {
      setSelectedResponsible(selectedOptions || []);
      setTaskData((prev) => ({ ...prev, responsibleId: selectedOptions.value }));
    };

    return (
      <div>
        <div>{t("responsible-user")}</div>
        <Select
          name="users"
          options={taskUsers}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleChange}
          value={selectedResponsible}
          required={true}
        />
      </div>
    );
  };

  const externalUsersEntitiesForm = () => {
    const handleChange = (selectedOptions) => {
      setExternalUsers(selectedOptions || []);
      setTaskData((prev) => ({ ...prev, additionalExecutorsNames: selectedOptions.map((user) => user.label) }));
    };

    const handleCreate = (inputValue) => {
      const newValue = { value: `new-${selectedExternalUsers.length + 1}`, label: inputValue };
      // Atualiza a lista de usuários selecionados para incluir o novo valor
      const updatedSelectedUsers = [...selectedExternalUsers, newValue];
      setExternalUsers(updatedSelectedUsers);
      // Atualiza o estado global ou relevante para incluir o novo usuário nas opções disponíveis
      // Esta etapa depende de como você está gerenciando `taskExternalUsers`
      // setTaskExternalUsers([...taskExternalUsers, newValue]); // Exemplo de atualização
      console.log("New Value:", newValue);
      // Garante que o novo usuário também seja refletido no estado de `additionalExecutorsNames`
      setTaskData((prev) => ({ ...prev, additionalExecutorsNames: updatedSelectedUsers.map((user) => user.label) }));
    };

    return (
      <div>
        <div>{t("external-executor")}</div>
        <CreatableSelect
          isMulti
          name="external-users"
          options={taskExternalUsers}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleChange}
          onCreateOption={handleCreate}
          value={selectedExternalUsers}
        />
      </div>
    );
  };

  const taskForm = () => {
    const handleTasksChange = (selectedOptions) => {
      setSelectedTasks(selectedOptions);
      setTaskData((prev) => ({ ...prev, dependentTasksIds: selectedOptions.map((task) => task.value) }));
    };

    return (
      <div>
        <div>{t("dependency-task")}</div>
        <Select
          isMulti
          name="tasks"
          options={taskTasks}
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
      {responsibleUser()}
      {usersForm()}
      {externalUsersEntitiesForm()}
      {taskForm()}
    </div>
  );

  return (
    <ModalBase isOpen={props.isOpen} toggle={props.toggle} title={props.title} footer={props.footer}>
      {props.add && <button onClick={() => props.toggle()}>Criar Tarefa</button>}

      <div>{geralForm}</div>

      <Button className="mt-3 mb-0" onClick={handleSubmit} variant="secondary" style={{ width: "100%" }}>
        {props.edit ? t("edit-task") : t("create-task")}
      </Button>
    </ModalBase>
  );
}
