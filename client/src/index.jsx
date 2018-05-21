import React from 'react';
import ReactDOM from 'react-dom';
import Issues from './components/Issues.jsx';
import Newissue from './components/Newissue.jsx';
require('./assets/styles/index.css')

class App extends React.Component {
  render() {
    return (
      <div>
        <Issues />
        <Newissue />
      </div>
    )

  }
}

ReactDOM.render(<App />, document.getElementById('app'))