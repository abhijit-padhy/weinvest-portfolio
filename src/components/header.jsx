import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavItem, NavLink, Nav, NavbarToggler, Collapse } from "reactstrap";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <header>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">CGSCIMB</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/portfolio">Login</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header;