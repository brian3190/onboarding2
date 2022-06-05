import React, { Component } from 'react';
//import { Table } from 'react-bootstrap';
import { Button, Icon, Table } from 'semantic-ui-react';
import { AddCustomerModal } from './AddCustomerModal';
import { EditCustomerModal } from './EditCustomerModal';
import { DeleteCustomerModal } from './DeleteCustomerModal';

export class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = { cust: [], addModalShow: false, editModalShow: false, deleteModalShow: false }
    }

   refreshList() {
       fetch(process.env.REACT_APP_API + 'customers')
           .then(res => res.json())
           .then(data => {
               this.setState({ cust: data });
           });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    render() {
        const { cust, custid } = this.state;
        let ModalClose = () => this.setState({ addModalShow: false, editModalShow: false, deleteModalShow: false });
        return (
            <div className="container">
                <Button primary onClick={() => this.setState({ addModalShow: true })}>
                    <Icon link name="add" />
                    New Customer
                </Button>
                <AddCustomerModal show={this.state.addModalShow}
                    onHide={ModalClose} />
                <Table className="mt-4" striped bordered hover size="sm">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {cust.map(c =>
                            <Table.Row key={c.Id}>
                                <Table.Cell>{c.Name}</Table.Cell>
                                <Table.Cell>{c.Address}</Table.Cell>
                                <Table.Cell>
                                    <Button variant="warning" onClick={() => this.setState({ editModalShow: true, custid: c.Id })}>
                                        <Icon link name="edit" />
                                        EDIT
                                        {/*propsId*/}
                                        <EditCustomerModal show={this.state.editModalShow} 
                                            
                                            onHide={ModalClose} />
                                    </Button>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button variant="danger" onClick={() => this.setState({ deleteModalShow: true, custid: c.Id })}>
                                        <Icon link name="trash" />
                                        DELETE
                                        {/*propsId*/}
                                        <DeleteCustomerModal show={this.state.deleteModalShow}
                                            onHide={ModalClose} custid={custid} />
                                    </Button>
                                </Table.Cell>
                            </Table.Row>)
                         }
                    </Table.Body>
                </Table>                      
            </div>
        )
    }
}