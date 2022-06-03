import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddSaleModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'sale', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Customer: event.target.Customer.value,
                Product: event.target.Product.value,
                Store: event.target.Store.value
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
                            Create Customer
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="Customer">
                                        <Form.Label>Customer</Form.Label>
                                        <Form.Select name="Customer" required />
                                    </Form.Group>
                                    <Form.Group controlId="Product">
                                        <Form.Label>Product</Form.Label>
                                        <Form.Select name="Product" required />
                                    </Form.Group>
                                    <Form.Group controlId="Store">
                                        <Form.Label>Store</Form.Label>
                                        <Form.Select name="Store" required />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={this.props.onHide}>
                            Cancel
                        </Button>
                        <Button variant="success" type="submit">
                            Create
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}