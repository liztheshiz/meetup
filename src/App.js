import React from 'react';

import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { OfflineAlert } from './Alert';

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

    getData = () => {
        const { locations, events } = this.state;
        const data = locations.map((location) => {
            const number = events.filter((event) => event.location === location).length;
            const city = location.split(', ').shift();
            return { city, number };
        })
        return data;
    };

    constructor() {
        super();
        this.state = {
            events: [],
            locations: [],
            numberOfEvents: 32,
            selectedLocation: 'all',
            showWelcomeScreen: undefined,
            offlineText: ''
        }
    }

    render() {
        const { events, locations, numberOfEvents, offlineText } = this.state;

        if (this.state.showWelcomeScreen === undefined) return <div className="App" />

        return (
            <div className="App">
                <div className="content-container">
                    <OfflineAlert text={offlineText} />
                    <div className="app-header">
                        <h1 className="app-title">Welcome to Meetup</h1>
                        <h2 className="app-subtitle">Enter location below: </h2>
                    </div>
                    <CitySearch updateEvents={this.updateEvents} locations={locations} />
                    <NumberOfEvents numberOfEvents={numberOfEvents} updateEvents={this.updateEvents} />
                    <h4>Events in each city</h4>

                    <ScatterChart
                        width={400}
                        height={400}
                        margin={{
                            top: 20, right: 20, bottom: 20, left: 20,
                        }}
                    >
                        <CartesianGrid />
                        <XAxis type="number" dataKey="x" name="stature" unit="cm" />
                        <YAxis type="number" dataKey="y" name="weight" unit="kg" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter data={this.getData()} fill="#8884d8" />
                    </ScatterChart>
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
        let isTokenValid;
        const isLocalTesting = window.location.href.startsWith('http://localhost');
        if (isLocalTesting) { isTokenValid = true }
        if (isLocalTesting || (accessToken && !navigator.onLine)) {
            console.log('not online; token valid by default');
            isTokenValid = true;
        } else {
            isTokenValid = (await checkToken(accessToken)).error ? false : true;
        }
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

        if (!navigator.onLine) {
            this.setState({
                offlineText: "You're offline! Using data from your last visit...",
            });
        } else {
            this.setState({
                offlineText: '',
            });
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }
}

export default App;
