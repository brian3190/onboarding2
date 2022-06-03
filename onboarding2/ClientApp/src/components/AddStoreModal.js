﻿import React, { Component } from 'react';
import { Modal, Button, ButtonGroup, Row, Col, Form } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';

export class AddStoreModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'store', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                StoreName: event.target.StoreName.value,
                StoreAddress: event.target.StoreAddress.value
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
                            Create Store
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="StoreName">
                                        <Form.Label>NAME</Form.Label>
                                        <Form.Control type="text" name="StoreName" required />
                                    </Form.Group>
                                    <Form.Group controlId="StoreAddress">
                                        <Form.Label>ADDRESS</Form.Label>
                                        <Form.Control type="text" name="StoreAddress" required />
                                    </Form.Group>

                                    <Form.Group controlId="SubmitButtons">
                                        <Button variant="dark" onClick={this.props.onHide}>
                                            Cancel
                                        </Button>
                                        <ButtonGroup>
                                            <Button variant="success" type="submit">
                                                Create | <FaCheck color="white" />
                                            </Button>

                                        </ButtonGroup>
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