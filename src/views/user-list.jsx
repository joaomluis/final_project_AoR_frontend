import { Api } from "../api";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardHeader, CardFooter, Badge, Row, Col } from "reactstrap";
import { tsuccess, terror, twarn } from "../components/toasts/message-toasts.jsx";
import { useUserStore } from "../stores/useUserStore.js";
import useFilterStore from "../stores/useFilterStore.js";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import UserCardList from "../components/User_cards/user-cards-list.jsx";
import { useEffect } from "react";
import ModalFilter from "../components/modals/modal-filter.jsx";
import ModalOrder from "../components/modals/modal-order.jsx";
import ListLayout from "../layout/list-layout/list.jsx";
import PaginationComponent from "../components/pagination/pagination.jsx";

function UserList() {
  const token = useUserStore((state) => state.token);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  //Modal Order & Filter
  const [ModalFilters, setModalFilter] = useState(false);
  const [ModalOrders, setModalOrder] = useState(false);
  const toggleFilter = () => setModalFilter(!ModalFilters);
  const toggleOrder = () => setModalOrder(!ModalOrders);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  /* filter options */
  const [users, setUsers] = useState([]);
  const [interests, setInterests] = useState([]);
  const [skills, setSkills] = useState([]);
  const [labs, setLabs] = useState([]);

  const location = useLocation();
  const [ids, setIds] = useState({ brands: [], types: [] });

  const [searchParams, setSearchParams] = useSearchParams({ page: 1, interests: [], skills: [], labs: [] });
  const interestParam = searchParams.get("interests") || [];
  const skillParam = searchParams.get("skills") || [];
  const labParam = searchParams.get("labs") || [];
  const pageParam = searchParams.get("page") || 1;
  const orderFieldParam = searchParams.get("field") || "";
  const orderDirectionParam = searchParams.get("direction") || "";

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
  const handleInterestsChange = (selected) => handleSelectionChange(selected, interests, setInterests, "interests");
  const handleSkillsChange = (selected) => handleSelectionChange(selected, skills, setSkills, "skills");
  const handleLabsChange = (selected) => handleSelectionChange(selected, labs, setLabs, "labs");
  /**
   * Filters to be displayed in the modal filter
   */
  const filters = [
    { label: "interests", options: interests, handleOnChange: handleInterestsChange },
    { label: "skills", options: skills, handleOnChange: handleSkillsChange },
    { label: "labs", options: labs, handleOnChange: handleLabsChange },
  ];
  const ofilters = [{ label: "username" }, { label: "firstname" }, { label: "privateProfile" }];

  async function getFilterOptions() {
    try {
      const response = await Api.getFilterOptions(token);
      setInterests(response.data.interests);
      setSkills(response.data.skills);
      setLabs(response.data.labs);
    } catch (error) {
      terror("Error", error.message);
    }
  }

  /**
   * Method to apply the filters
   */
  async function applyFilters() {
    const interest = interestParam.length > 0 ? interestParam.split(",") : [];
    const skill = skillParam.length > 0 ? skillParam.split(",") : [];
    const lab = labParam.length > 0 ? labParam.split(",") : [];

    const page = parseInt(pageParam, 10) || 1;
    const orderField = orderFieldParam;
    const orderDirection = orderDirectionParam;
    const props = {
      dtoType: "UserCardDto",
      interest: interest,
      skill: skill,
      lab: lab,
      page_size: 9,
      page_number: page,

      order_field: orderField,
      order_direction: orderDirection,
    };

    try {
      const response = await Api.getUsers(token, props);
      setUsers(response.data.results);
      setTotalPages(response.data.totalPages);
      console.log(response.data.totalPages);
      setLoading(false);
      setModalFilter(false);
      setModalOrder(false);
      // Include all filters in the URL
    } catch (error) {
      terror("Error", error.message);
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
    if (interestParam.length === 0) {
      searchParams.delete("interests");
    }
    if (skillParam.length === 0) {
      searchParams.delete("skills");
    }
    if (labParam.length === 0) {
      searchParams.delete("labs");
    }
    setSearchParams(searchParams);
  }, [location.search]);

  useEffect(() => {
    if (currentPage > totalPages) {
      searchParams.set("page", 1);
      setSearchParams(searchParams);
    }
  }, [totalPages]);

  return (
    <ListLayout title={t("users")} toggleOrder={toggleOrder} toggleFilter={toggleFilter} loading={loading}>
      <Row>
        {users.map((user) => (
          <Col sm="12" md="6" lg="4" key={user.id} className="mt-4">
            <UserCardList User={user} />
          </Col>
        ))}
      </Row>

      <PaginationComponent currentPage={currentPage} totalPages={totalPages} setCurrentPage={handlePageChange} />
      <ModalFilter isOpen={ModalFilters} toggle={toggleFilter} title={t("filter")} filters={filters} onSubmit={applyFilters} selected={ids} />
      <ModalOrder isOpen={ModalOrders} toggle={toggleOrder} title={t("order")} filters={ofilters} onSubmit={applyFilters} />
    </ListLayout>
  );
}

export default UserList;
