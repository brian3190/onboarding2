import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddSaleModal extends Component {
    constructor(props) {
        super(props);
        this.state = { sales: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch(process.env.REACT_APP_API + 'sales')
            .then(res => res.json())
            .then(data => {
                this.setState({ sales: data });
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'sales', {
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
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Create Customer
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="SaleDateSold">
                                        <Form.Label>Date Sold</Form.Label>
                                        <Form.Control type="text" name="SaleDateSold" defaultValue={this.props.datesold} disabled />
                                    </Form.Group>
                                    <Form.Group controlId="Customer">
                                        <Form.Label>Customer</Form.Label>
                                        <Form.Control as="select" name="Customer">
                                            {this.state.sales.map(c =>
                                                <option key={c.Id}> {c.Customer.Name} </option> )}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="Product">
                                        <Form.Label>Product</Form.Label>
                                        <Form.Control as="select" name="Sales">
                                            {this.state.sales.map(c =>
                                                <option key={c.Id}>{c.Product.Name}</option>)}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="Store">
                                        <Form.Label>Store</Form.Label>
                                        <Form.Control as="select" name="Store">
                                            {this.state.sales.map(c =>
                                                <option key={c.Id}>{c.Store.Name}</option>)}
                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={this.props.onHide}>
                            Cancel
                        </Button>
                        <Button variant="success" type="submit" onClick={this.props.onHide}>
                            Create
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}