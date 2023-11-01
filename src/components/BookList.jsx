import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Table, Button } from "react-bootstrap";

// font awesom
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

// component
import { showToast } from "./../store/slices/toastSlice";

// services
import BookDataService from "./../services/book.services";

const BookList = ({ getBookId }) => {
  const [books, setBooks] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    BookDataService.getAllBooks()
      .then((data) => {
        setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteHandler = (id) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm("Are you sure that you want to delete this book");
    if (result === true) {
      BookDataService.deleteBook(id)
        .then((res) => {
          // make refreh to the books
          getBooks();
          dispatch(showToast("Book deleted successfully!"));
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      return;
    }
  };

  return (
    <div className="mt-3">
      <Button variant="dark edit" onClick={getBooks} className="mb-2">
        <FontAwesomeIcon icon={faArrowsRotate} /> Refresh List
      </Button>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Book Title</th>
            <th>Book Author</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.length !== 0 ? (
            books.map((doc, index) => {
              return (
                <tr key={doc.id}>
                  <td>{index + 1}</td>
                  <td>{doc.title}</td>
                  <td>{doc.author}</td>
                  <td>{doc.status}</td>
                  <td>
                    <Button
                      variant="secondary"
                      className="edit"
                      onClick={(e) => getBookId(doc.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="delete"
                      onClick={(e) => deleteHandler(doc.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (

            <tr>
              <td colSpan="5" className="text-center">
                <p className="text-secondary">No books available</p>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default BookList;
