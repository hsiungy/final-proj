import React, { Component } from 'react';
import Item from './Item';

class List extends Component {
    render() {
        return (
            <ol className="list">
                {this.props.venues && this.props.venues.map((venue, index) => 
                    <Item key={index} {...venue} handleItemClick={this.props.handleItemClick} />)}
            </ol>
        )
    }
}

export default List; 