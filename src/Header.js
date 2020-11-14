import React, { Component } from 'react';
import {
    Navbar, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Input, Col
} from 'reactstrap';



class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false, 
            isModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin (event) {
        this.toggleModal();
        alert("Username: "+this.username.value +  " Password:" + this.password.value
        + " Remember: " + this.remember.checked);
        event.preventDefault();
    }

    render() {
        return (
            <>
                <Navbar dark expand="md" >
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button outline onClick={this.toggleModal}>
                                        <span className="fa fa-sign-in fa-lg"> Login</span>
                                    </Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>

                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Welcome to 1 Billiontech</h1>
                            </div>
                        </div>
                    </div>
                </Jumbotron>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="firstname">First Name</Label>
                                <Input type="firstname" name="firstname" id="firstname"
                                    innerRef={(input)=> this.firstname = input} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="lastname">Last Name</Label>
                                <Input type="lastname" name="lastname" id="lastname"
                                    innerRef={(input)=> this.lastname = input} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="username" name="username" id="username"
                                    innerRef={(input)=> this.username = input} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" name="password" id="password" 
                                    innerRef={(input)=> this.password = input}/>
                            </FormGroup>

                            <Button type="submit" color="primary" value="submit" >Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

export default Header;