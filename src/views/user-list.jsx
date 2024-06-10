import { Api } from "../api";
import { Link } from "react-router-dom";

import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardHeader, CardFooter, Badge, Row, Col } from "reactstrap";
import { tsuccess, terror, twarn } from "../components/toasts/message-toasts.jsx";
import PopoverComponent from "../components/tags/tag-popover-component.jsx";
import { useUserStore } from "../components/stores/useUserStore.js";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import UserCardList from "../components/User_cards/user-cards-list.jsx";
import { useEffect } from "react";
import ModalFilter from "../components/modals/modal-filter.jsx";
import ListLayout from "../layout/list-layout/list.jsx";

function UserList() {
  const token = useUserStore((state) => state.token);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  //Modal Order & Filter
  const [ModalFilters, setModalFilter] = useState(false);
  const [ModalOrders, setModalOrder] = useState(false);
  const toggleFilter = () => setModalFilter(!ModalFilters);
  const toggleOrder = () => setModalOrder(!ModalOrders);

  const [users, setUsers] = useState([]);
  const [interests, setInterests] = useState([]);
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
  const handleInterestsChange = (selected) => handleSelectionChange(selected, interests, setInterests);
  const handleSkillsChange = (selected) => handleSelectionChange(selected, skills, setSkills);

  /**
   * Filters to be displayed in the modal filter
   */
  const filters = [
    { label: t("interests"), options: interests, handleOnChange: handleInterestsChange },
    { label: t("skills"), options: skills, handleOnChange: handleSkillsChange },
  ];

  /**
   * getFilterOptions
   */
  async function getFilterOptions() {
    try {
      const response = await Api.getFilterOptions(token);
      setInterests(response.data.interests);
      setSkills(response.data.skills);
    } catch (error) {
      terror("Error", error.message);
    }
  }

  /**
   * Method to apply the filters
   */
  async function applyFilters() {
    const interestsArray = interests ? interests.filter((interest) => interest.selected).map((interest) => interest.name) : [];
    const skillsArray = skills ? skills.filter((skill) => skill.selected).map((skill) => skill.name) : [];

    const props = {
      dtoType: "UserCardDto",
      interest: interestsArray,
      skill: skillsArray,
    };

    try {
      const response = await Api.getUsers(token, props);
      setUsers(response.data);
      setLoading(false);
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
      <ModalFilter isOpen={ModalFilters} toggle={toggleFilter} title={t("filter")} filters={filters} onSubmit={applyFilters} />
    </ListLayout>
  );
}

export default UserList;
