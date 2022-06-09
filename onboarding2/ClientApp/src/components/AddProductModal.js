﻿import React, { Component } from 'react';
import { Modal, Button, ButtonGroup, Row, Col, Form } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';

export class AddProductModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'product', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ProductName: event.target.ProductName.value,
                ProductPrice: event.target.ProductPrice.value
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
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Create Product
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="ProductName">
                                        <Form.Label>NAME</Form.Label>
                                        <Form.Control type="text" name="ProductName" required />
                                    </Form.Group>
                                    <Form.Group controlId="ProductPrice">
                                        <Form.Label>PRICE</Form.Label>
                                        <Form.Control type="text" name="ProductPrice" required />
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
                            <Button variant="success" type="submit" onClick={this.props.onHide}>
                                Create | <FaCheck color="white" />
                            </Button>
                        </ButtonGroup>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}