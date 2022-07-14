const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar("v3");

// Allows access levels to be set
// Here it's read only
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

// Allows access to calendar with credentials from config.json
const credentials = {
    client_id: process.env.CLIENT_ID,
    project_id: process.env.PROJECT_ID,
    client_secret: process.env.CLIENT_SECRET,
    calendar_id: process.env.CALENDAR_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    redirect_uris: ["https://liztheshiz.github.io/meetup"],
    javascript_origins: ["https://liztheshiz.github.io", "http://localhost:3000"]
};

const { client_secret, client_id, redirect_uris, calendar_id } = credentials;

const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
);

// Generates URL so user can log in with Google for authorization to see calendar
// Code for authorization sent along as URL param after logging in
module.exports.getAuthURL = async () => {
    // Scopes passed here must be enabled in OAuth consent screen settings in project in Google Console
    // Users will see scopes on consent screen
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            authUrl: authUrl,
        }),
    };
};
/*
'use strict';

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
*/
