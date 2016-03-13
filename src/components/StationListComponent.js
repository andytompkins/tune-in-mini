'use strict';

import React from 'react';

require('styles/StationList.css');

class StationListComponent extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      'search': ''
    };
    this.handleStationClick = this.handleStationClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  
  handleStationClick(id, event) { // eslint-disable-line no-unused-vars
    if (this.props.changer !== null && typeof this.props.changer == 'function') {
      this.props.changer(id);
    }
    return true;
  }
  
  handleSearch(event) {
    this.setState({ 'search': event.target.value });
    return true;
  }
  
  render() {
    return (
      <div className="stationlist-component">
        <input type="text" placeholder="Search by tags" value={ this.state.search } onChange={ this.handleSearch.bind(this) } />
        <ul>
          { this.props.stations.filter((val) => {
            if (typeof this.state.search === 'undefined' || this.state.search === '') { return true; }
            //console.log("tags are " + val.tags.toString() + " search is " + this.state.search);
            return val.tags.toString().indexOf(this.state.search) !== -1;
          }).map((station, index) => { // eslint-disable-line no-unused-vars
            return <li className="clickable" key={ station.id } onClick={ this.handleStationClick.bind(this, station.id) }>
              { station.name }
              <span className="tags">[{ station.tags.join(' ') }]</span>
            </li>;
          })}
        </ul>
      </div>
    );
  }
}

StationListComponent.displayName = 'StationListComponent';

// Uncomment properties you need
StationListComponent.propTypes = {
  'stations': React.PropTypes.array.isRequired,
  'changer': React.PropTypes.func.isRequired
};
StationListComponent.defaultProps = {
  'stations': [],
  'changer': null
};

export default StationListComponent;
