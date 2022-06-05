import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';
import { TrashFill } from 'react-bootstrap-icons';
import { AddProductModal } from './AddProductModal';
import { EditProductModal } from './EditProductModal';
import { DeleteProductModal } from './DeleteProductModal';

export class Product extends Component {
    constructor(props) {
        super(props);
        this.state = { prod: [], addModalShow: false, editModalShow: false, deleteModalShow: false }
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'products')
            .then(res => res.json())
            .then(data => {
                this.setState({ prod: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    render() {
        const { prod, productid } = this.state;
        let ModalClose = () => this.setState({ addModalShow: false, editModalShow: false, deleteModalShow: false });
        return (
            <div className="container">
                <Button variant="primary" onClick={() => this.setState({ addModalShow: true })}>
                    New Product
                </Button>
                <AddProductModal show={this.state.addModalShow}
                    onHide={ModalClose} />
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prod.map(c =>
                            <tr key={c.Id}>
                                <td>{c.Name}</td>
                                <td>{c.Address}</td>
                                <td>
                                    <Button variant="warning" onClick={() => this.setState({ editModalShow: true, productid: c.Id })}>
                                        <PencilSquare color="white" />
                                        EDIT
                                        {/*propsId*/}
                                        <EditProductModal show={this.state.editModalShow}
                                            onHide={ModalClose} />
                                    </Button>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => this.setState({ deleteModalShow: true, productid: c.Id })}>
                                        <TrashFill color="white" />
                                        DELETE
                                        {/*propsId*/}
                                        <DeleteProductModal show={this.state.deleteModalShow}
                                            onHide={ModalClose} productid={productid} />
                                    </Button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}