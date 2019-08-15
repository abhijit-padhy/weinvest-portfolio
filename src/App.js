import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import './styles/main.scss';
import { store } from './redux/store';
import PortfolioListing from './components/portfolioListing';
import Customise from './components/customise';
import Header from './components/header';

const model_portfolios = [
  {
    id: 1,
    name: 'HONGKONG TECHNOLOGY',
    volatility: '26.8%',
    mean_return: '2.96%',
    currency: 'SGD',
    constituents: [
      {
        weight: "3%",
        instrument: {
          id: 1,
          name: 'CSX corp',
          type: 'Equity'
        }
      },
      {
        weight: "17%",
        instrument: {
          id: 2,
          name: 'cummins Inc',
          type: 'Equity'
        }
      },
      {
        weight: "10%",
        instrument: {
          id: 3,
          name: 'Eaton Corp PLC',
          type: 'Equity'
        }
      },
      {
        weight: "10%",
        instrument: {
          id: 4,
          name: 'Fedx corp',
          type: 'Equity'
        }
      },
      {
        weight: "10%",
        instrument: {
          id: 5,
          name: 'Haris corp',
          type: 'Equity'
        }
      },
      {
        weight: "10%",
        instrument: {
          id: 6,
          name: 'Norfolk Southern Corp',
          type: 'Bond'
        }
      },
      {
        weight: "5%",
        instrument: {
          id: 7,
          name: 'General Dynamics',
          type: 'Bond'
        }
      },
      {
        weight: "15%",
        instrument: {
          id: 8,
          name: 'hal',
          type: 'Bond'
        }
      },
      {
        weight: "20%",
        instrument: {
          id: 10,
          name: 'USD CASH',
          type: 'CASH'
        }
      }
    ]
  }
];

function App() {
  store.dispatch({ type: 'SET_PORTFOLIO', portfolio: model_portfolios });
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <PortfolioListing {...props} />} />
          <Route exact path="/portfolio" render={(props) => <PortfolioListing {...props} />} />
          <Route exact path="/customise" render={(props) => <Customise {...props} />} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
