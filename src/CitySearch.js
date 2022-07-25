import React, { Component } from 'react';

import { InfoAlert } from './Alert';

class CitySearch extends Component {
    handleInputChanged = (event) => {
        const value = event.target.value;
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        if (suggestions.length === 0) {
            this.setState({
                query: value,
                infoText: 'We cannot find the city you are looking for. Please try another city'
            })
        } else {
            this.setState({
                query: value,
                suggestions,
                infoText: ''
            });
        }
    }

    handleItemClicked = (suggestion) => {
        this.props.updateEvents(suggestion);
        this.setState({
            query: suggestion,
            suggestions: [],
            showSuggestions: false,
            infoText: ''
        });
    }

    constructor() {
        super();

        this.state = {
            query: '',
            suggestions: [],
            showSuggestions: undefined,
            infoText: ''
        }
    }

    render() {
        return (
            <div className="city-search">
                <InfoAlert text={this.state.infoText} />
                <input
                    type="text"
                    className="city"
                    value={this.state.query}
                    onChange={this.handleInputChanged}
                    onFocus={() => { this.setState({ showSuggestions: true }) }}
                />
                <ul className="suggestions" style={this.state.showSuggestions ? {} : { display: 'none' }}>
                    {this.state.suggestions.map((suggestion) => (
                        <li key={suggestion} onClick={() => this.handleItemClicked(suggestion)}>{suggestion}</li>
                    ))}
                    <li className="suggestions_see-all" key="all" onClick={() => this.handleItemClicked('all')}>
                        <b>See all cities</b>
                    </li>
                </ul>
            </div>
        );
    }
}

export default CitySearch;