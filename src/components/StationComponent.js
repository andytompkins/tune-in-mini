'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

require('styles/Station.css');

class StationComponent extends React.Component {
  
  constructor(props) {
    super(props);
    console.log("station cons");
    this.state = {
      'lastStation': -1
    };
    this.audio = null;
  }
  
  componentDidMount() {
    this.audio = ReactDOM.findDOMNode(this.refs.audioPlayer);
  }
  
  componentDidUpdate() {
    if (this.props.station.id !== this.state.lastStation && this.audio !== null) {
      this.audio.load();
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.state.lastStation === -1) {
      this.setState({ 'lastStation': nextProps.station.id });
    } else if (this.props.station.id !== nextProps.station.id && this.audio !== null) {
      // this is not ideal.
      this.audio.pause();
    }
  }
  
  render() {
    console.dir(this.props);
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

// Uncomment properties you need
StationComponent.propTypes = {
  'station': React.PropTypes.object.isRequired
};
StationComponent.defaultProps = {
  'station': {}
};

export default StationComponent;
