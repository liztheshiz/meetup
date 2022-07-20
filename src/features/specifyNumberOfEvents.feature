Feature: Specify number of events

    Scenario: When user hasn’t specified a number, 32 is the default number
        Given the app has not yet been opened
        When the user opens the app
        Then 32 events should be shown on screen

    Scenario: User can change the number of events they want to see
        Given the main page is open
        When the user enters a number (e.g., 10)
        Then that number of events (i.e., 10) should be shown on screen