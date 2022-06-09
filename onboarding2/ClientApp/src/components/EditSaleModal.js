import React, { Component } from 'react';
import { Modal, Button, ButtonGroup, Row, Col, Form } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';

export class EditSaleModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
     
    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'sales/'+ this.props.saleid , {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Customer: event.target.CustomerName.value,
                Product: event.target.ProductName.value,
                Store: event.target.StoreName.value
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
                            Edit Sales
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="DateSold">
                                        <Form.Label>Date Sold</Form.Label>
                                        <Form.Control type="text" name="DateSold" defaultValue={this.props.datesold} disabled />
                                    </Form.Group>
                                    <Form.Group controlId="CustomerName">
                                        <Form.Label>Customer</Form.Label>
                                        <Form.Control type="text" name="CustomerName" defaultValue={this.props.custname} required />
                                    </Form.Group>
                                    <Form.Group controlId="ProductName">
                                        <Form.Label>Product</Form.Label>
                                        <Form.Control type="text" name="ProductName" defaultValue={this.props.prodname} required />
                                    </Form.Group>
                                    <Form.Group controlId="StoreName">
                                        <Form.Label>Store</Form.Label>
                                        <Form.Control type="drop-down" name="StoreName" defaultValue={this.props.storname} required />
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