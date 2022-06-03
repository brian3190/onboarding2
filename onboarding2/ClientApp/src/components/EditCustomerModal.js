﻿import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class EditCustomerModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'department', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CustomerName: event.target.CustomerName.value,
                CustomerAddress: event.target.CustomerAddress.value
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
                                    <Form.Group controlId="CustomerName">
                                        <Form.Label>NAME</Form.Label>
                                        <Form.Control type="text" name="CustomerName" required />
                                    </Form.Group>
                                    <Form.Group controlId="CustomerAddress">
                                        <Form.Label>ADDRESS</Form.Label>
                                        <Form.Control type="text" name="CustomerAddress" required />
                                    </Form.Group>

                                    <Form.Group controlId="SubmitButtons">
                                        <Button variant="dark" onClick={this.props.onHide}>
                                            Cancel
                                        </Button>
                                        <Button variant="success" type="submit">
                                            Create
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}