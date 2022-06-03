import React, { Component } from 'react';
//import { Table } from 'react-bootstrap';
import { Button, Icon, Table } from 'semantic-ui-react';
import { AddCustomerModal } from './AddCustomerModal';

export class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = { cust: [], addModalShow: false, editModalShow: false, deleteModalShow: false }
    }

   refreshList() {
       fetch(process.env.REACT_APP_API + 'customer')
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
        const { cust } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        return (
            <div className="container">
                <Button primary onClick={() => this.setState({ addModalShow: true })}>
                    <Icon link name="add" />
                    New Customer
                </Button>
                <AddCustomerModal show={this.state.addModalShow}
                    onHide={addModalClose} />
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
                                    <Button variant="warning" onClick={() => this.setState({ editModalShow: true })}>
                                        <Icon link name="edit" />
                                        EDIT
                                    </Button>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button variant="danger" onClick={() => this.setState({ deleteModalShow: true })}>
                                        <Icon link name="trash" />
                                        DELETE
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