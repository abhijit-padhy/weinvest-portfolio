import React, { Component } from 'react';
import { Container, Button, Table } from "reactstrap";
import { store } from "../redux/store";
const _ = require("lodash")

/**
 * @author abhijitp
 * @description Rebalance your investment
 */
class Customise extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      groupedData: {}
     }
  }

  componentDidMount() {
    let portfolio = store.getState().portfolio[0].constituents;
    this.groupByType(portfolio);
  }

  reducer = (arr, modelWeight) => {
    let sum = arr.reduce(function(total, constituent) {
      return total + Number((""+constituent[modelWeight ? "modelWeight" : "weight"]).split("%")[0])
    }, 0);
    return sum;
  }

  /** Given an array of constitutions it returns an object grouped by constitution type */
  groupByType = (data) => {
    if (data && data.length > 0) {
      let groupedData = {};
      groupedData = _.groupBy(data, "instrument['type']");
      let reqGroup = {};
      Object.keys(groupedData).map(type => {
        let obj = {};
        obj.values = groupedData[type].map(value => {
          let obj = {...value};
          obj.modelWeight = Number(value.weight.split("%")[0]);
          return obj;
        });
        obj.modelWeight = this.reducer(groupedData[type]);
        obj.weight = this.reducer(groupedData[type]);
        reqGroup[type] = obj;
      });
      console.log("Req group", reqGroup);
      this.setState({groupedData: reqGroup});
    }
  }

  lockConstituent = (group, cIndex) => {
    let groupedData = {...this.state.groupedData};
    groupedData[group]["values"][cIndex]["lock"] = true;
    this.setState({groupedData});
  }

  updateGroupedData = (group, cIndex, value) => {
    let groupedData = {...this.state.groupedData};
    groupedData[group]["values"][cIndex]["modelWeight"] = value;
    if (groupedData[group]["values"][cIndex]["weight"] != value) {
      groupedData[group]["values"][cIndex]["modified"] = true;
    }
    this.setState({groupedData});
  }

  ignoreAlteredReducer = (arr, modelWeight) => {
    let sum = arr.reduce(function(total, constituent) {
      return total + (constituent.modified ? 0 : Number((constituent["weight"]).split("%")[0]))
    }, 0);
    return sum;
  }

  rebalance = () => {
    let groupedData = {...this.state.groupedData};
    let currentWeight = 0;
    let unalteredWeight = 0;
    Object.keys(groupedData).map(group => {
      currentWeight += this.reducer(groupedData[group]["values"], true);
    });
    Object.keys(this.state.groupedData).map(group => {
      unalteredWeight += this.ignoreAlteredReducer(this.state.groupedData[group]["values"], true);
    });
    console.log("Net weight", currentWeight, unalteredWeight, this.state.groupedData);
    if (100 - currentWeight > 0) {
      Object.keys(groupedData).map(group => {
        groupedData[group]["values"].map(constituent => {
          if (!constituent.modified) {
            constituent["modelWeight"] = ((((100 - currentWeight)/unalteredWeight)+1)*Number(constituent.weight.split("%")[0])).toFixed(2);
          }
        });
      });
      this.setState({groupedData});
    } else {
      console.log("Net weight is more than total weight of 100%.");
      console.log("Please reduce some values");
    }
  }
  
  render() { 
    return ( 
      <div className="customise">
        <Container>
          <div className="page-header d-flex justify-content-between py-4">
            <div><h1>Portfolio constituents</h1></div>
            <div>
              <Button className="mx-3">Reset</Button>
              <Button className="mx-3" onClick={this.rebalance}>Rebalance</Button>
              <Button className="mx-3">Save & Continue</Button>
            </div>
          </div>
          <div className="page-body">
            <Table className="border">
              <thead>
                <tr>
                  <th className="text-left">Category/Stock</th>
                  <th>Model Weight(%)</th>
                  <th>Weight(100%)</th>
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(this.state.groupedData).map((group, gIndex) => (
                    <React.Fragment>
                    <tr className="border-danger group-row" key={gIndex+"g"}>
                      <td className="text-left"><b>{group}</b></td>
                      <td><b>{this.state.groupedData[group].weight}%</b></td>
                      <td><b>{this.state.groupedData[group].weight}%</b></td>
                    </tr>
                    {
                      this.state.groupedData[group].values.map((value, index) => (
                        <tr key={index+"v"} className={value.lock && "locked"}>
                          <td className="text-left">
                            <span className="px-2" onClick={(e) => this.lockConstituent(group, index)}>🔒</span>
                            {value.instrument.name}
                          </td>
                          <td>{value.weight}</td>
                          <td>
                            <span className="badge badge-secondary mx-2 rounded-circle cursor-pointer"
                              onClick={(e) => this.updateGroupedData(group, index, value.modelWeight+1)}>+</span>
                            <input type="number" className="text-center"
                             value={value.modelWeight} 
                             onChange={(e) => this.updateGroupedData(group, index, Number(e.target.value))} />
                            <span className="badge badge-secondary mx-2 rounded-circle cursor-pointer"
                              onClick={(e) => this.updateGroupedData(group, index, value.modelWeight-1)}>-</span>
                          </td>
                        </tr>
                      ))
                    }
                    </React.Fragment>
                  ))
                }
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
     );
  }
}
 
export default Customise;