import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardHeader, CardFooter, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./product-cards-list.css";
const ProductCardList = ({ product }) => {
  const { t } = useTranslation();

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    } else {
      return description;
    }
  };

  return (
    <>
      <Card id={product.id} color="light" className={`card-style `}>
        <CardHeader className="product-card">
          <CardTitle tag="h4" className="card-title-style">
            <div className="flex-center product-title">
              {product.name}
              <Badge className="badge-style" pill>
                {product.type === "COMPONENT" ? t("component") : t("resource")}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <CardText className="product-card-info">
            <span>{t("description")}: &nbsp;</span>
            {truncateDescription(product.description, 30)}
          </CardText>
          <CardText className="product-card-info">
            <span>{t("supplier")}: &nbsp;</span>
            <strong>{product.supplier}</strong>
          </CardText>
          <CardText className="product-card-info">
            <span>{t("identifier")}: &nbsp;</span>
            <strong>{product.identifier}</strong>
          </CardText>
        </CardBody>
        <CardFooter className="product-card">
          <Link color="light" to={`/fica-lab/product/${product.id}`} className={`btn button-style1 w-100`}>
            {t("see-product")}
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProductCardList;
