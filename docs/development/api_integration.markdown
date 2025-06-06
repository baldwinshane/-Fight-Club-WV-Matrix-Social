# API Integration Guide for Fight Club Matrix Social

Welcome to the **Fight Club API Integration Guide**! This document is your backstage pass to understanding how to interact with the Fight Club API (`https://api.fightclub.com`), the secret engine that powers the Fight Club Matrix Social platform. Whether you're a rookie stepping into the ring for the first time or a seasoned fighter looking to sharpen your skills, this guide will walk you through everything you need to know—from authentication to advanced API usage—all while keeping the Fight Club's code of secrecy intact.

**Remember**: *The first rule of Fight Club is: you do not talk about Fight Club.* The same goes for the API—keep it discreet, keep it secure.

---

## Table of Contents
1. [Overview](#overview)
2. [Authentication](#authentication)
   - [Obtaining an API Token](#obtaining-an-api-token)
   - [Using the API Token](#using-the-api-token)
3. [API Endpoints](#api-endpoints)
   - [Notifications](#notifications)
   - [Fighter Profiles](#fighter-profiles)
   - [Leaderboard](#leaderboard)
   - [Fight Cards](#fight-cards)
   - [Rule Violations](#rule-violations)
   - [Sparring Restrictions](#sparring-restrictions)
4. [Error Handling](#error-handling)
5. [Examples](#examples)
   - [Fetching Notifications](#fetching-notifications)
   - [Fetching a Fighter Profile](#fetching-a-fighter-profile)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

---

## Overview
The Fight Club API is the underground network that connects the Fight Club Matrix Social platform to the raw data of the Fight Club WV community. Think of it as the hidden door to the fight club's operations—only those with the right key (API token) can enter. The API allows you to:

- Fetch notifications about upcoming fights, leaderboard changes, and events.
- Retrieve fighter profiles, including aliases, records, and streaks.
- Access the leaderboard to see who's climbing the ranks.
- View upcoming fight cards, including matchups and rules.
- Report rule violations (e.g., social media mentions) to maintain secrecy.
- Flag sparring partners to ensure competitive fairness.

This guide will teach you how to use these features securely and efficiently, whether you're building new features for the platform or just curious about how it all works.

**For Dummies**: Imagine the API as a secret menu at a restaurant—only those who know the code words (API tokens) can order the special dishes (data). Each endpoint is like a different dish, and this guide is your cheat sheet to ordering like a pro.

**For Geniuses**: The API is a RESTful service with token-based authentication, providing CRUD operations for fight-related data. It's built to handle high concurrency, with rate limiting and caching strategies to optimize performance. This guide delves into the technical specifics, including request/response formats, error codes, and optimization techniques.

---

## Authentication
To access the Fight Club API, you need an **API token**—think of it as your secret handshake to enter the club. Without it, the doors stay locked.

### Obtaining an API Token
1. **Register as a Member**: Complete the Google Forms application on the Fight Club WV static site (`https://username.github.io/fight-club-wv/apply`). Submit your details, including a physical examination and agreement to Fight Club rules.
2. **Join the Matrix Platform**: Register on `https://matrix.fightclub.com` with an anonymous handle.
3. **Request a Token**: Once approved, contact an admin via the Matrix platform (e.g., in the `#general` channel) to request your API token. The token will be provided securely through a private message.

**For Dummies**: Getting a token is like getting a VIP pass—only trusted members get one, and it's your key to the exclusive content.

**For Geniuses**: Tokens are generated using a secure, time-limited algorithm and must be refreshed periodically. They are tied to your Matrix user ID for traceability.

### Using the API Token
Once you have your token, include it in the `Authorization` header of every API request:

```
Authorization: Bearer your_api_token_here
```

**For Dummies**: Think of the token as your Fight Club membership card—show it at the door (in the header) to get in.

**For Geniuses**: The token is a JWT (JSON Web Token) that must be included in the `Authorization` header as a Bearer token. It expires after 30 days and must be refreshed via the `/auth/refresh` endpoint.

---

## API Endpoints
The Fight Club API offers several endpoints, each like a different door in the Fight Club venue—each leading to a unique piece of data or functionality.

### Notifications
- **Endpoint**: `GET /notifications`
- **Description**: Fetches notifications about fight cards, leaderboard changes, and events.
- **Parameters**:
  - `limit` (optional): Number of notifications to return (default: 10).
  - `roomId` (optional): Filter notifications for a specific Matrix room.
- **Response**:
  ```json
  [
    {
      "id": "notif_123",
      "message": "New fight card announced!",
      "timestamp": "2025-06-06T07:40:00Z",
      "type": "fight_card",
      "details": {
        "matchup": "Fighter A vs Fighter B",
        "date": "2025-06-10"
      }
    },
    ...
  ]
  ```

**For Dummies**: This is like checking the bulletin board for the latest fight updates.

**For Geniuses**: The endpoint supports pagination via `offset` and `limit` query parameters. Notifications are stored in a MongoDB database with TTL indexes for automatic expiration.

### Fighter Profiles
- **Endpoint**: `GET /fighters/:id`
- **Description**: Retrieves a fighter's profile, including alias, record, weight class, and streak.
- **Parameters**:
  - `id`: The fighter's unique ID.
- **Response**:
  ```json
  {
    "id": "fighter_456",
    "alias": "The Phantom",
    "record": "10-2",
    "weightClass": "Middleweight",
    "streak": 3
  }
  ```

**For Dummies**: This is like pulling up a fighter's stats before a match.

**For Geniuses**: Fighter IDs are UUIDs generated upon registration. The endpoint uses caching to reduce database load, with a 5-minute TTL.

### Leaderboard
- **Endpoint**: `GET /leaderboard`
- **Description**: Fetches the current leaderboard, ranking fighters by wins and streaks.
- **Response**:
  ```json
  [
    {
      "fighterId": "fighter_456",
      "alias": "The Phantom",
      "rank": 1,
      "wins": 10,
      "streak": 3
    },
    ...
  ]
  ```

**For Dummies**: This is the fight club's "hall of fame"—see who's on top.

**For Geniuses**: The leaderboard is computed in real-time from the database, sorted by wins descending, then by streak. It supports filtering by weight class via query parameters (e.g., `?weightClass=Middleweight`).

### Fight Cards
- **Endpoint**: `GET /fight-cards`
- **Description**: Retrieves upcoming fight cards, including matchups, dates, and rules.
- **Response**:
  ```json
  [
    {
      "id": "card_789",
      "matchup": "The Phantom vs The Shadow",
      "date": "2025-06-10",
      "weightClass": "Middleweight",
      "rules": "mma_gloves"
    },
    ...
  ]
  ```

**For Dummies**: This is the fight schedule—know who's fighting when.

**For Geniuses**: Fight cards are stored in a relational database and can be filtered by date range or weight class. The endpoint supports pagination.

### Rule Violations
- **Endpoint**: `POST /violations`
- **Description**: Reports a rule violation (e.g., social media mention) for moderation.
- **Request Body**:
  ```json
  {
    "userId": "matrix_user_123",
    "details": "Posted about Fight Club on Twitter",
    "timestamp": "2025-06-06T07:40:00Z"
  }
  ```
- **Response**:
  ```json
  {
    "status": "reported",
    "message": "Violation reported successfully"
  }
  ```

**For Dummies**: This is like tattling on someone who broke the rules—helps keep the club secret.

**For Geniuses**: The endpoint triggers a moderation workflow, notifying admins via Matrix. It uses rate limiting to prevent abuse.

### Sparring Restrictions
- **Endpoint**: `POST /sparring`
- **Description**: Flags sparring partners to exclude them from leaderboard rankings.
- **Request Body**:
  ```json
  {
    "fighterId1": "fighter_456",
    "fighterId2": "fighter_789"
  }
  ```
- **Response**:
  ```json
  {
    "status": "flagged",
    "message": "Sparring partners flagged successfully"
  }
  ```

**For Dummies**: This is like telling the ref that two fighters know each other's moves—keeps the fights fair.

**For Geniuses**: The endpoint updates a graph database to track sparring relationships, ensuring leaderboard calculations exclude flagged pairs.

---

## Error Handling
Even in the Fight Club API, things can go wrong—like a missed punch or a broken rule. Here’s how to handle common errors:

- **401 Unauthorized**: Your API token is invalid or expired. Time to get a new one—like renewing your membership.
- **403 Forbidden**: You don’t have permission to access this endpoint. Check your role or token scope.
- **429 Too Many Requests**: You’ve hit the rate limit—slow down, or you’ll be "knocked out" for a while.
- **500 Internal Server Error**: Something went wrong on our end. Try again later, or contact an admin if it persists.

**For Dummies**: Errors are like warnings from the ref—pay attention, or you might get disqualified.

**For Geniuses**: Each error returns a JSON response with a `code` and `message`. Use exponential backoff for retries on 5xx errors. Rate limits are 100 requests per minute per token.

---

## Examples
Here are some code snippets to get you started, using JavaScript and the `axios` library (included in the project’s `package.json`).

### Fetching Notifications
```javascript
import axios from 'axios';

const fetchNotifications = async () => {
  try {
    const response = await axios.get('https://api.fightclub.com/notifications', {
      headers: { Authorization: `Bearer your_api_token_here` },
      params: { limit: 5 },
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching notifications:', error.response.data);
  }
};
```

**For Dummies**: This is like asking the doorman for the latest fight updates.

### Fetching a Fighter Profile
```javascript
import axios from 'axios';

const fetchFighterProfile = async (fighterId) => {
  try {
    const response = await axios.get(`https://api.fightclub.com/fighters/${fighterId}`, {
      headers: { Authorization: `Bearer your_api_token_here` },
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching fighter profile:', error.response.data);
  }
};
```

**For Dummies**: This is like pulling up a fighter's stats on a secret roster.

---

## Best Practices
To use the API like a pro, follow these tips:

- **Cache Responses**: Store frequently accessed data (e.g., fighter profiles) locally to reduce API calls—like keeping a cheat sheet of your opponent's moves.
- **Handle Errors Gracefully**: Always check for errors and handle them appropriately, like dodging a punch.
- **Respect Rate Limits**: Don’t spam the API, or you’ll be temporarily banned—like getting a timeout in the ring.
- **Secure Your Token**: Never share your API token or hardcode it in public code. Treat it like your Fight Club password.
- **Use HTTPS**: Always use secure connections to protect data in transit—like keeping your fight plans secret.

**For Geniuses**: Implement token rotation, use OAuth for delegated access, and consider API versioning for future-proofing. Use caching libraries like Redis for high-traffic endpoints.

---

## Troubleshooting
If you run into issues, here are some common problems and solutions:

- **Invalid Token**: Check if your token is expired or mistyped. Request a new one if needed.
- **Rate Limit Exceeded**: Wait a few minutes before retrying, or optimize your code to make fewer requests.
- **404 Not Found**: Double-check the endpoint URL and parameters. Make sure the resource exists.
- **500 Server Error**: This is on us—try again later, or report the issue to an admin via Matrix.

**For Dummies**: If something’s not working, it’s like a missed connection in a fight—check your moves (code) and try again.

**For Geniuses**: Use logging to capture request/response details. Monitor API health via the `/status` endpoint (if available). Consider implementing retry logic with backoff for transient errors.

---

This guide is your training manual for mastering the Fight Club API. Whether you're a rookie or a veteran, remember: *The API is your ally, but only if you respect the rules.* Keep it secret, keep it safe, and you'll be ready for any fight that comes your way.