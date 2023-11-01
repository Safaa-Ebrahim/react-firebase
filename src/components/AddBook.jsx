import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form, InputGroup, Button, ButtonGroup } from "react-bootstrap";

// services
import BookDataService from "./../services/book.services";

// component
import { showToast } from "./../store/slices/toastSlice";

const AddBook = ({ id, setBookId }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("Available");
  const dispatch = useDispatch();

  useEffect(() => {
    if (id !== undefined && id !== "") {
      editHandler();
    
    }else{
        // Reset the form values if id is not provided
      setTitle("");
      setAuthor("");
      setStatus("Available");
    }
  }, [id]);

  const handleSubmit = (newBook, { resetForm }) => {
    if (id !== undefined && id !== "") {
      //   update the book
      BookDataService.updateBook(id, newBook)
        .then((res) => {
          setBookId("");
          dispatch(showToast("Book updated successfully!"));
          resetForm();
        })
        .catch((err) => {
          dispatch(showToast("Faild to update this book. Please try again."));
        });
    } else {
      //    add new book
      BookDataService.addBooks(newBook)
        .then((res) => {
          dispatch(showToast("Book added successfully!"));
          resetForm();
        })
        .catch((err) => {
          dispatch(showToast("Faild to add new book. Please try again."));
        });
    }
  };

  const editHandler = () => {
    BookDataService.getBook(id)
      .then((docSnap) => {
        setTitle(docSnap.data().title);
        setAuthor(docSnap.data().author);
        setStatus(docSnap.data().status);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Formik
        initialValues={{
          title,
          author,
          status,
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("Title is required"),
          author: Yup.string().required("Author is required"),
        })}
        onSubmit={handleSubmit}
        enableReinitialize={true} // Allow reinitialization when initial values change
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <Field name="title">
              {({ field, form }) => (
                <Form.Group className="mb-3" controlId="formBookTitle">
                  <InputGroup>
                    <InputGroup.Text id="formBookTitle">B</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Book Title"
                      {...field}
                    />
                  </InputGroup>
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
              )}
            </Field>

            <Field name="author">
              {({ field, form }) => (
                <Form.Group className="mb-3" controlId="formBookTitle">
                  <InputGroup>
                    <InputGroup.Text id="formBookTitle">B</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Book Author"
                      {...field}
                    />
                  </InputGroup>
                  <ErrorMessage
                    name="author"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
              )}
            </Field>

            <ButtonGroup aria-label="Basic example" className="mb-3">
              <Button
                variant="success"
                onClick={() => {
                  formik.setFieldValue("status", "Available");
                  formik.setFieldTouched("status", true);
                }}
                disabled={formik.values.status === "Available"}
              >
                Available
              </Button>

              <Button
                variant="danger"
                onClick={() => {
                  formik.setFieldValue("status", "Not Available");
                  formik.setFieldTouched("status", true);
                }}
                disabled={formik.values.status === "Not Available"}
              >
                Not Available
              </Button>
            </ButtonGroup>

            <div className="d-grid gap-2">
              <Button variant="primary" type="Submit">
                Add/ Update
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddBook;
