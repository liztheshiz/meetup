import React, { Component } from "react";

class Event extends Component {
    toggleDetails = () => {
        this.setState({ show: !this.state.show });
    }

    getDate = (string, zone) => {
        let date = new Date(string);
        let dateString = new Intl.DateTimeFormat('en-us', { dateStyle: 'long', timeStyle: 'short' }).format(date);
        let dateString2 = date.toLocaleDateString('en-us', { timeZone: zone, month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', timeZoneName: 'short' });
        return dateString2;
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
            <div className="event">
                <h3 className="event-title">{event.summary}</h3>
                <div className="event-info">
                    <div className="event-info_location">{event.location}</div>
                    <div className="event-info_date">{this.getDate(event.start.dateTime, event.start.timeZone)}</div>
                </div>
                {show && <div className="event-details">{event.description}</div>}
                <button className="details-button" onClick={this.toggleDetails}>View details</button>
            </div>
        );
    }
}
export default Event;