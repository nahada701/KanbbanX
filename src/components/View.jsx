import React, { useEffect, useState } from 'react';
import Card from './Card';
import { Row, Col } from 'react-bootstrap';
import { getCardApi } from '../Services/apicalls';

function View({ newCardResponse }) {
  const [allCardDetails, setAllCardDetails] = useState();
  const [deleteCardResponse, setDeleteCardResponse] = useState();

  useEffect(() => {
    getCard();
  }, [newCardResponse, deleteCardResponse]);

  const getCard = async () => {
    try {
      const response = await getCardApi();
      setAllCardDetails(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Row className="m-3">
        {allCardDetails?.length > 0 ? (
          allCardDetails.map((card) => (
            <Col lg={4} md={6} sm={12} className="mb-3" key={card.id}>
              <Card
                cardDetails={card}
                setDeleteCardResponse={setDeleteCardResponse}
                refreshCards={getCard} // Pass down the refreshCards function
              />
            </Col>
          ))
        ) : (
          <p className="fs-4 text-center">Start by adding your first card</p>
        )}
      </Row>
    </div>
  );
}

export default View;
