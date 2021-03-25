
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AllCities from './components/navigation/AllCities';
import Header from './components/navigation/Header';
import ShortlistedCities from './components/navigation/ShortlistedCities';
import { Provider } from 'react-redux';
import store from './redux/store';
import FetchData from './components/navigation/FetchData';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Header />
          <FetchData />
          <Switch>
            <Route path="/" exact component={AllCities} />
            <Route path="/all" exact component={AllCities} />
            <Route path="/shortlisted" exact component={ShortlistedCities} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
