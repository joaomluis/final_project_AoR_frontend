import { Api } from "../api";
import { Link, useSearchParams, useLocation } from "react-router-dom";

import { Row, Col } from "reactstrap";
import { tsuccess, terror, twarn } from "../components/toasts/message-toasts.jsx";
import { useUserStore } from "../components/stores/useUserStore.js";
import useFilterStore from "../components/stores/useFilterStore.js";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import ModalFilter from "../components/modals/modal-filter.jsx";
import ModalOrder from "../components/modals/modal-order.jsx";
import ListLayout from "../layout/list-layout/list.jsx";
import ProductCardList from "../components/Product_cards/product-cards-list.jsx";
import PaginationComponent from "../components/pagination/pagination.jsx";
import { parse } from "qs";

function ProductList() {
  const token = useUserStore((state) => state.token);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  //Modal Order & Filter
  const [ModalFilters, setModalFilter] = useState(false);
  const [ModalOrders, setModalOrder] = useState(false);
  const toggleFilter = () => setModalFilter(!ModalFilters);
  const toggleOrder = () => setModalOrder(!ModalOrders);

  //Filter options
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  //Products
  const [products, setProducts] = useState([]);
  //Search Params
  const [searchParams, setSearchParams] = useSearchParams({ page: 1, types: [], brands: [] });
  const typeParam = searchParams.get("types") || [];
  const brandParam = searchParams.get("brands") || [];
  const pageParam = searchParams.get("page") || 1;
  const orderFieldParam = searchParams.get("field") || "";
  const orderDirectionParam = searchParams.get("direction") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();

  const [ids, setIds] = useState({ brands: [], types: [] });

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

  const handleBrandChange = (selected) => handleSelectionChange(selected, brands, setBrands, "brands");
  const handleTypeChange = (selected) => handleSelectionChange(selected, types, setTypes, "types");

  const filters = [
    { label: "brands", options: brands, handleOnChange: handleBrandChange },
    { label: "types", options: types, handleOnChange: handleTypeChange },
  ];
  const ofilters = [{ label: "identifier" }, { label: "type" }, { label: "brand" }, { label: "name" }, { label: "supplier" }];

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
    const brand = brandParam.length > 0 ? brandParam.split(",") : [];
    const type = typeParam.length > 0 ? typeParam.split(",") : [];
    const page = parseInt(pageParam, 10) || 1;
    const orderField = orderFieldParam;
    const orderDirection = orderDirectionParam;
    const props = {
      brand: brand,
      type: type,
      page_size: 9,
      page_number: page,
      order_field: orderField,
      order_direction: orderDirection,
    };

    console.log(props);
    try {
      const response = await Api.getProducts(token, props);
      console.log(response);
      setProducts(response.data.results);
      setTotalPages(response.data.totalPages);
      console.log(response.data.totalPages);
      setLoading(false);
      setModalFilter(false);
      setModalOrder(false);
    } catch (error) {
      terror("Error", error);
    }
  }
  useEffect(() => {
    applyFilters();
    getFilterOptions();
  }, [token]);

  const handlePageChange = (newPage) => {
    console.log(newPage);
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
    if (typeParam.length === 0) {
      searchParams.delete("types");
    }
    if (brandParam.length === 0) {
      searchParams.delete("brands");
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
      <PaginationComponent currentPage={currentPage} totalPages={totalPages} setCurrentPage={handlePageChange} />
      <ModalFilter isOpen={ModalFilters} toggle={toggleFilter} title={t("filter")} filters={filters} onSubmit={applyFilters} selected={ids} />
      <ModalOrder isOpen={ModalOrders} toggle={toggleOrder} title={t("order")} filters={ofilters} onSubmit={applyFilters} />
    </ListLayout>
  );
}

export default ProductList;
