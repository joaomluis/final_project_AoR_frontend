import { Api } from "../api";
import { Link } from "react-router-dom";

import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardHeader, CardFooter, Badge, Row, Col } from "reactstrap";
import { tsuccess, terror, twarn } from "../components/toasts/message-toasts.jsx";
import PopoverComponent from "../components/tags/tag-popover-component.jsx";
import { useUserStore } from "../components/stores/useUserStore.js";
import useFilterStore from "../components/stores/useFilterStore.js";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import UserCardList from "../components/User_cards/user-cards-list.jsx";
import { useEffect } from "react";
import ModalFilter from "../components/modals/modal-filter.jsx";
import ListLayout from "../layout/list-layout/list.jsx";

function UserList() {
  const token = useUserStore((state) => state.token);
  const { t } = useTranslation();
  const { userFilters, setUserFilters } = useFilterStore();
  const [loading, setLoading] = useState(true);
  //Modal Order & Filter
  const [ModalFilters, setModalFilter] = useState(false);
  const [ModalOrders, setModalOrder] = useState(false);
  const toggleFilter = () => setModalFilter(!ModalFilters);
  const toggleOrder = () => setModalOrder(!ModalOrders);

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
  const handleInterestsChange = (selected) => handleSelectionChange(selected, interests, setInterests);
  const handleSkillsChange = (selected) => handleSelectionChange(selected, skills, setSkills);
  const handleLabsChange = (selected) => handleSelectionChange(selected, labs, setLabs);
  /**
   * Filters to be displayed in the modal filter
   */
  const filters = [
    { label: "interests", options: interests, handleOnChange: handleInterestsChange },
    { label: "skills", options: skills, handleOnChange: handleSkillsChange },
    { label: "labs", options: labs, handleOnChange: handleLabsChange },
  ];

  /**
   * getFilterOptions
   */
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

  function getSelectedField(array, field) {
    return array.filter((item) => item.selected).map((item) => item[field]);
  }

  /**
   * Method to apply the filters
   */
  async function applyFilters() {
    const interestsArray = getSelectedField(interests, "name");
    const skillsArray = getSelectedField(skills, "name");
    const labsArray = getSelectedField(labs, "name");

    const interestsID = getSelectedField(interests, "id");
    const skillsID = getSelectedField(skills, "id");
    const labsID = getSelectedField(labs, "id");

    const props = {
      dtoType: "UserCardDto",
      interest: interestsArray,
      skill: skillsArray,
      lab: labsArray,
    };

    const propsID = {
      interests: interestsID,
      skills: skillsID,
      labs: labsID,
    };

    setUserFilters(propsID);

    try {
      const response = await Api.getUsers(token, props);
      setUsers(response.data.results);
      setLoading(false);
      setModalFilter(false);
      console.log(response.data.totalPages);
    } catch (error) {
      terror("Error", error.message);
    }
  }

  useEffect(() => {
    getFilterOptions();
    applyFilters();
  }, []);

  return (
    <ListLayout title={t("users")} toggleOrder={toggleOrder} toggleFilter={toggleFilter} loading={loading}>
      <Row>
        {users.map((user) => (
          <Col sm="12" md="6" lg="4" key={user.id} className="mt-4">
            <UserCardList User={user} />
          </Col>
        ))}
      </Row>
      <ModalFilter isOpen={ModalFilters} toggle={toggleFilter} title={t("filter")} filters={filters} onSubmit={applyFilters} selected={userFilters} />
    </ListLayout>
  );
}

export default UserList;
