# Meetup

## Description

This app provides a list of upcoming events for any given city, with data provided by Google Calendar. The app works offline using cached data from the last time it was used online. The user can serach for events in a specific city or browse all events, customize how many events are shown on screen, click an event for more details, and see how many events are upcoming in certain cities.

### User stories

#### Feature 1
As a user, I should be able to filter events by city so that I can see the list of events that take place in that city.

#### Feature 2
As a user, I should be able to show/hide event details so that I can can see more or less information about an event without being overwhelmed by clutter.

#### Feature 3
As a user, I should be able to specify the number of events so I can control how many events are displayed on my screen, whether it's many or few.

#### Feature 4
As a user, I should be able to use the app when offline so that my use is not disrupted without an internet connection, and I can more easily use the app on the go.

#### Feature 5
As a user, I should be able to visualize data so that it is easier to understand and process the information I am receiving on screen.

### Scenarios

#### Feature 1
Given that the user hasn’t searched for any city, when the user opens the app, then the user should see a list of all upcoming events.

Given that the main page is open, when the user starts typing in the city textbox, then the user should see a list of cities (suggestions) that match what they’ve typed.

Given that the user was typing “Berlin” in the city textbox and the list of suggested cities is showing, when the user selects a city (e.g., “Berlin, Germany”) from the list, then their city should be changed to that city (i.e., “Berlin, Germany”) and the user should receive a list of upcoming events in that city.

#### Feature 2
Given that the app has not yet been opened, when the user opens the app, then all event elements should be collapsed.

Given that an event's details are hidden, when the user clicks on that event, then more details about that event should be shown.

Given that an event's details are shown, when the user clicks on that event, then the details should be hidden.

#### Feature 3
Given that the app has not yet been opened, when the user opens the app, then 32 events should be shown on screen.

Given that the main page is open, when the user enters a number (e.g., 10), then that number of events (i.e., 10) should be shown on screen.

#### Feature 4
Given that there is no internet connection, when the user opens the app/continues to use it, then cached data from last usage should still be available and interaction with that data should be seamless.

Given that there is no internet connection, when the user changes the settings, then an error message should pop up.

#### Feature 5
Given that there are some upcoming events in a given city, when the user views events for that city, then there should be a chart with the number of upcoming events for that city.

## Dependencies

- React

## API

This app used the Google Calendar API to fetch information about upcoming events by location.