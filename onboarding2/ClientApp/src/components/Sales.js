import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';
import { TrashFill } from 'react-bootstrap-icons';
//import { AddCustomerModal } from './AddCustomerModal';

export class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = { sales: [], addModalShow: false, editModalShow: false, deleteModalShow: false }
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'sales')
            .then(res => res.json())
            .then(data => {
                this.setState({ sales: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }
    //<AddSaleModal show={this.state.addModalShow}
    //onHide={addModalClose} />
    //<EditSaleModal show={this.state.editModalShow}
    //    onHide={editModalClose} />
    //<DeleteSaleModal show={this.state.deleteModalShow}
    //    onHide={deleteModalClose} />
    render() {
        const { sales } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false, editModalShow: false, deleteModalShow: false  });
        return (
            <div className="container">
                <ButtonToolbar>
                    <Button variant="primary" onClick={() => this.setState({ addModalShow: true })}>
                        New Sale
                    </Button>
                    
                </ButtonToolbar>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Store</th>
                            <th>Date Sold</th>
                            <th>Actions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(c =>
                            <tr key={c.Id}>
                                <td>{c.Customer}</td>
                                <td>{c.Product}</td>
                                <td>{c.Store}</td>
                                <td>{c.DateSold}</td>
                                <td>
                                    <Button variant="warning" onClick={() => this.setState({ editModalShow: true })}>
                                        {/* <i class="edit icon"></i> */}
                                        <PencilSquare color="white"/>
                                        EDIT
                                    </Button>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => this.setState({ deleteModalShow: true })}>
                                        {/* <i class="trash icon"></i> */}
                                        <TrashFill color="white"/>
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