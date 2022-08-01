import React, { Component } from 'react';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
        this.class = 'alert';
    }

    getStyle = () => {
        return {
            color: this.color,
        };
    }

    getClass = () => {
        return this.class;
    }

    render() {
        return (
            <div className={`alert ${this.getClass()}`}>
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        );
    }
}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = '#606c38';
        this.class = 'info-alert';
    }
}

class WarningAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'orange';
        this.class = 'warning-alert';
    }
}

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'red';
        this.class = 'error-alert';
    }
}

class OfflineAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'blue';
        this.class = 'offline-alert';
    }
}

export { InfoAlert, WarningAlert, ErrorAlert, OfflineAlert };