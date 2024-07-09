import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useReactToPrint } from "react-to-print";
import { FaChartPie, FaChartBar, FaUsers, FaClock } from "react-icons/fa";

import { Form, FormGroup, Label, Input, Button, Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { Api } from "../../api.js";
import { useUserStore } from "../../stores/useUserStore.js";
import "./settings-page.css";
import { terror, tsuccess } from "../toasts/message-toasts.jsx";
import { use } from "i18next";
import { parse } from "qs";
const SettingsPage = () => {
  const { t } = useTranslation();
  const [timeout, setTimeout] = useState(0);
  const [lab, setLab] = useState("");
  const [labLabel, setLabLabel] = useState("");
  const [statistics, setStatistics] = useState({
    finishedProjects: 0,
    inProgressProjects: 0,
    totalProjects: 0,
    readyProjects: 0,
    cancelledProjects: 0,
    percentageApproved: 0,
    percentageCancelled: 0,
    percentageFinished: 0,
    averageParticipants: 0,
    averageExecutionTime: 0,
  });
  const [labs, setLabs] = useState([]);
  const token = useUserStore((state) => state.token);
  const contentDocument = useRef();

  const handlePrint = useReactToPrint({
    content: () => contentDocument.current,
  });

  useEffect(() => {
    // Fetch available labs and user settings
    async function fetchLabs() {
      try {
        const response = await Api.getStatisticsByLab(token);
        console.log(response);
        setTimeout(response.data.timeout);
        setLabs(response.data.labs);
        if (response.data.statistics) {
          setStatistics(response.data.statistics);
        }
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLabs();
  }, [token]);

  const handleTimeoutChange = (e) => {
    console.log(e.target.value);
    setTimeout(e.target.value);
  };

  //convert lab id to lab name
  const getLabName = (labId) => {
    const id = parseInt(labId);
    console.log(labId);
    const lab = labs.find((lab) => lab.id === id);
    return lab ? lab.location : "";
  };

  const handleLabChange = (e) => {
    setLab(e.target.value);
    fetchStatistics(e.target.value);
    setLabLabel(getLabName(e.target.value));
  };

  const fetchStatistics = async (lab) => {
    console.log(lab);
    const params = {
      lab: lab,
    };
    try {
      const response = await Api.getStatisticsByLab(token, params);
      if (response.data.statistics) {
        setStatistics(response.data.statistics);
      } else {
        setStatistics({
          finishedProjects: 0,
          inProgressProjects: 0,
          totalProjects: 0,
          readyProjects: 0,
          cancelledProjects: 0,
          percentageApproved: 0,
          percentageCancelled: 0,
          percentageFinished: 0,
          averageParticipants: 0,
          averageExecutionTime: 0,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.updateTimeout(token, timeout);
      tsuccess(t("timeout-updated-successfully"));
    } catch (error) {
      console.error(error);
      terror(t("timeout-updated-error"));
    }
  };

  const pieData = [
    { name: t("completed"), value: statistics.percentageFinished || 0 },
    { name: t("approved"), value: statistics.percentageApproved || 0 },
    {
      name: t("ready"),
      value: statistics.percentageApproved || 0,
      // value: 100 - ((statistics.percentageFinished || 0) + (statistics.percentageApproved || 0) + (statistics.percentageCancelled || 0)),
    },
    { name: t("cancelled"), value: statistics.percentageCancelled || 0 },
  ];

  const COLORS = ["var(--finished)", "var(--in-progress)", "var(--planning)", "var(--cancelled)"];

  return (
    <div>
      <Col lg="12">
        <Row>
          <Col lg="12">
            <Card className="mb-4">
              <CardBody>
                <CardTitle tag="h5">{t("user-timeout-settings")}</CardTitle>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="timeout">{t("timeout-minutes")}</Label>
                    <Input type="number" name="timeout" id="timeout" value={timeout} onChange={handleTimeoutChange} min="1" />
                  </FormGroup>
                  <Button type="submit" color="primary">
                    {t("update-timeout")}
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6">
            <Card className="mb-4">
              <CardBody>
                <CardTitle tag="h5">{t("select-Laboratory")}</CardTitle>
                <FormGroup>
                  <Label for="lab">{t("lab")}</Label>
                  <Input type="select" name="lab" id="lab" value={lab} onChange={handleLabChange}>
                    <option value="">{t("select-a-lab")}</option>
                    {labs.map((lab) => (
                      <option key={lab.id} value={lab.id}>
                        {lab.location}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Col>

      <Button onClick={handlePrint} className="mb-4">
        {t("download-pdf")}
      </Button>

      <div className="printer" ref={contentDocument}>
        {statistics && (
          <>
            <header className="dashboard-header">
              <h1>
                {labLabel} {t("statistics")}
              </h1>
            </header>
            <Row className="mb-4">
              <Col sm="6">
                <Card className="shadow-sm">
                  <CardBody>
                    <div className="card-icon">
                      <FaUsers />
                    </div>
                    <CardTitle tag="h5">{t("avg-users-project")}</CardTitle>
                    <h2>{statistics.averageParticipants}</h2>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="6">
                <Card className="shadow-sm">
                  <CardBody>
                    <div className="card-icon">
                      <FaClock />
                    </div>
                    <CardTitle tag="h5">{t("avg-execution-time")}</CardTitle>
                    <h2>
                      {statistics.averageExecutionTime} {t("days")}
                    </h2>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col sm="12" md="6">
                <Card className="shadow-sm">
                  <CardBody>
                    <CardTitle tag="h5">
                      <FaChartPie /> {t("project-status-distribution")}
                    </CardTitle>
                    <div className="d-flex justify-content-center">
                      <PieChart width={300} height={300}>
                        <Pie data={pieData} cx={150} cy={150} labelLine={false} label outerRadius={100} fill="#8884d8" dataKey="value">
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </div>
                    <div className="text-center mt-4">
                      {pieData.map((entry, index) => (
                        <span key={index} className="legend">
                          <span className="legend-color" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                          {t(entry.name)}
                        </span>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12" md="6">
                <Card className="shadow-sm">
                  <CardBody>
                    <CardTitle tag="h5">
                      <FaChartBar /> {t("projects-by-status")}
                    </CardTitle>
                    <div className="d-flex justify-content-center">
                      <BarChart
                        width={300}
                        height={300}
                        data={[
                          { name: t("ready"), count: statistics.readyProjects || 0 },
                          { name: t("in-progress"), count: statistics.inProgressProjects || 0 },
                          { name: t("finished"), count: statistics.finishedProjects || 0 },
                          { name: t("cancelled"), count: statistics.cancelledProjects || 0 },
                        ]}
                        margin={{ top: 10, right: 5, left: 20, bottom: 1 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="var(--secondary-color)" />
                      </BarChart>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
