import { Container, Col, Row, Card, CardBody, CardTitle, Input, Label, Button } from "reactstrap";
import { Api } from "../api";
import { tsuccess, terror, twarn } from "../components/toasts/message-toasts.jsx";
import { useUserStore } from "../stores/useUserStore.js";
import useFilterStore from "../stores/useFilterStore.js";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ProjectCardList from "../components/Project_cards/project-cards-list.jsx";
import { useEffect } from "react";
import ModalFilter from "../components/modals/modal-filter.jsx";
import ModalOrder from "../components/modals/modal-order.jsx";
import ListLayout from "../layout/list-layout/list.jsx";
import PaginationComponent from "../components/pagination/pagination.jsx";
import { useLocation, useSearchParams } from "react-router-dom";

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
  const [labs, setLabs] = useState([]);
  const [ids, setIds] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams({ page: 1, status: [], keywords: [], skills: [], labs: [] });
  const statusParam = searchParams.get("status") || [];
  const keywordParam = searchParams.get("keywords") || [];
  const skillParam = searchParams.get("skills") || [];
  const labParam = searchParams.get("labs") || [];
  const pageParam = searchParams.get("page") || 1;
  const orderFieldParam = searchParams.get("field") || "";
  const orderDirectionParam = searchParams.get("direction") || "";

  /**
   * Function to handle the selection change in the filters
   * @param {*} selected
   * @param {*} items
   * @param {*} setItems
   * @returns
   */
  const handleSelectionChange = (selected, items, setItems, paramName) => {
    const newItems = items.map((item) => ({
      ...item,
      selected: selected.map(Number).includes(item.id),
    }));
    setItems(newItems);
    const filteredItems = newItems.filter((item) => selected.map(Number).includes(item.id));

    const selectedIds = filteredItems.map((item) => item.id);
    // Update the respective array in the ids object
    setIds((prevState) => ({
      ...prevState,
      [paramName]: selectedIds,
    }));

    const selectedNames = filteredItems.map((item) => item.name);

    // Atualizar os parâmetros de consulta no URL
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(paramName, selectedNames.join(","));
    setSearchParams(newSearchParams);
  };

  /**
   * Methods to handle the changes in the filters
   * @param {*} selected
   * @returns
   */
  const handleStatusChange = (selected) => handleSelectionChange(selected, status, setStatus, "status");
  const handleKeywordsChange = (selected) => handleSelectionChange(selected, keywords, setKeywords, "keywords");
  const handleSkillsChange = (selected) => handleSelectionChange(selected, skills, setSkills, "skills");
  const handleLabsChange = (selected) => handleSelectionChange(selected, labs, setLabs, "labs");
  /**
   * Filters to be displayed in the modal filter
   */
  const filters = [
    { label: "status", options: status, handleOnChange: handleStatusChange },
    { label: "keywords", options: keywords, handleOnChange: handleKeywordsChange },
    { label: "skills", options: skills, handleOnChange: handleSkillsChange },
    { label: "labs", options: labs, handleOnChange: handleLabsChange },
  ];
  const ofilters = [{ label: "createdDate" }, { label: "status" }, { label: "vacancies" }];

  // useEffect(() => {
  //   if (order.filter && order.direction) {
  //     const sortedProjects = [...projects].sort((a, b) => {
  //       if (order.direction === "asc") {
  //         return a[order.filter] > b[order.filter] ? 1 : -1;
  //       } else {
  //         return a[order.filter] < b[order.filter] ? 1 : -1;
  //       }
  //     });

  //     setProjects(sortedProjects);
  //   }
  // }, [order]);

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

  /**
   * Method to apply the filters
   */
  async function applyFilters() {
    const skill = skillParam.length > 0 ? skillParam.split(",") : [];
    const keyword = keywordParam.length > 0 ? keywordParam.split(",") : [];
    const lab = labParam.length > 0 ? labParam.split(",") : [];
    const status = statusParam.length > 0 ? statusParam.split(",") : [];
    const page = parseInt(pageParam, 10) || 1;
    const orderField = orderFieldParam;
    const orderDirection = orderDirectionParam;
    const props = {
      dtoType: "ProjectCardDto",
      interest: keyword,
      skill: skill,
      lab: lab,
      status: status,
      page_size: 9,
      page_number: page,

      order_field: orderField, //TODO: criar um campo com nome de ordenação
      order_direction: orderDirection, //TODO: criar um campo para a direção da ordenação
    };
    console.log(props);

    try {
      const response = await Api.getProjects(token, props);
      setProjects(response.data.results);
      setTotalPages(response.data.totalPages);
      console.log(response.data.totalPages);
      console.log(response.data.results);
      setLoading(false);
      setModalFilter(false);
      setModalOrder(false);
    } catch (error) {
      terror(error.message);
    }
  }

  useEffect(() => {
    applyFilters();
    getFilterOptions();
  }, [token]);

  const handlePageChange = (newPage) => {
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setCurrentPage(parseInt(page, 10));
    }
    applyFilters();
  }, [pageParam]);

  //limpar os filtros quando não houver nada selecionado, ou for a primeira página
  useEffect(() => {
    if (parseInt(pageParam, 10) === 1) {
      searchParams.delete("page");
    }
    if (skillParam.length === 0) {
      searchParams.delete("skills");
    }
    if (keywordParam.length === 0) {
      searchParams.delete("keywords");
    }
    if (labParam.length === 0) {
      searchParams.delete("labs");
    }
    if (statusParam.length === 0) {
      searchParams.delete("status");
    }
    setSearchParams(searchParams);
  }, [location.search]);

  // useEffect(() => {
  //   if (currentPage > totalPages) {
  //     searchParams.set("page", 1);
  //     setSearchParams(searchParams);
  //   }
  // }, [totalPages]);

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
      <ModalFilter isOpen={ModalFilters} toggle={toggleFilter} title={t("filter")} filters={filters} onSubmit={applyFilters} selected={ids} />
      <ModalOrder isOpen={ModalOrders} toggle={toggleOrder} title={t("order")} filters={ofilters} onSubmit={applyFilters} />
    </ListLayout>
  );
}

export default ProjectList;
