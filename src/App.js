import React from 'react';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

import { extractLocations, getEvents } from './api';

import './App.css';
import './nprogress.css';

class App extends React.Component {
    updateEvents = (location, eventCount) => {
        if (eventCount === undefined) { eventCount = this.state.numberOfEvents }
        if (location === undefined) { location = this.state.selectedLocation }

        getEvents().then((events) => {
            let locationEvents = (location === 'all') ? events
                : events.filter((event) => event.location === location);

            this.setState({
                events: locationEvents.slice(0, eventCount),
                numberOfEvents: eventCount,
                selectedLocation: location
            });
        });
    }

    constructor() {
        super();
        this.state = {
            events: [],
            locations: [],
            numberOfEvents: 32,
            selectedLocation: 'all'
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
        this.mounted = true;
        getEvents().then((events) => {
            this.setState({ events, locations: extractLocations(events) });
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }
}

export default App;
