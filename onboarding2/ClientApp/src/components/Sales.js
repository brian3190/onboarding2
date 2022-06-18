import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';
import { TrashFill } from 'react-bootstrap-icons';
import { AddSaleModal } from './AddSaleModal';
import { EditSaleModal } from './EditSaleModal';
import { DeleteSaleModal } from './DeleteSaleModal';

export class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = { sales: [], addModalShow: false, editModalShow: false, deleteModalShow: false }
    }

    refreshList() {
        fetch('https://onboarding2.azurewebsites.net/api/sales')
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

    render() {
        const { sales, datesold, saleid, custname, storname, prodname } = this.state;
        let ModalClose = () => this.setState({ addModalShow: false, editModalShow: false, deleteModalShow: false  });
        return (
            <div className="container">
                <ButtonToolbar>
                    <Button variant="primary" onClick={() => this.setState({ addModalShow: true })}>
                        New Sale
                    </Button>
                    <AddSaleModal show={this.state.addModalShow}
                        onHide={ModalClose} />
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
                        {sales.map((c, index) =>
                            <tr key={c.id} >
                                <td>{c.customer.name}</td>
                                <td>{c.product.name}</td>
                                <td>{c.store.name}</td>
                                <td>{c.dateSold}</td>
                                <td>
                                    <Button variant="warning"
                                        onClick={() => this.setState({
                                            editModalShow: true,
                                            datesold: c.dateSold,
                                            saleid: c.id,
                                            custname: c.customer.name,
                                            prodname: c.product.name,
                                            storname: c.store.name
                                        })}>
                                        <PencilSquare color="white"/>
                                        EDIT
                                    </Button>
                                    <EditSaleModal show={this.state.editModalShow}
                                        onHide={ModalClose} datesold={datesold} custname={custname} prodname={prodname} storname={storname}/>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => this.setState({ deleteModalShow: true, saleid: c.Id })}>
                                        <TrashFill color="white"/>
                                        DELETE
                                    </Button>
                                    <DeleteSaleModal show={this.state.deleteModalShow}
                                        onHide={ModalClose} saleid={saleid}/>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        )
    }
}