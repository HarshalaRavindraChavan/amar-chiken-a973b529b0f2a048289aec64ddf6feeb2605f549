import React, { useState } from 'react';
import {
  Card, CardBody, CardHeader, Col, Container,
  Modal, ModalHeader, ModalBody, Row, Button, Nav
} from 'reactstrap';

const ShopTable = () => {
  const courseData = [
    { 
      id: 1, name: 'Balaji chicken', location: 'Mumbai',
      address: '123 Market St', pincode: '400001',
      mobile: '9876543210', email: 'balaji@shop.com',
      products: 'Chicken, Wings', price: '500 INR',
    },
    { 
      id: 2, name: 'Chicken wing', location: 'Pune',
      address: '456 Food Plaza', pincode: '411001',
      mobile: '8765432109', email: 'wing@shop.com',
      products: 'Wings, Thighs', price: '300 INR',
    },
  ];

  const [addModal, setAddModal] = useState(false);  // Add to Shop Modal
  const [detailsModal, setDetailsModal] = useState(false);  // Shop Details Modal
  const [selectedShop, setSelectedShop] = useState(null);  // Store selected shop data

  const toggleAddModal = () => setAddModal(!addModal);  // Toggle Add Modal
  const toggleDetailsModal = () => setDetailsModal(!detailsModal);  // Toggle Details Modal

  const handleRowClick = (shop) => {
    setSelectedShop(shop);  // Set selected shop data
    toggleDetailsModal();  // Open details modal
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg={12}>
            <Card className="shadow-sm">
            <CardHeader className="card-header border-0 bg-danger text-white shadow-sm rounded">
  <Row className="align-items-center gy-2">
    <Col sm={6}>
      <h5 className="card-title mb-0 fw-semibold">🛍️ Shop List</h5>
    </Col>
    <Col sm={6} className="text-sm-end">
      <button
        type="button"
        className="btn btn-sm btn-light text-danger fw-bold d-flex align-items-center gap-1"
        style={{ width: '200px',  }}
        onClick={toggleAddModal} // Open Add Modal
      >
        <i className="ri-add-line align-bottom-center"></i> Add
      </button>
    </Col>
  </Row>
</CardHeader>


              <CardBody className="pt-0">
                <Nav className="nav-tabs nav-tabs-custom nav-success" role="tablist"></Nav>

                <table className="table align-middle table-hover table-striped mt-3">
                  <thead className="table-light text-muted text-uppercase">
                    <tr>
                      <th>Sr No</th>
                      <th>Shop Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseData.length > 0 ? (
                      courseData.map((item, index) => (
                        <tr key={item.id} onClick={() => handleRowClick(item)} style={{ cursor: 'pointer' }}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>
                            <ul className="list-inline hstack gap-2 mb-0">
                              <li className="list-inline-item">
                                <button className="btn btn-sm btn-outline-primary">
                                  <i className="ri-pencil-fill"></i> View
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

      {/* Add to Shop Modal */}
      <Modal isOpen={addModal} toggle={toggleAddModal} size="lg">
        <ModalHeader toggle={toggleAddModal}>Add to Shop</ModalHeader>
        <ModalBody>
          <form className="shopform">
            <div className="row">
              <div className="form-group col-md-6">
                <input className="form-control" type="text" placeholder="Shop Name" />
              </div>
              <div className="form-group col-md-6">
                <input className="form-control" type="text" placeholder="Shop Location" />
              </div>
              <div className="form-group col-md-6">
                <input className="form-control" type="text" placeholder="Address" />
              </div>
              <div className="form-group col-md-6">
                <input className="form-control" type="text" placeholder="Pincode" />
              </div>
              <div className="form-group col-md-6">
                <input className="form-control" type="text" placeholder="Mobile No" />
              </div>
              <div className="form-group col-md-6">
                <input className="form-control" type="text" placeholder="Email Address" />
              </div>
              <div className="form-group col-md-6">
                <input className="form-control" type="text" placeholder="Products" />
              </div>
              <div className="form-group col-md-6">
                <input className="form-control" type="text" placeholder="Price of Product" />
              </div>
            </div>
            <Button color="danger" className="mt-3">Confirm</Button>
          </form>
        </ModalBody>
      </Modal>

      {/* Shop Details Modal */}
      <Modal isOpen={detailsModal} toggle={toggleDetailsModal} size="lg">
        <ModalHeader toggle={toggleDetailsModal}>
          {selectedShop ? selectedShop.name : 'Shop Details'}
        </ModalHeader>
        <ModalBody>
          {selectedShop && (
            <div>
              <p><strong>Location:</strong> {selectedShop.location}</p>
              <p><strong>Address:</strong> {selectedShop.address}</p>
              <p><strong>Pincode:</strong> {selectedShop.pincode}</p>
              <p><strong>Mobile No:</strong> {selectedShop.mobile}</p>
              <p><strong>Email:</strong> {selectedShop.email}</p>
              <p><strong>Products:</strong> {selectedShop.products}</p>
              <p><strong>Price:</strong> {selectedShop.price}</p>
            </div>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ShopTable;
