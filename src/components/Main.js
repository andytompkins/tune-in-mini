require('normalize.css');
require('styles/App.css');

import React from 'react';
import request from 'superagent';
import StationListComponent from 'components/StationListComponent';
import StationComponent from 'components/StationComponent';

let apiUrl = 'http://frontend-tunein.herokuapp.com/api/v1/stations';

class AppComponent extends React.Component {
  
  constructor(props) {
    super(props);
    this.req = null;
    this.state = {
      'selected': -1,
      'stations': []
    };
    this.changeSelected = this.changeSelected.bind(this);
  }
  
  componentDidMount() {
    this.req = request.get(apiUrl).end(function(err, res) {
      if (err || !res.ok) {
        console.log('error making request for data');
      } else {
        this.setState({ 'stations': res.body.data })
      }
    }.bind(this));
  }
  
  componentWillUnmount() {
    if (this.req !== null) {
      this.req.abort();
    }
  }
  
  changeSelected(newSelectionId) {
    for (var i = 0; i < this.state.stations.length; i++) {
      if (this.state.stations[i].id === newSelectionId) {
        this.setState({ 'selected': i });
        break;
      }
    }
  }
  
  render() {
    return (
      <div className="index">
        <StationListComponent stations={ this.state.stations } changer={ this.changeSelected } />
        {
          (() => {
            console.log("checking for station comp");
            if (this.state.selected !== -1 && this.state.stations.length > 0) {
              console.log("displaying it");
              console.dir(this.state);
              return (
                <StationComponent station={ this.state.stations[this.state.selected] } />
              );
            }
          })()
        }
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
