# Meetup

## Description

This app provides a list of upcoming events for any given city, with data provided by Google Calendar. The app works offline using cached data from the last time it was used online. The user can search for events in a specific city or browse all events, customize how many events are shown on screen, click an event for more details, and see how many events are upcoming in certain cities.

## How to Use This App

When first opening the app, you will be prompted to sign in with Google in order to gain access to the Google Calendar API. Then, you can specify what city and how many events to view, and click on an event to view more details!

## Dependencies

- HTML5
- CSS3
- JavaScript (ES6)
- React
- React-DOM
- React-Scripts
- Axios
- NProgress
- Recharts

## API

This app used the Google Calendar API to fetch information about upcoming events by location.

## A Note On Privacy

The Meetup app requires you to sign in with Google in order to access the data from its Google Calendar. This access goes both ways, as Meetup can also access the user's calendar, HOWEVER it DOES NOT and will never be given this functionality. Rest assured, the app does not attempt to do anything with the Google user's information in any way. The app is also currently in the process of being verified, but this may take some time; Google has a lot on their plate.