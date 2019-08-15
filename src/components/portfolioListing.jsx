import React, { Component } from 'react';
import { Container, Row, Col, Collapse, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from "reactstrap";
import CardImage from "./cardImage";
import { store } from '../redux/store';
import { Link } from "react-router-dom";

/**
 * @author abhijitp
 * @description Lists down the available exchanges
 */
class PortfolioListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      btnDropLeft: undefined,
      btnDropright: undefined
    }
  }

  toggle = () => {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    console.log("folio store: ", store.getState());
    let portfolioList = new Array(10);
    return (
      <div className="portfolio-listing p-5">
        <Container>
          <header />
          <div className="page-header">
            <div><h1>Here are a few recommendations for you to choose from</h1></div>
            <div className="py-4">
              <div>
                <h3>Use the filters to further zone in
                <div className="d-inline-block px-3" onClick={this.toggle} style={{ marginBottom: '1rem' }}>&#8693;</div></h3>
              </div>
              <Collapse isOpen={this.state.collapse}>
                <Row>
                  <Col sm={12} md={6}>
                    <label>Risk Level</label>
                    <Dropdown className="d-inline-block px-5"
                      isOpen={this.state.btnDropLeft} toggle={() => { this.setState({ btnDropLeft: !this.state.btnDropLeft }); }}>
                      <DropdownToggle caret>
                        All
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>Foo Action</DropdownItem>
                        <DropdownItem>Bar Action</DropdownItem>
                        <DropdownItem>Quo Action</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </Col>
                  <Col sm={12} md={6}>
                    <label>Region</label>
                    <Dropdown className="d-inline-block px-5"
                      isOpen={this.state.btnDropright} toggle={() => { this.setState({ btnDropright: !this.state.btnDropright }); }}>
                      <DropdownToggle caret>
                        All
                    </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>Foo Action</DropdownItem>
                        <DropdownItem>Bar Action</DropdownItem>
                        <DropdownItem>Quo Action</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </Col>
                </Row>
              </Collapse>
            </div>
            <hr />
          </div>
          <div className="portfolio py-4">
            <div className="portfolio-title">
              <h3><b>14 portfolio recommendations based on your profile</b></h3>
              <hr />
            </div>
            <div className="portfolio-list">
              <Row>
                {
                  [1, 2, 3, 4,1,1,1,1,1].map((folio, index) => (
                    <Col sm={6} md={4} key={index}>
                      <div className="card my-2" style={{ width: "18rem" }}>
                        <CardImage />
                        <div className="card-body p-0">
                          <div className="list-row d-flex justify-content-between border-bottom p-2">
                            <div>Volatility</div>
                            <div>26.8%</div>
                          </div>
                          <div className="list-row d-flex justify-content-between border-bottom p-2">
                            <div>Volatility</div>
                            <div>26.8%</div>
                          </div>
                          <div className="list-row d-flex justify-content-between border-bottom p-2">
                            <div>Volatility</div>
                            <div>26.8%</div>
                          </div>
                        </div>
                        <Button className="w-100 rounded-0" color="danger">
                          <Link className="text-light" to="/customise">Explore Investment Idea</Link>
                        </Button>
                      </div>
                    </Col>
                  ))
                }
              </Row>
            </div>
          </div>
        </Container>
        {/* <style jsx>{`
        .list-row {
          font-size: 12px;
        }
        `}</style> */}
      </div>
    );
  }
}

export default PortfolioListing;