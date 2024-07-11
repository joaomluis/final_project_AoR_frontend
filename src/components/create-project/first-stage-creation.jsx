import {
  Col,
  Row,
  CardBody,
  Input,
  Label,
  Form,
  FormGroup,
  Popover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";

import { useEffect, useState } from "react";

import { IoIosInformationCircleOutline } from "react-icons/io";

import useCreateProjectStore from "../../stores/useCreateProjectStore.js";
import { useUserStore } from "../../stores/useUserStore.js";

import { Api } from "../../api";

import { useTranslation } from "react-i18next";

function FirstStageCreation() {
  const { t } = useTranslation();

  const projectName = useCreateProjectStore((state) => state.projectName);
  const description = useCreateProjectStore((state) => state.description);
  const lab = useCreateProjectStore((state) => state.lab);
  const startDate = useCreateProjectStore((state) => state.startDate);
  const endDate = useCreateProjectStore((state) => state.endDate);
  const [minEndDate, setMinEndDate] = useState("");

  const token = useUserStore((state) => state.token);
  const [labs, setLabs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  async function handleLoadLabLocations() {
    try {
      if (!isLoaded) {
        const response = await Api.getAllLocations(token);
        setLabs(response.data);

        setIsLoaded(true);
      }
    } catch (error) {
      console.log(error.messsage);
    }
  }

  //Codigo para lidar com definição de tamanho do grupo

  const groupSize = useCreateProjectStore((state) => state.projectGroupSize);
  const setGroupSize = useCreateProjectStore(
    (state) => state.setProjectGroupSize
  );
  const minGroupSize = 4;

  const [popoverOpen, setPopoverOpen] = useState(false);

  const showPopover = () => setPopoverOpen(true);
  const hidePopover = () => setPopoverOpen(false);

  const [groupMaxSize, setGroupMaxSize] = useState(0);

  async function getGroupMaxSizeAllowed() {
    try {
      const response = await Api.getGroupMaxSize(token);
      setGroupMaxSize(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    handleLoadLabLocations();
    getGroupMaxSizeAllowed();
  }, []);

  const handleProjectNameChange = (event) => {
    useCreateProjectStore.getState().setProjectName(event.target.value);
  };

  const handleGroupSizeChange = (event) => {
    const newValue = event.target.value;
    if (newValue <= groupMaxSize) {
      setGroupSize(newValue);
    } else {
      setGroupSize(groupMaxSize);
    }
  };

  const handleDescriptionChange = (event) => {
    useCreateProjectStore.getState().setDescription(event.target.value);
  };

  const handleLabChange = (event) => {
    const selectedLabId = event.target.value;
    const selectedLab = labs.find((lab) => lab.id.toString() === selectedLabId);
    useCreateProjectStore.getState().setLab(selectedLab);
  };
  //A função handleStartDateChange é responsável por atualizar o estado startDate com o valor do input de data de início do projeto.
  //Além disso, ela calcula a data mínima para o input de data de término do projeto, que é um dia após a data de início.
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    useCreateProjectStore.getState().setStartDate(newStartDate);

    const dayAfterStartDate = new Date(newStartDate);
    dayAfterStartDate.setDate(dayAfterStartDate.getDate() + 1);

    const formattedMinEndDate = dayAfterStartDate.toISOString().split("T")[0];
    setMinEndDate(formattedMinEndDate);
    useCreateProjectStore.getState().setEndDate(formattedMinEndDate);
  };

  const handleEndDateChange = (event) => {
    useCreateProjectStore.getState().setEndDate(event.target.value);
  };

  return (
    <>
      <CardBody>
        <Form>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="projectName">{t("project-name")}</Label>
                <Input
                  type="text"
                  name="projectName"
                  id="projectName"
                  placeholder={t("enter-project-name")}
                  className="form-control-lg"
                  value={projectName}
                  onChange={handleProjectNameChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">{t("project-description")}</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  className="form-control-lg"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </FormGroup>
              <FormGroup floating>
                <Input
                  bsSize="md"
                  type="select"
                  className="form-select-lg"
                  value={lab.id || "default"}
                  onChange={handleLabChange}
                >
                  <option disabled value="default">
                    {t("select-lab")}
                  </option>
                  {labs.map((lab) => (
                    <option key={lab.id} value={lab.id}>
                      {lab.location}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="startDate">{t("project-start-date")}</Label>
                <Input
                  type="date"
                  name="startDate"
                  id="startDate"
                  className="form-control-lg"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="endDate">{t("project-end-date")}</Label>
                <Input
                  type="date"
                  name="endDate"
                  id="endDate"
                  className="form-control-lg"
                  value={endDate}
                  onChange={handleEndDateChange}
                  min={minEndDate}
                />
              </FormGroup>
              <FormGroup>
                <Label for="projectName">{t("project-group-size")}</Label>
                {"  "}

                <span
                  id="Popover1"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={showPopover}
                  onMouseLeave={hidePopover}
                >
                  <IoIosInformationCircleOutline />
                </span>
                <Popover
                  placement="right"
                  isOpen={popoverOpen}
                  target="Popover1"
                >
                  
                  <PopoverBody>
                  {t("project-group-size-info")} {groupMaxSize}
                  </PopoverBody>
                </Popover>

                <Input
                  type="number"
                  name="projectGroupSize"
                  id="projectGroupSize"
                  className="form-control-lg"
                  value={groupSize}
                  min={minGroupSize}
                  max={groupMaxSize}
                  onChange={handleGroupSizeChange}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </>
  );
}

export default FirstStageCreation;
