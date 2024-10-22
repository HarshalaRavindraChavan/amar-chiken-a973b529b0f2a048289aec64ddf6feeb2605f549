import React, { useState, useEffect } from 'react';
import {
  Card, CardBody, CardHeader, Col, Container,
  Modal, ModalHeader, ModalBody, Row, Button, Nav,
  
} from 'reactstrap';
// import Authuser from '../../Authentigation/Authuser';

const Tableshop = () => {
  // const [http] = Authuser();
  const [shopData, setShopData] = useState([]); // State to hold shop data
  const [addModal, setAddModal] = useState(false);  // Add to Shop Modal
  const [detailsModal, setDetailsModal] = useState(false);  // Shop Details Modal
  const [selectedShop, setSelectedShop] = useState(null);  // Store selected shop data

  const toggleAddModal = () => setAddModal(!addModal);  // Toggle Add Modal
  const toggleDetailsModal = () => setDetailsModal(!detailsModal);  // Toggle Details Modal

  const handleRowClick = (shop) => {
    setSelectedShop(shop);  // Set selected shop data
    toggleDetailsModal();  // Open details modal
  };

  // Fetch shop data from the API
  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/shops');
        const result = await response.json();
        if (response.ok) {
          setShopData(result.data); // Update state with fetched shop data
        } else {
          console.error('Error fetching shop data:', result.message);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchShopData(); // Call the fetch function
  }, []); // Empty dependency array to run only on component mount

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg={12}>
            <Card className="shadow-sm">
              <CardHeader className="card-header border-0 bg-danger text-white shadow-sm rounded">
                <Row className="align-items-center gy-2">
                  <Col sm={6}>
                    <h5 className="card-title mb-0 fw-semibold">🛍 Shop List</h5>
                  </Col>
                  <Col sm={6} className="text-sm-end">
                    <button
                      type="button"
                      className="btn btn-sm btn-light text-danger fw-bold d-flex align-items-center gap-1"
                      style={{ width: '200px' }}
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
                    {shopData.length > 0 ? (
                      shopData.map((item, index) => (
                        <tr key={item.id} onClick={() => handleRowClick(item)} style={{ cursor: 'pointer' }}>
                          <td>{index + 1}</td>
                          <td>{item.shopName}</td>
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
                          No shops available. <a href="#">Add a new shop</a>.
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
          {/* Add your form logic here */}
        </ModalBody>
      </Modal>

      {/* Shop Details Modal */}
      <Modal isOpen={detailsModal} toggle={toggleDetailsModal} size="lg">
        <ModalHeader toggle={toggleDetailsModal}>
          {selectedShop ? selectedShop.shopName : 'Shop Details'}
        </ModalHeader>
        <ModalBody>
          {selectedShop && (
            <div>
              <p><strong>Location:</strong> {selectedShop.shopLocation}</p>
              <p><strong>Address:</strong> {selectedShop.address}</p>
              <p><strong>Pincode:</strong> {selectedShop.pincode}</p>
              <p><strong>Mobile No:</strong> {selectedShop.mobileNumber}</p>
              <p><strong>Email:</strong> {selectedShop.emailAddress}</p>
              {/* You can add more details if needed */}
            </div>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Tableshop;
