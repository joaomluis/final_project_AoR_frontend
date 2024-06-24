import { Label, FormGroup } from "reactstrap";

const ProjectPreview = ({ data, name }) => {
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
            fontSize: "20px",
            color: "#333",
          }}
        >
          {name}
        </Label>
      </FormGroup>
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
            {data.name && (
              <div style={{ display: "flex", alignItems: "center" }}>
                {`${data.name}`}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ProjectPreview;
