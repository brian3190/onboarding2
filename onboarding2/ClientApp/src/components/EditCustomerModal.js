import React, { Component } from 'react';
import { Modal, Button, ButtonGroup, Row, Col, Form } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';

export class EditCustomerModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'customers/' + this.props.custid, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: event.target.CustomerName.value,
                Address: event.target.CustomerAddress.value
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
                            Edit Customer
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