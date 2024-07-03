import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Container } from "reactstrap";
import FormInput from "../input/forminput.jsx";
import { Api } from "../../api";
import { useUserStore } from "../../stores/useUserStore.js";
import { tinfo, tsuccess } from "../toasts/message-toasts.jsx";
import { set } from "date-fns";
import useLogStore from "../../stores/useLogStore.js";

function TaskFormModal({ id, addCreatedLog }) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [note, setNote] = useState("");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const token = useUserStore((state) => state.token);
  const addLog = useLogStore((state) => state.addLog);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    createNote();
  };

  async function createNote() {
    const props = {
      id: task ? task : null,
      note: note,
    };

    if (note === "" || note.length < 1 || note.trim() === "") {
      tinfo("Please fill in the note field");
      return;
    }

    try {
      const response = await Api.createNote(token, id, props);
      tsuccess(response.data);
      addLog(response.data);

      handleClose();
      setNote("");
      setTask("");
    } catch (error) {
      console.log(error.message);
    }
  }

  async function fetchTasks() {
    const props = {
      dtoType: "IdNameDto",
    };
    try {
      const response = await Api.getTasksByDto(token, id, props);
      setTasks(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <>
      <Container>
        <Row>
          <Col lg="10" md="8" sm="6"></Col>
          <Col lg="2" md="4" sm="6" style={{}}>
            <Button className="mt-3 mb-0" onClick={handleShow} variant="secondary" style={{ width: "100%" }}>
              {t("Add-note")}
            </Button>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("Add-note")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <FormInput
              label={t("Task")}
              placeholder={t("no-task-selected")}
              type="select"
              required={true}
              value={task}
              setValue={setTask}
              data={tasks}
              disabled={false}
            />
            <FormInput label={t("note")} placeholder={t("")} type="textarea" required={false} value={note} setValue={setNote} />
            <div style={{ textAlign: "right" }}>
              <Button variant="primary" type="submit" style={{ marginRight: "10px" }}>
                {t("save")}
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                {t("close")}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TaskFormModal;
