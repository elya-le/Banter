<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="https://github.com/elya-le/Banter">
    <img src="images/logo.png" alt="Logo" width="80" height="80"> -->
  </a>

<h1 align="center">Banter</h1>

  <p align="center">
    A modern Discord-inspired chat application for seamless real-time communication
    <br />
    <a href="https://github.com/elya-le/Banter"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/elya-le/Banter">View Demo</a>
    ·
    <a href="https://github.com/elya-le/Banter/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/elya-le/Banter/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#key-features">Key Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#api-endpoints">API Endpoints</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

Banter is a modern chat application designed to replicate and enhance the features of Discord. It offers real-time messaging, along with various tools for community building and management. Built with a focus on user experience and performance, Banter aims to provide a seamless and enjoyable communication platform for gamers, hobbyists, and professional communities alike.

This full-stack application demonstrates proficiency in modern web development technologies, real-time communication protocols, and database management. It serves as a comprehensive portfolio piece showcasing both frontend and backend development skills.

### Key Features

- **Real-time Messaging**: Instant communication powered by WebSockets
- **Server & Channel Management**: Create and organize servers with multiple text channels
- **Direct Messaging**: Private conversations between users
- **User Authentication**: Secure registration and login with JWT tokens
- **Rich Media Sharing**: Support for images, videos, and links
- **User Profiles**: Customizable user profiles with avatar support
- **Responsive Design**: Optimized for desktop and mobile devices
- **Message History**: Persistent message storage and retrieval

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

[![React][React.js]][React-url]
[![Redux][Redux.js]][Redux-url]
[![Vite][Vite.js]][Vite-url]
[![Flask][Flask.palletsprojects.com]][Flask-url]
[![SQLAlchemy][SQLAlchemy.org]][SQLAlchemy-url]
[![WebSockets][WebSockets.org]][WebSockets-url]
[![PostgreSQL][PostgreSQL.org]][PostgreSQL-url]
[![JWT][JWT.io]][JWT-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

Before you begin, ensure you have the following installed:
* Node.js (v14 or higher)
* npm
  ```sh
  npm install npm@latest -g
  ```
* Python (v3.8 or higher)
* PostgreSQL

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/elya-le/Banter.git
   cd Banter
   ```

2. Set up the backend
   ```sh
   cd backend
   pip install -r requirements.txt
   ```

3. Set up the database
   ```sh
   # Create a PostgreSQL database named 'banter'
   createdb banter
   ```

4. Configure environment variables
   ```sh
   # Create a .env file in the backend directory
   touch .env
   ```
   Add the following to your `.env` file:
   ```env
   DATABASE_URL=postgresql://username:password@localhost/banter
   SECRET_KEY=your-secret-key-here
   JWT_SECRET_KEY=your-jwt-secret-key-here
   ```

5. Initialize the database
   ```sh
   flask db upgrade
   ```

6. Set up the frontend
   ```sh
   cd ../frontend
   npm install
   ```

7. Start the development servers
   
   Backend (from backend directory):
   ```sh
   flask run
   ```
   
   Frontend (from frontend directory):
   ```sh
   npm run dev
   ```

8. Open your browser and navigate to `http://localhost:5173`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

### Creating an Account
1. Navigate to the registration page
2. Enter your username, email, and password
3. Click "Sign Up" to create your account

### Joining a Server
1. Use an invite link or create a new server
2. Browse available channels within the server
3. Click on a channel to start messaging

### Sending Messages
- Type your message in the input field at the bottom
- Press Enter or click Send to post your message
- Messages appear in real-time for all users in the channel

### Direct Messaging
1. Click on a user's profile
2. Select "Send Direct Message"
3. Start your private conversation

_For more detailed usage instructions, please refer to the [Documentation](https://github.com/elya-le/Banter/wiki)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- API ENDPOINTS -->
## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `DELETE /api/auth/logout` - Logout user

### Servers
- `GET /api/servers` - Get all servers for authenticated user
- `POST /api/servers` - Create a new server
- `GET /api/servers/:id` - Get server details
- `PUT /api/servers/:id` - Update server
- `DELETE /api/servers/:id` - Delete server

### Channels
- `GET /api/servers/:serverId/channels` - Get channels for a server
- `POST /api/servers/:serverId/channels` - Create a new channel
- `PUT /api/channels/:id` - Update channel
- `DELETE /api/channels/:id` - Delete channel

### Messages
- `GET /api/channels/:channelId/messages` - Get messages for a channel
- `POST /api/channels/:channelId/messages` - Send a message
- `PUT /api/messages/:id` - Edit message
- `DELETE /api/messages/:id` - Delete message

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Basic real-time messaging
- [x] User authentication and authorization
- [x] Server and channel management
- [x] Direct messaging
- [ ] Voice channels
- [ ] File sharing and attachments
- [ ] Emoji reactions and custom emojis
- [ ] User roles and permissions
- [ ] Message search functionality
- [ ] Mobile app development
- [ ] Push notifications
- [ ] Screen sharing capabilities

See the [open issues](https://github.com/elya-le/Banter/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Elya Le - hello@elya.dev

Project Link: [https://elya-le-banter.onrender.com/)

Portfolio: [https://elya.dev)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
* [Socket.IO](https://socket.io/)
* [React Icons](https://react-icons.github.io/react-icons/)



<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/elya-le/Banter.svg?style=for-the-badge
[contributors-url]: https://github.com/elya-le/Banter/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/elya-le/Banter.svg?style=for-the-badge
[forks-url]: https://github.com/elya-le/Banter/network/members
[stars-shield]: https://img.shields.io/github/stars/elya-le/Banter.svg?style=for-the-badge
[stars-url]: https://github.com/elya-le/Banter/stargazers
[issues-shield]: https://img.shields.io/github/issues/elya-le/Banter.svg?style=for-the-badge
[issues-url]: https://github.com/elya-le/Banter/issues
[license-shield]: https://img.shields.io/github/license/elya-le/Banter.svg?style=for-the-badge
[license-url]: https://github.com/elya-le/Banter/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/your-linkedin-username
[product-screenshot]: images/screenshot.png

<!-- Technology badges -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Redux.js]: https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]: https://redux.js.org/
[Vite.js]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[Flask.palletsprojects.com]: https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/
[SQLAlchemy.org]: https://img.shields.io/badge/SQLAlchemy-454545?style=for-the-badge&logo=sqlalchemy&logoColor=red
[SQLAlchemy-url]: https://www.sqlalchemy.org/
[WebSockets.org]: https://img.shields.io/badge/WebSockets-0083A3?style=for-the-badge&logo=websockets&logoColor=white
[WebSockets-url]: https://websockets.readthedocs.io/
[PostgreSQL.org]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[JWT.io]: https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white
[JWT-url]: https://jwt.io/
