import React, { Component } from 'react';
import { Table , Button } from 'react-bootstrap';
import { AddProductModal } from './AddProductModal';

export class Product extends Component {
    constructor(props) {
        super(props);
        this.state = { prod: [], addModalShow: false, editModalShow: false, deleteModalShow: false }
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'product')
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
        const { prod } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false, editModalShow: false, deleteModalShow: false  });
        return (
            <div className="container">
                <Button variant="primary" onClick={() => this.setState({ addModalShow: true })}>
                    New Product
                </Button>
                <AddProductModal show={this.state.addModalShow}
                    onHide={addModalClose} />
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
                                    <Button variant="warning" onClick={() => this.setState({ editModalShow: true })}>
                                        <i class="edit icon"></i>
                                        EDIT
                                    </Button>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => this.setState({ deleteModalShow: true })}>
                                        <i class="trash icon"></i>
                                        DELETE
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