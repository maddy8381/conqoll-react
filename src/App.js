import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AllCities from './components/navigation/AllCities';
import Header from './components/navigation/Header';
import ShortlistedCities from './components/navigation/ShortlistedCities';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={AllCities} />
          <Route path="/all" exact component={AllCities} />
          <Route path="/shortlisted" exact component={ShortlistedCities} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
