import React from 'react';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';

import { extractLocations, getEvents, checkToken, getAccessToken } from './api';

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
            selectedLocation: 'all',
            showWelcomeScreen: undefined
        }
    }

    render() {
        const { events, locations, numberOfEvents } = this.state;

        if (this.state.showWelcomeScreen === undefined) return <div className="App" />

        return (
            <div className="App">
                <div className="content-container">
                    <div className="app-header">
                        <h1 className="app-title">Welcome to Meetup</h1>
                        <h2 className="app-subtitle">Enter location below: </h2>
                    </div>
                    <CitySearch updateEvents={this.updateEvents} locations={locations} />
                    <NumberOfEvents numberOfEvents={numberOfEvents} updateEvents={this.updateEvents} />
                    <EventList events={events} />
                </div>

            </div>
        );
    }

    //<WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />

    /* for crediting background image:
    <a href="https://www.freepik.com/photos/desk-top-view">Desk top view photo created by freepik - www.freepik.com</a>
    */

    async componentDidMount() {
        this.mounted = true;
        const accessToken = localStorage.getItem('access_token');
        const isTokenValid = (await checkToken(accessToken)).error ? false :
            true;
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code");
        this.setState({ showWelcomeScreen: !(code || isTokenValid) });
        if ((code || isTokenValid) && this.mounted) {
            getEvents().then((events) => {
                if (this.mounted) {
                    this.setState({ events, locations: extractLocations(events) });
                }
            });
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }
}

export default App;
