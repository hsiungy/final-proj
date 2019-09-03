import React, { Component } from 'react';
import List from './List';

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ''
        }
    }

    filter = e => {
        const query = e.target.value;
        this.setState({query});
        const markers = this.props.venues.map(venue => {
            const match = venue.name.toLowerCase().includes(query.toLowerCase());
            const marker = this.props.markers.find(marker => marker.id === venue.id);
            marker.isVisible = match;
            return marker;
        });
        this.props.setSuperState({markers});
    }

    filterItems = () => {
        const query = this.state.query.trim();
        if (query !== '') {
            return this.props.venues.filter(venue => 
                venue.name.toLowerCase().includes(query.toLowerCase())
            );
        }
        return this.props.venues;
    }

    render() {
        return (
            <div className="sidebar">
                <input type="search" id="search" placeholder="Filter" onChange={this.filter}></input>
                <List {...this.props} venues={this.filterItems()}/>
            </div>
        )
    }
}

export default Sidebar; 