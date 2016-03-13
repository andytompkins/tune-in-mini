'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

require('styles/Station.css');

class StationComponent extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.audio = ReactDOM.findDOMNode(this.refs.audioPlayer);
  }
  
  componentDidUpdate() {
    if (typeof this.audio !== 'undefined' ) {
      this.audio.load();
    }
  }
  
  render() {
    if (!this.props.station.hasOwnProperty('id')) {
      return (
        <div className="station-component"></div>
      );
    }
    
    return (
      <div className="station-component">
        <p>Station: { this.props.station.name }</p>
        <p>Popularity: { this.props.station.popularity }</p>
        <p>Reliability: { this.props.station.reliability }</p>
        <p>Tags: { this.props.station.tags.toString() }</p>
        <img src={ this.props.station.imgUrl } />
        <audio ref='audioPlayer' controls autoPlay>
          <source ref='audioSource' src={ this.props.station.streamUrl } />
        </audio>
      </div>
    );
  }
}

StationComponent.displayName = 'StationComponent';

StationComponent.propTypes = {
  'station': React.PropTypes.object.isRequired
};
StationComponent.defaultProps = {
  'station': {}
};

export default StationComponent;
