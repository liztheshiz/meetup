import React from 'react';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

import { extractLocations, getEvents } from './api';

import './App.css';
import './nprogress.css';

class App extends React.Component {
    updateEvents = (location, eventCount) => {
        getEvents().then((events) => {
            const locationEvents = (location === 'all') ? events
                : (location) ? events.filter((event) => event.location === location)
                    : this.state.events;

            if (eventCount) {
                this.setState({
                    numberOfEvents: eventCount
                });
            }

            // Truncate events array to length specified in param, or already in state if not given
            if (eventCount < this.state.numberOfEvents) { locationEvents.length = this.state.numberOfEvents; }

            this.setState({
                events: locationEvents
            });

        });
    }

    constructor() {
        super();
        this.state = {
            events: [],
            locations: [],
            numberOfEvents: 32
        }
    }

    render() {
        const { events, locations, numberOfEvents } = this.state;

        return (
            <div className="App">
                <CitySearch updateEvents={this.updateEvents} locations={locations} />
                <NumberOfEvents numberOfEvents={numberOfEvents} updateEvents={this.updateEvents} />
                <EventList events={events} />
            </div>
        );
    }

    componentDidMount() {
        getEvents().then((events) => {
            this.setState({ events, locations: extractLocations(events) });
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }
}

export default App;
