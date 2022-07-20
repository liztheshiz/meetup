import React, { Component } from 'react';

class CitySearch extends Component {
    handleInputChanged = (event) => {
        const value = event.target.value;
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        this.setState({
            query: value,
            suggestions
        });
    }

    handleItemClicked = (suggestion) => {
        this.props.updateEvents(suggestion);
        this.setState({
            query: suggestion,
            showSuggestions: false
        });
    }

    constructor() {
        super();

        this.state = {
            query: '',
            suggestions: [],
            showSuggestions: undefined
        }
    }

    render() {
        return (
            <div className="city-search">
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