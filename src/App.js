import React from 'react';

import {
    BarChart, Bar, PieChart, Pie, XAxis, YAxis, Tooltip, ResponsiveContainer
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
        });
        return data;
    };

    getBarData = () => {
        const { locations, events } = this.state;
        const data = locations.map((location) => {
            const number = events.filter((event) => event.location === location).length;
            const city = location.split(', ').shift();
            return { city, number };
        });
        return data;
    }

    getPieData = () => {
        const { events } = this.state;
        const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
        const data = genres.map((genre) => {
            const value = events.filter((event) => event.summary.includes(genre)).length;
            return { "name": genre, value };
        });
        return data.filter(item => item.value > 0); // filter out genres not in current data set
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
                    <div className="visualized-data">
                        <div className="pie-chart">
                            <h4>Genre distribution</h4>
                            <ResponsiveContainer height={400} width="99%">
                                <PieChart>
                                    <Pie data={this.getPieData()} dataKey="value" cx="50%" cy="50%"
                                        outerRadius="50%" labelLine={false} fill="#283618"
                                        label={({ name }) => `${name}`} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="bar-chart">
                            <h4>Event distribution by city</h4>
                            <ResponsiveContainer height={400} width="99%">
                                <BarChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }} data={this.getBarData()} layout="vertical" barCategoryGap={3}>
                                    <XAxis type="number" />
                                    <YAxis type="category" name="city" dataKey="city" tick={{ fontSize: '13px', fill: "#283618" }} width={100} />
                                    <Tooltip />
                                    <Bar dataKey="number" fill="#283618" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
                    <EventList events={events} />
                </div>

            </div >
        );
    }

    //

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
