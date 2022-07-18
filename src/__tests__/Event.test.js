import React from 'react';
import { shallow } from 'enzyme';

import { mockData } from '../mock-data';

import Event from '../Event';

describe('<Event /> component', () => {
    let event;
    let EventWrapper;
    beforeAll(() => {
        event = mockData[0];
        EventWrapper = shallow(<Event event={event} />);
    });

    test('render title in event item', () => {
        expect(EventWrapper.find('.event-title')).toHaveLength(1);
    });

    test('render info in event item', () => {
        expect(EventWrapper.find('.event-info')).toHaveLength(1);
    });

    test('render show more button in event item', () => {
        expect(EventWrapper.find('.details-button')).toHaveLength(1);
    });

    test('event title renders correctly', () => {
        expect(EventWrapper.find('.event-title').text()).toBe(event.summary);
    });

    test('event info renders correctly', () => {
        expect(EventWrapper.find('.event-info').text()).toContain(event.start.dateTime);
        expect(EventWrapper.find('.event-info').text()).toContain(event.start.timeZone);
        expect(EventWrapper.find('.event-info').text()).toContain(event.location);
    });

    test('event show/hide details works correctly', () => {
        expect(EventWrapper.find('.event-details')).toHaveLength(0);
        EventWrapper.setState({
            show: true
        });
        expect(EventWrapper.find('.event-details').text()).toContain(event.description);
    });

    test('event info begins hidden', () => {
        EventWrapper = EventWrapper = shallow(<Event event={event} />);
        expect(EventWrapper.state('show')).toBe(false);
    });

    test('when details hidden, clicking details button reveals details', () => {
        EventWrapper.setState({
            show: false
        });
        EventWrapper.find('.details-button').simulate('click');
        expect(EventWrapper.state('show')).toEqual(true);
    });

    test('when details shown, clicking details button hides details', () => {
        EventWrapper.setState({
            show: true
        });
        EventWrapper.find('.details-button').simulate('click');
        expect(EventWrapper.state('show')).toEqual(false);
    });
});