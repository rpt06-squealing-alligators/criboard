import React from 'react';
import ReactDOM from 'react-dom';
import Issues from './components/Issues.jsx'
require('./assets/styles/index.css')

class App extends React.Component {
  render() {
    return (
      <div>
        <Issues />
      </div>
    )

  }
}

ReactDOM.render(<App />, document.getElementById('app'))