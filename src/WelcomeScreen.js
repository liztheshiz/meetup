import React from "react";

import './WelcomeScreen.css';

function WelcomeScreen(props) {
    return props.showWelcomeScreen ?
        (
            <div className="WelcomeScreen">
                <h1>Welcome to Meetup</h1>
                <h4>
                    Log in to see upcoming events for full-stack developers in cities around the world
                </h4>
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
                <a
                    href="https://liztheshiz.github.io/meetup/privacy.html"
                    rel="nofollow noopener"
                >
                    Privacy policy
                </a>
            </div>
        )
        : null
}
export default WelcomeScreen;