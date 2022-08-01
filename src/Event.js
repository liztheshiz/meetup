import React, { Component } from "react";

class Event extends Component {
    toggleDetails = () => {
        let string = this.state.show ? 'View details' : 'Hide details';
        this.setState({ buttonText: string, show: !this.state.show });
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
            show: false,
            buttonText: 'View details'
        }
    }

    render() {
        const { event } = this.props;
        const { show, buttonText } = this.state;

        return (
            <div className="event">
                <h3 className="event-title">{event.summary}</h3>
                <div className="event-info">
                    <div className="event-info_location">{event.location}</div>
                    <div className="event-info_date">{this.getDate(event.start.dateTime, event.start.timeZone)}</div>
                </div>
                {show && <div className="event-details">{event.description}</div>}
                <button className="details-button" onClick={this.toggleDetails}>{buttonText}</button>
            </div>
        );
    }
}
export default Event;