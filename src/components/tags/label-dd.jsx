import Select from "react-select/creatable";
import { Row } from "react-bootstrap";

const LabelDD = ({ label, text, editMode, name, handleInputChange, data, product }) => {
  console.log(`EditMode: ${editMode}, Product: ${product}, Text: ${text}`);

  // Transforma os dados recebidos em opções para o componente Select
  const options = data.map((d) => ({ value: d.id, label: d.name }));
  const selectedOption = options.find((option) => (!editMode ? option.value === product[name] : option.label === text));
  console.log(selectedOption);

  const handleChange = (option) => {
    handleInputChange({ target: { name, value: option.value, label: option.label } });
  };

  return (
    <Row className="p-4">
      <p>
        <strong>{label}:</strong>
      </p>
      {editMode ? <Select name={name} defaultValue={selectedOption} onChange={handleChange} options={options} /> : <p>{text}</p>}
    </Row>
  );
};

export default LabelDD;
