# Fight Club WV Matrix Social Directory Structure

This document outlines the directory structure for the [Fight Club WV Matrix Social](https://github.com/username/fight-club-wv-matrix-social) repository, which hosts a Matrix protocol-based social media platform for the Fight Club WV community. The platform provides secure, encrypted group communication for fighters, admins, and members, with integration to the Fight Club WV API for notifications and updates.

```
fight-club-wv-matrix-social/
├── /client/                            # Client-side code for the Matrix social media app
│   ├── /src/                           # Source code for the web application
│   │   ├── /components/                # Reusable React components
│   │   │   ├── ChatRoom.js             # Component for rendering group chat rooms
│   │   │   ├── UserProfile.js          # Component for managing anonymous user profiles
│   │   │   ├── NotificationPanel.js    # Component for displaying API notifications
│   │   │   └── MessageInput.js         # Component for sending messages
│   │   ├── /pages/                     # Page components for the app
│   │   │   ├── Home.js                 # Landing page for the social platform
│   │   │   ├── Login.js                # Login page for Matrix authentication
│   │   │   ├── Channels.js             # Page listing available chat channels
│   │   │   └── Settings.js             # User settings and preferences
│   │   ├── /styles/                    # CSS and Tailwind CSS files
│   │   │   ├── main.css                # Main stylesheet with Tailwind classes
│   │   │   └── custom.css              # Custom CSS for Fight Club branding
│   │   ├── /utils/                     # Utility functions
│   │   │   ├── matrixClient.js         # Matrix SDK client configuration
│   │   │   └── apiIntegration.js       # Functions for Fight Club WV API integration
│   │   └── App.js                      # Main React app entry point
│   ├── /public/                        # Static assets for the web app
│   │   ├── index.html                  # Main HTML file for the app
│   │   ├── favicon.ico                 # Favicon for the app
│   │   └── /assets/                    # Images, logos, and other static files
│   │       ├── logo.png                # Fight Club WV logo (anonymized)
│   │       └── banner.jpg              # Banner image for the app
│   └── package.json                    # Node.js dependencies and scripts
├── /server/                            # Server-side configuration for Matrix server (optional)
│   ├── /config/                        # Configuration files for Matrix server
│   │   ├── homeserver.yaml             # Synapse server configuration
│   │   └── logging.yaml                # Logging configuration for Synapse
│   ├── /scripts/                       # Server management scripts
│   │   ├── start_server.sh             # Script to start the Matrix server
│   │   └── setup_synapse.sh            # Script to initialize Synapse server
│   └── README.md                       # Instructions for setting up the Matrix server
├── /docs/                              # Documentation for the Matrix social platform
│   ├── setup.md                        # Guide for setting up the client and server
│   ├── api_integration.md              # Documentation for Fight Club WV API integration
│   ├── user_guide.md                   # User guide for navigating the social platform
│   └── moderation.md                   # Guidelines for moderating the platform
├── /tests/                             # Test files for the client app
│   ├── /unit/                          # Unit tests for components and utilities
│   │   ├── ChatRoom.test.js            # Tests for ChatRoom component
│   │   └── matrixClient.test.js        # Tests for Matrix client functions
│   └── /integration/                   # Integration tests
│       └── apiNotification.test.js     # Tests for API notification integration
├── .gitignore                          # Git ignore file for node_modules, env, etc.
├── LICENSE                             # MIT License file
├── README.md                           # Main README for the Matrix social platform
└── deploy.sh                           # Script to deploy the client app
```

## Directory Descriptions
- **/client**: Contains the React-based web application for the Matrix social media platform, built with modern JavaScript and Tailwind CSS for styling. Uses the Matrix JS SDK for client-side communication with the Matrix server.
- **/client/src**: Source code for the React app, including components, pages, styles, and utilities for Matrix integration and API communication.
- **/client/public**: Static assets like HTML, favicon, and images for the web app.
- **/server**: Configuration and scripts for running a custom Matrix server (e.g., Synapse). This is optional if using an external Matrix provider.
- **/docs**: Documentation for developers and users, covering setup, API integration, user navigation, and moderation guidelines.
- **/tests**: Unit and integration tests to ensure the reliability of the client app and API integrations.
- **Root Files**:
  - `.gitignore`: Ignores `node_modules`, environment variables, and build artifacts.
  - `LICENSE`: MIT License for the project.
  - `README.md`: Overview of the Matrix social platform, setup instructions, and usage guide.
  - `deploy.sh`: Script to deploy the client app to a hosting service (e.g., Vercel, Netlify).

## Notes
- The Matrix social platform is designed to be hosted separately from the Fight Club WV GitHub Pages static site, accessible via a dedicated URL (e.g., `https://matrix.fightclubwv.org`).
- The platform integrates with the Fight Club WV API to receive notifications about fight cards, leaderboards, and events.
- Anonymous user handles and end-to-end encryption ensure privacy, aligning with Fight Club's secrecy rules.
- Moderation tools enforce rules against external social media mentions and unauthorized content sharing.