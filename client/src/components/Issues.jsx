import React from 'react';
import ReactDOM from 'react-dom';

class Issues extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showReportButton: false
    }
    this.displayReportButton = this.displayReportButton.bind(this);
  }

  displayReportButton() {
    this.setState({showReportButton: !this.state.showReportButton})
    console.log('this.state.showReportButton: ', this.state.showReportButton)
  }

  render() {
    return(
      <div className="grid">
        <h3 className="reports" onMouseEnter={this.displayReportButton}>Reports</h3>
          {
            this.state.showReportButton &&
            <a href="/newissue" className="reports-body">Report New Issue</a>
          }
        <h3 className="scheduled">Scheduled</h3>
        <h3 className="ip">In Progress</h3>
        <h3 className="fixed">Fixed</h3>
      </div>
    )
  }
}

export default Issues;