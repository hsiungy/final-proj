import React, { Component } from 'react';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import FoursquareAPI from './API/';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12,
      setSuperState: obj => {
        this.setState(obj);
      }
    }
  }

  componentDidMount() {
    FoursquareAPI.search({
      near: 'San Francisco, CA',
      query: 'cafe',
      limit: 10
    }).then(res => {
      const {venues} = res.data.response;
      const {center} = res.data.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          id: venue.id,
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true
        }
      });
      this.setState({venues, center, markers});
    })
    .catch(err => {
      console.log(err);
    });
  }

  handleMarkerClick = marker => {
    this.closeAllInfoWindows();
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers, marker)});
  }

  handleItemClick = item => {
    const clickedMarker = this.state.markers.find(marker => marker.id === item.id);
    this.handleMarkerClick(clickedMarker);
  }

  closeAllInfoWindows = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({markers: Object.assign(this.state.markers, markers)});
  }

  render() {
    return (
      <div className="App">
        <Sidebar {...this.state} handleItemClick={this.handleItemClick} closeAllInfoWindows={this.closeAllInfoWindows}/>
        <Map {...this.state} handleMarkerClick={this.handleMarkerClick}/>
      </div>
    );
  }
}

export default App;
