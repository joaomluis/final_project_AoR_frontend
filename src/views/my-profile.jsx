import {
  Container,
  Col,
  Row,
} from "reactstrap";

import { useTranslation } from 'react-i18next';

import "../assets/css/general-css.css";





function LandingPageContent() {
  const { t } = useTranslation();

  return (
    
      <div className="section1" style={{height: "100vh"}}>
        
        <Row>
          <Col md="6">
            <Row>
              <h1 style={{ marginTop: "60px", fontWeight: "bold" }}>
              {t("title-section1")}
                
              </h1>
            </Row>
            <Row className="mt-4">
              <h5>
              {t("subtitle-section1")}
              </h5>
            </Row>
          </Col>

          <Col md="6">
            
          </Col>
        </Row>
        
      </div>
    
  );
}

export default LandingPageContent;
