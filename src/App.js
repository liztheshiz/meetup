import React from 'react';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

import { extractLocations, getEvents } from './api';

import './App.css';
import './nprogress.css';

class App extends React.Component {
    updateEvents = (location) => {
        getEvents().then((events) => {
            const locationEvents = (location === 'all') ?
                events :
                events.filter((event) => event.location === location);
            this.setState({
                events: locationEvents
            });
        });
    }

    constructor() {
        super();
        this.state = {
            events: [],
            locations: []
        }
    }

    render() {
        const { events, locations } = this.state;

        return (
            <div className="App">
                <CitySearch updateEvents={this.updateEvents} locations={locations} />
                <NumberOfEvents />
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
