import { useMemo } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";


const CatalogsItemContainer = ({link, image, prop, propPadding }) => {
  const catalogsItemContainerStyle = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  return (
    <div >
   <Card   style={{border:'none' }}  className="text-center d-flex align-items-center">
    <Link to={link}>
  <Card.Img  className="img-fluid" style={{width:798,objectFit:'cover'}}   variant="center" src={image} />
  <Card.ImgOverlay   className="d-flex  align-items-center justify-content-center">
    <Card.Text>
      <h1 style={{color:'white',textTransform:'uppercase'}} >{prop}</h1>
    </Card.Text>
  </Card.ImgOverlay>
  </Link>
</Card>

    </div>
  );
};

export default CatalogsItemContainer;
