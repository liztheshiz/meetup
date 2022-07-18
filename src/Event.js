import React, { Component } from "react";

class Event extends Component {
    toggleDetails = () => {
        this.setState({ show: !this.state.show });
    }

    constructor() {
        super();
        this.state = {
            show: false
        }
    }

    render() {
        const { event } = this.props;
        const { show } = this.state;

        return (
            <div>
                <h2 className="event-title">{event.summary}</h2>
                <div className="event-info">{event.start.dateTime} {event.start.timeZone} {event.location}</div>
                {show && <div className="event-details">{event.description}</div>}
                <button className="details-button" onClick={this.toggleDetails}></button>
            </div>
        );
    }
}
export default Event;