import { Container, Col, Row, Card, CardBody, CardTitle, Input, Label, Button } from "reactstrap";
import { Api } from "../api";
import { tsuccess, terror, twarn } from "../components/toasts/message-toasts.jsx";
import { useUserStore } from "../components/stores/useUserStore.js";
import useFilterStore from "../components/stores/useFilterStore.js";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ProjectCardList from "../components/Project_cards/project-cards-list.jsx";
import { useEffect } from "react";
import ModalFilter from "../components/modals/modal-filter.jsx";
import ListLayout from "../layout/list-layout/list.jsx";
import PaginationComponent from "../components/pagination/pagination.jsx";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function ProjectList() {
  const token = useUserStore((state) => state.token);
  const { t } = useTranslation();
  const { projectFilters, setProjectFilters } = useFilterStore();
  const [loading, setLoading] = useState(true);
  //Modal Order & Filter
  const [ModalFilters, setModalFilter] = useState(false);
  const [ModalOrders, setModalOrder] = useState(false);
  const toggleFilter = () => setModalFilter(!ModalFilters);
  const toggleOrder = () => setModalOrder(!ModalOrders);
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [skills, setSkills] = useState([]);
  const [labs, setLabs] = useState([]);
  const [filterIds, setFilterIds] = useState({});

  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLabs, setSelectedLabs] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const query = new URLSearchParams(useLocation().search);

  /**
   * Function to handle the selection change in the filters
   * @param {*} selected
   * @param {*} items
   * @param {*} setItems
   * @returns
   */
  const handleSelectionChange = (selected, items, setItems, param, currentPage) => {
    const selectedNumbers = selected.map(Number);
    const newItems = [];
    const selectedItems = [];
    const selectedItemsId = [];

    items.forEach((item) => {
      const isSelected = selectedNumbers.includes(item.id);
      newItems.push({ ...item, selected: isSelected });
      if (isSelected) {
        console.log(item.name);
        console.log(item.id);
        selectedItems.push(item.name);
        selectedItemsId.push(item.id);
      }
    });

    //update URL
    query.set(param, selectedItems.join(","));
    navigate(`?${query.toString()}`);
    query.set("page", currentPage); // Adicionando a página atual na URL

    //delete param if no items are selected
    if (selectedItems.length === 0) {
      query.delete(param);
      navigate(`?${query.toString()}`);
    }

    console.log(selectedItems);
    console.log(selectedItemsId);
    setItems(selectedItems);
    setFilterIds((prevState) => ({ ...prevState, [param]: selectedItemsId }));

    return selectedItemsId.map((id, index) => ({ id, name: selectedItems[index] }));
  };

  /**
   * Methods to handle the changes in the filters
   * @param {*} selected
   * @returns
   */
  const handleStatusChange = (selected) => handleSelectionChange(selected, status, setSelectedStatus, "status", currentPage);
  const handleKeywordsChange = (selected) => handleSelectionChange(selected, keywords, setSelectedKeywords, "keywords", currentPage);
  const handleSkillsChange = (selected) => handleSelectionChange(selected, skills, setSelectedSkills, "skills", currentPage);
  const handleLabsChange = (selected) => handleSelectionChange(selected, labs, setSelectedLabs, "labs", currentPage);
  /**
   * Filters to be displayed in the modal filter
   */
  const filters = [
    { label: "status", options: status, handleOnChange: handleStatusChange },
    { label: "keywords", options: keywords, handleOnChange: handleKeywordsChange },
    { label: "skills", options: skills, handleOnChange: handleSkillsChange },
    { label: "labs", options: labs, handleOnChange: handleLabsChange },
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
      setLabs(response.data.labs);
    } catch (error) {
      terror(error.message);
    }
  }

  useEffect(() => {
    getFilterOptions();
  }, []);

  function getSelectedField(array, field) {
    return array.filter((item) => item.selected).map((item) => item[field]);
  }

  /**
   * Method to apply the filters
   */
  async function applyFilters() {
    const props = {
      dtoType: "ProjectCardDto",
      interest: selectedKeywords,
      skill: selectedSkills,
      lab: selectedLabs,
      status: selectedStatus,
      page_size: 9,
    };

    try {
      const response = await Api.getProjects(token, props);
      setProjects(response.data.results);
      console.log(response.data.totalPages);
      setLoading(false);
      setModalFilter(false);
    } catch (error) {
      terror(error.message);
    }
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);

    console.log("newPage", newPage);
    // Atualiza a URL com a nova página
    query.set("page", newPage);
    navigate(`?${query.toString()}`);
    if (newPage === 1) {
      query.delete("page");
      navigate(`?${query.toString()}`);
    }
  };

  return (
    <ListLayout title={t("projects")} toggleOrder={toggleOrder} toggleFilter={toggleFilter} loading={loading}>
      <Row>
        {projects.map((project, index) => (
          <Col sm="12" md="6" lg="4" key={index} className="mt-4">
            <ProjectCardList Project={project} />
          </Col>
        ))}
      </Row>
      <PaginationComponent currentPage={currentPage} totalPages={totalPages} setCurrentPage={handlePageChange} />
      <ModalFilter isOpen={ModalFilters} toggle={toggleFilter} title={t("filter")} filters={filters} onSubmit={applyFilters} selected={filterIds} />
    </ListLayout>
  );
}

export default ProjectList;
