import React, { Component } from 'react';

class NumberOfEvents extends Component {
    handleInputChanged = (event) => {
        this.setState({
            renderNumber: event.target.value
        });
    }

    constructor() {
        super();
        this.state = {
            renderNumber: 32
        }
    }

    render() {
        const { renderNumber } = this.state;

        return (
            <div className="number-of-events">
                <input type="text" className="render-number" value={renderNumber} onChange={this.handleInputChanged}></input>
            </div>
        );
    }
}

export default NumberOfEvents;