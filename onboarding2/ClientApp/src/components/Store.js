import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { AddStoreModal } from './AddStoreModal';

export class Store extends Component {
    constructor(props) {
        super(props);
        this.state = { stor: [], addModalShow: false, editModalShow: false, deleteModalShow: false }
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'customer')
            .then(res => res.json())
            .then(data => {
                this.setState({ stor: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    render() {
        const { stor } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false, editModalShow: false, deleteModalShow: false  });
        return (
            <div className="container">
                <Button variant="primary" onClick={() => this.setState({ addModalShow: true })}>
                    New Store
                </Button>
                <AddStoreModal show={this.state.addModalShow}
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
                        {stor.map(c =>
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