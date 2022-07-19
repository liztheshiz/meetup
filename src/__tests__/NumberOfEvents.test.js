import React from 'react';
import { shallow } from 'enzyme';

import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => { }} />);
    });

    test('render text input in NumberOfEvents', () => {
        expect(NumberOfEventsWrapper.find('.render-number')).toHaveLength(1);
    });

    test('default number of events is 32', () => {
        let NumberOfEventsWrapper = shallow(<NumberOfEvents />);
        expect(NumberOfEventsWrapper.find('.render-number').prop('value')).toBe(32);
    });

    test('change state when text input changes', () => {
        NumberOfEventsWrapper.setState({
            renderNumber: '32'
        });
        const eventObject = { target: { value: 6 } };
        NumberOfEventsWrapper.find('.render-number').simulate('change', eventObject);
        expect(NumberOfEventsWrapper.state('renderNumber')).toBe(6);
    });
});