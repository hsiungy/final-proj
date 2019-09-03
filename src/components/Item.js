import React, { Component } from 'react';

class Item extends Component {
    render() {
        return (
            <li className="item" onClick={() => this.props.handleItemClick(this.props)}>
                {this.props.name}
            </li>
        )
    }
}

export default Item; 