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
        const { cust, custid, custname, custadd } = this.state;
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
                            <Table.Row key={c.id}>
                                <Table.Cell>{c.name}</Table.Cell>
                                <Table.Cell>{c.address}</Table.Cell>
                                <Table.Cell>
                                    <Button color="yellow" onClick={() => this.setState({ editModalShow: true, custid: c.id, custname: c.name, custadd: c.address })}>
                                        <Icon link name="edit" />
                                        EDIT
                                        {/*propsId*/}
                                    </Button>
                                    <EditCustomerModal show={this.state.editModalShow}                 
                                        onHide={ModalClose} custid={custid} custname={custname} custadd={custadd}/>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button color="red" onClick={() => this.setState({ deleteModalShow: true, custid: c.id })}>
                                        <Icon link name="trash" />
                                        DELETE
                                        {/*propsId*/}
                                    </Button>
                                    <DeleteCustomerModal show={this.state.deleteModalShow}
                                        onHide={ModalClose} custid={custid} />
                                </Table.Cell>
                            </Table.Row>)
                         }
                    </Table.Body>
                </Table>                      
            </div>
        )
    }
}