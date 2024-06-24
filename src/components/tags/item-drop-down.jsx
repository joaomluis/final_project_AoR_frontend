import React, { useEffect, useState } from "react";
import ModalDD from "../modals/modal-dropdown";
import Tag from "../tags/tags";
import { t } from "i18next";

function ItemDropdown({
  fetchTypes, // Função para buscar tipos, se aplicável
  fetchItems, // Função para buscar itens
  fetchAllItems, // Função para buscar todos os itens
  createItem, // Função para criar novo item
  addItem, // Função para adicionar item
  removeItem, // Função para remover item
  items, // Itens atuais
  allItems, // Todos os itens disponíveis
  types, // Tipos disponíveis, se aplicável
  hasTypes = true, // Flag para indicar se há tipos ou não
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  async function handleFetchTypes() {
    if (hasTypes) {
      try {
        await fetchTypes();
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  async function handleFetchItems() {
    try {
      await fetchItems();
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleFetchAllItems() {
    try {
      await fetchAllItems();
    } catch (error) {
      console.log(error.message);
    }
  }

  const onCreateNewItem = (newItem) => {
    setNewItemName(newItem);
  };

  async function handleCreateNewItem(type) {
    let item = { name: newItemName };
    if (hasTypes) {
      item.type = type;
    }
    try {
      await createItem(item);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleAddItem(item) {
    const itemIdName = convertOptionToItem(item);
    try {
      await addItem(itemIdName);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleRemoveItem(item) {
    const itemIdName = convertOptionToItem(item);
    try {
      await removeItem(itemIdName);
      console.log("Item removed" + itemIdName);
      console.log(itemIdName.id);
      console.log(itemIdName.name);
    } catch (error) {
      console.log(error.message);
    }
  }

  function convertOptionToItem(option) {
    const item = {
      id: option.value,
      name: option.label,
    };
    if (hasTypes) {
      item.type = option.type;
    }
    return item;
  }

  useEffect(() => {
    handleFetchTypes();
    handleFetchAllItems();
    handleFetchItems();
  }, []);

  const handleOpenModal = (itemName) => {
    setNewItemName(itemName);
    setIsModalOpen(true);
  };

  return (
    <>
      <Tag
        handleModalToggle={handleOpenModal}
        onCreate={onCreateNewItem}
        options={allItems}
        choices={items}
        onAdd={handleAddItem}
        onRemove={handleRemoveItem}
      />
      <ModalDD
        header={hasTypes ? t("new_skill") : t("new_interest")}
        title={hasTypes ? t("do_you_want_to_create_a_new_skill?") : t("do_you_want_to_create_a_new_interest?")}
        newProductName={newItemName}
        subtitle={hasTypes ? t("choose_skill_type") : ""}
        handleCreateNew={handleCreateNewItem}
        isOpen={isModalOpen}
        types={types}
        newItemName={newItemName}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default ItemDropdown;
