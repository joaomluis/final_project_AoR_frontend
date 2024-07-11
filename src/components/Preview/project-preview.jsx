import { Label, FormGroup } from "reactstrap";
import { useTranslation } from "react-i18next";
const ProjectPreview = ({ data, name }) => {
  const { t } = useTranslation();
  return (
    <>
      <FormGroup
        style={{
          textAlign: "center",
          backgroundColor: "#f0f0f0",
          borderRadius: "5px",
          padding: "10px",
          margin: "10px 0",
        }}
      >
        <Label
          style={{
            fontWeight: "bold",

            color: "#333",
          }}
        >
          {name}
        </Label>
      </FormGroup>
      {data && Array.isArray(data) && data.length > 0 ? (
        <div
          style={{
            maxHeight: "175px",
            overflowY: "auto",
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px 0",
            backgroundColor: "#f0f0f0",
            borderRadius: "5px",
          }}
        >
          {data.map((data) => (
            <div
              key={data.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#f9f9f9",
              }}
            >
              {data.imagePath && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    alt="profile-pic"
                    src={data.imagePath}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  />
                  {`${data.firstName} ${data.lastName}`}
                </div>
              )}
              {data.name && <div style={{ display: "flex", alignItems: "center" }}>{`${data.name}`}</div>}
              {data.quantity && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <span>{data.label}</span>
                  <span>Qt: {data.quantity}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-data-message">{t("no-data-chosen")}</div>
      )}
    </>
  );
};

export default ProjectPreview;
