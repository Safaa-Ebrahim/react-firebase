import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

// component
import AddBook from "../components/AddBook";
import BookList from "../components/BookList";

const Books = () => {
  const [bookId, setBookId] = useState("");
  const getBookIdHandler = (id) => {
    setBookId(id);
  };

  return (
    <>
      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <AddBook id={bookId} setBookId={setBookId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <BookList getBookId={getBookIdHandler} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Books;
