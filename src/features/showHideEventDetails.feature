Feature: Show/hide event details

    Scenario: An event element is collapsed by default
        Given the app has not yet been opened
        When the user opens the app
        Then all event elements should be collapsed

    Scenario: User can expand an event to see its details
        Given an event's details are hidden
        When the user clicks on that event
        Then more details about that event should be shown

    Scenario: User can collapse an event to hide its details
        Given an event's details are shown
        When the user clicks on that event
        Then the details should be hidden