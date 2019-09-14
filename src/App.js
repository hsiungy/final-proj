import React, { Component } from 'react';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import FoursquareAPI from './API/';
import './App.css';
import Hamburger_icon from './Hamburger_icon.svg.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: true,
      venues: [],
      markers: [],
      center: [],
      zoom: 12,
      setSuperState: obj => {
        this.setState(obj);
      }
    }
  }

  toggleSidebar() {
    this.setState({
      showSidebar: !this.state.showSidebar
    })
  }

  updateSidebar() {
    if (window.innerWidth < 1024) {
      this.setState({
        showSidebar: false
      })
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

    this.updateSidebar();
    window.addEventListener("resize", this.updateSidebar.bind(this));
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
        {this.state.showSidebar && 
          <Sidebar {...this.state} handleItemClick={this.handleItemClick} closeAllInfoWindows={this.closeAllInfoWindows}/>}
        <div id="map">
            <div className="hamburger">
                <img src={Hamburger_icon} alt="Toggle sidebar" onClick={this.toggleSidebar.bind(this)}></img>
            </div>
          <Map {...this.state} handleMarkerClick={this.handleMarkerClick}/>
        </div>
      </div>
    );
  }
}

export default App;
