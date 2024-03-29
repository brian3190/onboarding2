﻿import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';
import { TrashFill } from 'react-bootstrap-icons';
import { AddStoreModal } from './AddStoreModal';
import { EditStoreModal } from './EditStoreModal';
import { DeleteStoreModal } from './DeleteStoreModal';

export class Store extends Component {
    constructor(props) {
        super(props);
        this.state = { stor: [], addModalShow: false, editModalShow: false, deleteModalShow: false }
    }

    refreshList() {
        fetch('https://onboarding2.azurewebsites.net/api/stores')
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
        const { stor, storeid, storename, storeadd } = this.state;
        let ModalClose = () => this.setState({ addModalShow: false, editModalShow: false, deleteModalShow: false  });
        return (
            <div className="container">
                <Button variant="primary" onClick={() => this.setState({ addModalShow: true })}>
                    New Store
                </Button>
                <AddStoreModal show={this.state.addModalShow}
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
                        {stor.map(c =>
                            <tr key={c.id}>
                                <td>{c.name}</td>
                                <td>{c.address}</td>
                                <td>
                                    <Button variant="warning" onClick={() => this.setState({ editModalShow: true, storeid: c.id, storename: c.name, storeadd: c.address })}>
                                        <PencilSquare color="white" />
                                        EDIT
                                    </Button>
                                    <EditStoreModal show={this.state.editModalShow}
                                        onHide={ModalClose} storeid={storeid} storename={storename} storeadd={storeadd}/>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => this.setState({ deleteModalShow: true, storeid: c.Id })}>
                                        <TrashFill color="white" />
                                        DELETE
                                    </Button>
                                    <DeleteStoreModal show={this.state.deleteModalShow}
                                        onHide={ModalClose} storeid={storeid} />
                                </td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}