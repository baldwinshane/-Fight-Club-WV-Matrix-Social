# Fight Club WV Matrix Social

Welcome to the **Fight Club WV Matrix Social** platform, a secure, encrypted social media network built on the Matrix protocol for the Fight Club WV community in West Virginia. This repository hosts a standalone application designed for private group communication among Fight Club members, ensuring anonymity and discretion. The platform integrates with the [Fight Club WV API](https://github.com/username/fight-club-wv) to provide notifications about fight cards, leaderboards, and events, while adhering to the core Fight Club rule: *Do not talk about Fight Club*.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Integration with Fight Club WV API](#integration-with-fight-club-wv-api)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Rules of Fight Club](#rules-of-fight-club)
- [Contributing](#contributing)
- [Documentation](#documentation)
- [License](#license)

## Overview
The Fight Club WV Matrix Social platform is a dedicated social media network for the Fight Club WV community, built using the Matrix protocol for end-to-end encrypted communication. Hosted separately from the [Fight Club WV static site](https://github.com/username/fight-club-wv), this platform enables fighters, admins, and members to communicate securely in group chats, coordinate sparring, and receive API-driven updates. The platform enforces strict privacy rules, prohibiting external social media mentions and video recordings to maintain the secrecy and competitive integrity of Fight Club.

The application is built with React, Tailwind CSS, and the Matrix JS SDK, ensuring a modern, responsive interface. It supports anonymous user handles and moderation tools to uphold Fight Club's rules, such as banning users for public disclosures.

## Features
- **Encrypted Group Chats**: End-to-end encrypted channels for event planning, sparring coordination, and community discussions.
- **Anonymous Handles**: Users can register with anonymous aliases to protect their identities.
- **API Notifications**: Integration with the Fight Club WV API to receive updates on fight cards, leaderboards, winnings, and streaks.
- **Moderation Tools**: Features to enforce Fight Club rules, including banning users for external social media mentions.
- **Channel Management**: Dedicated rooms for topics like fight announcements, training tips, and general discussion.
- **Private Messaging**: Secure one-on-one communication between members.
- **Customizable Profiles**: Users can set up profiles with aliases and avatars, maintaining anonymity.

## Integration with Fight Club WV API
The platform integrates with the [Fight Club WV API](https://github.com/username/fight-club-wv) to enhance the user experience. Key integrations include:
- **Fight Card Updates**: Notifications about upcoming fights, including matchups and dates.
- **Leaderboard Notifications**: Real-time updates on fighter rankings and streaks.
- **Event Announcements**: Alerts for new events, including rules (MMA gloves or bare knuckle) and locations.
- **Sparring Restrictions**: Flags fighters who spar together, excluding them from leaderboard eligibility to ensure competitive uncertainty.

API integration details are available in `/docs/development/api_integration.md`.

## Installation and Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/username/fight-club-wv-matrix-social.git
   cd fight-club-wv-matrix-social
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
   Dependencies include `matrix-js-sdk`, `react`, `tailwindcss`, and others listed in `package.json`.
3. **Configure Matrix Server**:
   - Use an existing Matrix server (e.g., `matrix.org`) or set up a custom Synapse server.
   - For custom setup, configure `/server/config/homeserver.yaml` and run `/server/scripts/setup_synapse.sh`.
   - Update `/client/src/utils/matrixClient.js` with the Matrix server URL and API keys.
4. **Configure API Integration**:
   - Set environment variables in `.env` for Fight Club WV API endpoints and authentication tokens.
   - See `/docs/development/api_integration.md` for details.
5. **Run the Client App**:
   ```bash
   npm start
   ```
   The app will run locally at `http://localhost:3000`.
6. **Deploy the App**:
   - Deploy to a hosting service (e.g., Vercel, Netlify) using `/deploy.sh`.
   - Access the deployed app at a URL like `https://matrix.fightclubwv.org`.

## Usage
- **Access the Platform**: Visit `https://matrix.fightclubwv.org` (or the deployed URL) to register or log in.
- **Register**: Create an account with an anonymous handle via the `/login` page.
- **Join Channels**: Navigate to `/channels` to join group chats for fight discussions, sparring coordination, or community updates.
- **Receive Notifications**: View API-driven updates (e.g., fight cards, leaderboards) in the notification panel.
- **Moderate Content**: Admins can use moderation tools to manage rooms and enforce rules (see `/docs/guides/moderation.md`).
- **Send Messages**: Use the message input component to participate in group or private chats.

## Rules of Fight Club
The Fight Club WV Matrix Social platform enforces the following rules to maintain secrecy and safety:
1. **Do not talk about Fight Club**: No mentions on external social media (e.g., Facebook, Twitter). Violators will be permanently banned from the platform.
2. **No video recordings**: Sharing or recording fight-related content is prohibited to ensure opponents remain unpredictable.
3. **Respect anonymity**: Use anonymous handles and avoid sharing personal information.
4. **Moderation compliance**: Follow moderator instructions to avoid bans for rule violations.
5. **Intelligent participation**: The platform is for disciplined, strategic members of the Fight Club WV community, reflecting the ethos of skilled fighters like Muhammad Ali, who faced long-term health challenges from fighting.
6. **Sparring restrictions**: Members who spar together are flagged and excluded from leaderboard rankings to maintain competitive fairness.

See `/docs/policies/moderation_policy.md` for detailed moderation guidelines.

## Contributing
Contributions are welcome to enhance the platform! To contribute:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

Please follow the guidelines in `/docs/development/contributing.md` and adhere to the code style in `/docs/development/code_style.md`. Contributions must align with Fight Club's privacy and safety rules.

## Documentation
Comprehensive documentation is available in the `/docs` directory:
- **Setup Guide**: `/docs/guides/setup.md` for installing and configuring the platform.
- **User Guide**: `/docs/guides/user_guide.md` for navigating the platform.
- **API Integration**: `/docs/development/api_integration.md` for connecting to the Fight Club WV API.
- **Contributing**: `/docs/development/contributing.md` for contribution guidelines.
- **Future Plans**: `/docs/future_plans/roadmap.md` for the platform's roadmap and proposed features.
- **Moderation**: `/docs/guides/moderation.md` for moderation instructions.
- **Directory Structure**: `/docs_directory_tree.md` for an overview of the documentation structure.

See `/docs/README.md` for a complete overview of the documentation.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
