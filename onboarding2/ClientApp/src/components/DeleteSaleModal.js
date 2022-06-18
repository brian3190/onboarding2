import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { ImCross } from 'react-icons/im';


export class DeleteSaleModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.LOCAL_APP_API + 'sales/' + this.props.saleid, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
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
                            Delete Sales
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <div>
                                    Are you sure?
                                </div>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Form.Group controlId="SubmitButtons">
                            <Button variant="dark" onClick={this.props.onHide}>
                                Cancel
                            </Button>
                            <Button variant="danger" type="submit">
                                Delete | <ImCross color="white" />
                            </Button>
                        </Form.Group>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}