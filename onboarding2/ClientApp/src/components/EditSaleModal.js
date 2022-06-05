import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class EditSaleModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
     
    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'sales' /* + id*/ , {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CustomerName: event.target.CustomerName.value,
                ProductName: event.target.ProductName.value,
                StoreName: event.target.StoreName.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            },
                (error) => {
                    alert('failed');
                })
    }
    render() {
        return (
            <div className="container">
                <Modal {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Sales
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="DateSold">
                                        <Form.Label>Date Sold</Form.Label>
                                        <Form.Control type="text" name="DateSold" placeholder="from props" disabled />
                                    </Form.Group>
                                    <Form.Group controlId="CustomerName">
                                        <Form.Label>Customer</Form.Label>
                                        <Form.Control type="text" name="CustomerName" required />
                                    </Form.Group>
                                    <Form.Group controlId="ProductName">
                                        <Form.Label>Product</Form.Label>
                                        <Form.Control type="text" name="ProductName" required />
                                    </Form.Group>
                                    <Form.Group controlId="StoreName">
                                        <Form.Label>Store</Form.Label>
                                        <Form.Control type="drop-down" name="StoreName" required />
                                    </Form.Group>


                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={this.props.onHide}>
                            Cancel
                        </Button>
                        <ButtonGroup>
                            <Button variant="success" type="submit">
                                Edit | <FaCheck color="white" />
                            </Button>
                        </ButtonGroup>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}