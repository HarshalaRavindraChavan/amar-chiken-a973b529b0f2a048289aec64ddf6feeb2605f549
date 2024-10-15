import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Container, Modal, ModalHeader, ModalBody, Row, Button, Nav } from 'reactstrap';

const ShopTable = () => {
  const courseData = [
    { id: 1, name: 'React for Beginners' },
    { id: 2, name: 'Advanced JavaScript' },
  ]; // Example data


  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal); // Toggle function
  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg={12}>
            <Card className="shadow-sm">
            <CardHeader className="card-header border-0 bg-danger text-white">
  <Row className="align-items-center gy-3">
    <Col sm={6}>
      <h5 className="card-title mb-0">Shop List</h5>
    </Col>
    <Col sm={6} className="text-sm-end">
    <button
                      type="button"
                      className="btn btn-light fw-bold"
                      onClick={toggleModal} // Show modal on click
                    >
                      <i className="ri-add-line align-bottom me-1"></i> Add To Shop
                    </button>
    </Col>
  </Row>
</CardHeader>


              <CardBody className="pt-0">
                <Nav className="nav-tabs nav-tabs-custom nav-success" role="tablist"></Nav>

                <table className="table align-middle table-hover table-striped mt-3">
                  <thead className="table-light text-muted text-uppercase">
                    <tr>
                      <th style={{ cursor: 'pointer' }}>Sr No</th>
                      <th style={{ cursor: 'pointer' }}>Shop  Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseData.length > 0 ? (
                      courseData.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>
                            <ul className="list-inline hstack gap-2 mb-0">
                              <li className="list-inline-item">
                                <button className="btn btn-sm btn-outline-primary">
                                  <i className="ri-pencil-fill"></i> Edit
                                </button>
                              </li>
                              <li className="list-inline-item">
                                <button className="btn btn-sm btn-outline-danger">
                                  <i className="ri-delete-bin-5-fill"></i> Delete
                                </button>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center py-4">
                          No courses available. <a href="#">Add a new course</a>.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

{/* modal */}
<Modal isOpen={modal} toggle={toggleModal} size="lg">
  <ModalHeader toggle={toggleModal}>Add to Shop</ModalHeader>
  <ModalBody>
    <form className="shopform">
      <div className="row">
        <div className="form-group col-md-6">
          <input
            className="form-control"
            type="text"
            placeholder="Shop Name"
          />
        </div>
        <div className="form-group col-md-6">
          <input
            className="form-control"
            type="text"
            placeholder="Shop Location"
          />
        </div>
        <div className="form-group col-md-6">
          <input
            className="form-control"
            type="text"
            placeholder="Address"
          />
        </div>
        <div className="form-group col-md-6">
          <input
            className="form-control"
            type="text"
            placeholder="Pincode"
          />
        </div>
        <div className="form-group col-md-6">
          <input
            className="form-control"
            type="text"
            placeholder="Mobile No"
          />
        </div>
        <div className="form-group col-md-6">
          <input
            className="form-control"
            type="text"
            placeholder="Email Address"
          />
        </div>
        <div className="form-group col-md-6">
          <input
            className="form-control"
            type="text"
            placeholder="Products"
          />
        </div>
        <div className="form-group col-md-6">
          <input
            className="form-control"
            type="text"
            placeholder="Price of Product"
          />
        </div>
        <div className="form-group col-md-6">
          <label>Shop Images</label>
          <input
            type="file"
            id="shopImages"
            name="shopImages"
            multiple
            className="form-control-file"
            required
          />
        </div>
        <div className="form-group col-md-6">
          <label>Product Images</label>
          <input
            type="file"
            id="productImages"
            name="productImages"
            multiple
            className="form-control-file"
            required
          />
        </div>
      </div>
      {/* <button type="submit" className="btn btn-danger mt-3">
        Submit
      </button> */}
    </form>
    <div className="mt-3">
      <Button color="danger" onClick={toggleModal}>
        Confirm
      </Button>{' '}
      {/* <Button color="secondary" onClick={toggleModal}>
        Cancel
      </Button> */}
    </div>
  </ModalBody>
</Modal>


    </div>
  );
};

export default ShopTable;
