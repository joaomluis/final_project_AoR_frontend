import { Api } from "../api";
import { Link } from "react-router-dom";

import { Row, Col } from "reactstrap";
import { tsuccess, terror, twarn } from "../components/toasts/message-toasts.jsx";
import { useUserStore } from "../components/stores/useUserStore.js";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import ModalFilter from "../components/modals/modal-filter.jsx";
import ListLayout from "../layout/list-layout/list.jsx";
import ProductCardList from "../components/Product_cards/product-cards-list.jsx";

function ProductList() {
  const token = useUserStore((state) => state.token);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  //Modal Order & Filter
  const [ModalFilters, setModalFilter] = useState(false);
  const [ModalOrders, setModalOrder] = useState(false);
  const toggleFilter = () => setModalFilter(!ModalFilters);
  const toggleOrder = () => setModalOrder(!ModalOrders);

  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [products, setProducts] = useState([]);

  const handleSelectionChange = (selected, items, setItems) => {
    const newItems = items.map((item) => ({
      ...item,
      selected: selected.map(Number).includes(item.id),
    }));
    setItems(newItems);
    const filteredItems = newItems.filter((item) => selected.map(Number).includes(item.id));
    return filteredItems.map((item) => item.name);
  };

  const handleBrandChange = (selected) => handleSelectionChange(selected, brands, setBrands);
  const handleTypeChange = (selected) => handleSelectionChange(selected, types, setTypes);

  const filters = [
    { label: t("brands"), options: brands, handleOnChange: handleBrandChange },
    { label: t("types"), options: types, handleOnChange: handleTypeChange },
  ];

  /**
   * Get filter options
   */
  async function getFilterOptions() {
    Api.getFilterOptionsProducts(token)
      .then((response) => {
        setBrands(response.data.brands);
        setTypes(response.data.types);
      })
      .catch((error) => {
        terror("Error", error);
      });
  }

  /**
   * Apply filters
   */
  async function applyFilters() {
    const brandsArray = brands.filter((brand) => brand.selected).map((brand) => brand.name);
    const typesArray = types.filter((type) => type.selected).map((type) => type.name);

    const props = {
      brand: brandsArray,
      type: typesArray,
    };

    try {
      const response = await Api.getProducts(token, props);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      terror("Error", error);
    }
  }
  useEffect(() => {
    applyFilters();
    getFilterOptions();
  }, [token]);

  return (
    <ListLayout
      title={t("products")}
      toggleFilter={toggleFilter}
      toggleOrder={toggleOrder}
      ModalFilters={ModalFilters}
      ModalOrders={ModalOrders}
      loading={loading}
    >
      <Row>
        {products.map((product) => (
          <Col sm="12" md="6" lg="4" key={product.id} className="mt-4">
            <ProductCardList product={product} />
          </Col>
        ))}
      </Row>
      <ModalFilter isOpen={ModalFilters} toggle={toggleFilter} title={t("filter")} filters={filters} onSubmit={applyFilters} />
    </ListLayout>
  );
}

export default ProductList;
