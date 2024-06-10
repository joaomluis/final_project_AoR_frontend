import { Container, Col, Row, Card, CardBody, CardTitle, Input, Label, Button } from "reactstrap";
import { Api } from "../api";
import { tsuccess, terror, twarn } from "../components/toasts/message-toasts.jsx";
import { useUserStore } from "../components/stores/useUserStore.js";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ProjectCardList from "../components/Project_cards/project-cards-list.jsx";
import { useEffect } from "react";
import ModalFilter from "../components/modals/modal-filter.jsx";
import ListLayout from "../layout/list-layout/list.jsx";
function ProjectList() {
  const token = useUserStore((state) => state.token);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  //Modal Order & Filter
  const [ModalFilters, setModalFilter] = useState(false);
  const [ModalOrders, setModalOrder] = useState(false);
  const toggleFilter = () => setModalFilter(!ModalFilters);
  const toggleOrder = () => setModalOrder(!ModalOrders);

  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [skills, setSkills] = useState([]);

  /**
   * Function to handle the selection change in the filters
   * @param {*} selected
   * @param {*} items
   * @param {*} setItems
   * @returns
   */
  const handleSelectionChange = (selected, items, setItems) => {
    const newItems = items.map((item) => ({
      ...item,
      selected: selected.map(Number).includes(item.id),
    }));
    setItems(newItems);
    const filteredItems = newItems.filter((item) => selected.map(Number).includes(item.id));
    return filteredItems.map((item) => item.name);
  };

  /**
   * Methods to handle the changes in the filters
   * @param {*} selected
   * @returns
   */
  const handleStatusChange = (selected) => handleSelectionChange(selected, status, setStatus);
  const handleKeywordsChange = (selected) => handleSelectionChange(selected, keywords, setKeywords);
  const handleSkillsChange = (selected) => handleSelectionChange(selected, skills, setSkills);

  /**
   * Filters to be displayed in the modal filter
   */
  const filters = [
    { label: t("status"), options: status, handleOnChange: handleStatusChange },
    { label: t("keywords"), options: keywords, handleOnChange: handleKeywordsChange },
    { label: t("skills"), options: skills, handleOnChange: handleSkillsChange },
  ];

  /**
   * Method to get the filter options from the API
   */
  async function getFilterOptions() {
    try {
      const response = await Api.getFilterOptions(token);
      setKeywords(response.data.interests);
      setSkills(response.data.skills);
      setStatus(response.data.statuses);
    } catch (error) {
      terror(error.message);
    }
  }

  /**
   * Method to apply the filters
   */
  async function applyFilters() {
    const keywordsArray = keywords.filter((item) => item.selected).map((item) => item.name);
    const skillsArray = skills.filter((item) => item.selected).map((item) => item.name);
    const statusArray = status.filter((item) => item.selected).map((item) => item.name);

    const props = {
      dtoType: "ProjectCardDto",
      interest: keywordsArray,
      skills: skillsArray,
      status: statusArray,
    };

    try {
      const response = await Api.getProjects(token, props);
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      terror(error.message);
    }
  }

  useEffect(() => {
    applyFilters();
    getFilterOptions();
  }, []);

  return (
    <ListLayout title={t("projects")} toggleOrder={toggleOrder} toggleFilter={toggleFilter} loading={loading}>
      <Row>
        {projects.map((project, index) => (
          <Col sm="12" md="6" lg="4" key={index} className="mt-4">
            <ProjectCardList Project={project} />
          </Col>
        ))}
      </Row>
      <ModalFilter isOpen={ModalFilters} toggle={toggleFilter} title={t("filter")} filters={filters} onSubmit={applyFilters} />
    </ListLayout>
  );
}

export default ProjectList;
