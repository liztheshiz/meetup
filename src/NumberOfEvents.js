import React, { Component } from 'react';

class NumberOfEvents extends Component {
    handleInputChanged = (event) => {
        this.props.updateEvents(undefined, event.target.value);
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
                <p className="input-label">Number of Events:</p>
                <input id="render-number" type="number" className="render-number" value={renderNumber} onChange={this.handleInputChanged}></input>
            </div>
        );
    }
}

export default NumberOfEvents;