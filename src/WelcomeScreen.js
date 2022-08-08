import React from "react";

import './WelcomeScreen.css';

function WelcomeScreen(props) {
    return props.showWelcomeScreen ?
        (
            <div className="WelcomeScreen">
                <h1>Welcome to Meetup</h1>
                <h3>
                    Log in to see upcoming events for full-stack developers in cities around the world
                </h3>
                <div className="button_cont" align="center">
                    <div class="google-btn">
                        <div class="google-icon-wrapper">
                            <img
                                class="google-icon"
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                alt="Google sign-in"
                            />
                        </div>
                        <button onClick={() => { props.getAccessToken() }}
                            rel="nofollow noopener"
                            class="btn-text"
                        >
                            <b>Sign in with google</b>
                        </button>
                    </div>
                </div>
                <h4>An important note on how this app uses your data:</h4>
                <p className="privacy-note">It doesn't! Meetup requires you to sign in with Google in order to give YOU access to the app's Google Calendar; that's it.
                    This also grants the app access to the user's calendar, but Meetup does not and will never access, collect or use the user's data in any way.
                    Please see the <a
                        href="https://liztheshiz.github.io/meetup/privacy.html"
                        rel="nofollow noopener"
                    >
                        privacy policy
                    </a> for a few more details.
                </p>

            </div>
        )
        : null
}
export default WelcomeScreen;