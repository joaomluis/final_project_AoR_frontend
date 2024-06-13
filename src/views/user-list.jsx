import { Api } from "../api";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardHeader, CardFooter, Badge, Row, Col } from "reactstrap";
import { tsuccess, terror, twarn } from "../components/toasts/message-toasts.jsx";
import { useUserStore } from "../components/stores/useUserStore.js";
import useFilterStore from "../components/stores/useFilterStore.js";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import UserCardList from "../components/User_cards/user-cards-list.jsx";
import { useEffect } from "react";
import ModalFilter from "../components/modals/modal-filter.jsx";
import ListLayout from "../layout/list-layout/list.jsx";
import PaginationComponent from "../components/pagination/pagination.jsx";

function UserList() {
  const query = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();
  const token = useUserStore((state) => state.token);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  //Modal Order & Filter
  const [ModalFilters, setModalFilter] = useState(false);
  const [ModalOrders, setModalOrder] = useState(false);
  const toggleFilter = () => setModalFilter(!ModalFilters);
  const toggleOrder = () => setModalOrder(!ModalOrders);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLabs, setSelectedLabs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterIds, setFilterIds] = useState({});

  /* filter options */
  const [users, setUsers] = useState([]);
  const [interests, setInterests] = useState([]);
  const [skills, setSkills] = useState([]);
  const [labs, setLabs] = useState([]);
  /**
   * Function to handle the selection change in the filters
   * @param {*} selected
   * @param {*} items
   * @param {*} setItems
   * @returns
   */
  // const handleSelectionChange = (selected, items, setItems) => {
  //   const newItems = items.map((item) => ({
  //     ...item,
  //     selected: selected.map(Number).includes(item.id),
  //   }));
  //   setItems(newItems);
  //   const filteredItems = newItems.filter((item) => selected.map(Number).includes(item.id));
  //   return filteredItems.map((item) => item.name);
  // };

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
  const handleInterestsChange = (selected) => handleSelectionChange(selected, interests, setSelectedInterests, "interests", currentPage);
  const handleSkillsChange = (selected) => handleSelectionChange(selected, skills, setSelectedSkills, "skills", currentPage);
  const handleLabsChange = (selected) => handleSelectionChange(selected, labs, setSelectedLabs, "labs", currentPage);
  /**
   * Filters to be displayed in the modal filter
   */
  const filters = [
    { label: "interests", options: interests, handleOnChange: handleInterestsChange },
    { label: "skills", options: skills, handleOnChange: handleSkillsChange },
    { label: "labs", options: labs, handleOnChange: handleLabsChange },
  ];
  /**
   * Method to apply the filters
   */
  async function applyFilters() {
    const props = {
      dtoType: "UserCardDto",
      interest: selectedInterests,
      skill: selectedSkills,
      lab: selectedLabs,
      page_size: 9,
      page_number: currentPage,
    };

    try {
      const response = await Api.getUsers(token, props);
      setUsers(response.data.results);
      setTotalPages(response.data.totalPages);
      setLoading(false);
      setModalFilter(false);
      // Include all filters in the URL
    } catch (error) {
      terror("Error", error.message);
    }
  }

  /**
   * getFilterOptions
   */
  useEffect(() => {
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
    getFilterOptions();
  }, []);

  /**
   * If the total pages change, the current page will be set to 1, to avoid black pages
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [totalPages]);

  // /**
  //  * function to get the selected fields, to reuse the code for name and id.
  //  * @param {*} array
  //  * @param {*} field
  //  * @returns
  //  */
  // function getSelectedField(array, field) {
  //   return array.filter((item) => item.selected).map((item) => item[field]);
  // }

  /**
   * update the cards when the filters change or the page change
   */
  useEffect(() => {
    applyFilters();
  }, [currentPage]);

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
    <ListLayout title={t("users")} toggleOrder={toggleOrder} toggleFilter={toggleFilter} loading={loading}>
      <Row>
        {users.map((user) => (
          <Col sm="12" md="6" lg="4" key={user.id} className="mt-4">
            <UserCardList User={user} />
          </Col>
        ))}
      </Row>

      <PaginationComponent currentPage={currentPage} totalPages={totalPages} setCurrentPage={handlePageChange} />
      <ModalFilter isOpen={ModalFilters} toggle={toggleFilter} title={t("filter")} filters={filters} onSubmit={applyFilters} selected={filterIds} />
    </ListLayout>
  );
}

export default UserList;
