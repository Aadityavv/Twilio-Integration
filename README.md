# Twilio Integration Project

## Overview

This project demonstrates the integration of Twilio's communication services within a Node.js application. It leverages Twilio's APIs to facilitate functionalities such as sending SMS messages, making voice calls, and more.

## Features

- **Send SMS Messages**: Utilize Twilio's API to send SMS messages programmatically.
- **Make Voice Calls**: Initiate voice calls through Twilio's voice services.
- **Modular Codebase**: Organized structure for easy understanding and extension.

## Prerequisites

Before setting up the project, ensure you have the following:

- **Node.js**: Version 14 or higher is recommended. [Download Node.js](https://nodejs.org/)
- **Twilio Account**: Sign up at [Twilio](https://www.twilio.com/) to obtain your Account SID and Auth Token.
- **Twilio Phone Number**: Purchase a Twilio phone number capable of sending SMS and making calls.

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Aadityavv/Twilio-Integration.git
   cd Twilio-Integration
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     TWILIO_ACCOUNT_SID=your_account_sid
     TWILIO_AUTH_TOKEN=your_auth_token
     TWILIO_PHONE_NUMBER=your_twilio_phone_number
     ```
   Replace `your_account_sid`, `your_auth_token`, and `your_twilio_phone_number` with your actual Twilio credentials and phone number.

## Usage

After installation, you can start the application using:

```bash
npm start
```

The application will run on `http://localhost:3000` by default.

### Sending an SMS

To send an SMS:

1. Navigate to `http://localhost:3000/sms`.
2. Enter the recipient's phone number and your message.
3. Click "Send" to dispatch the SMS.

### Making a Voice Call

To make a voice call:

1. Navigate to `http://localhost:3000/call`.
2. Enter the recipient's phone number.
3. Click "Call" to initiate the voice call.

## Project Structure

- `app/`: Contains the main application components.
- `routes/`: Defines the application's routes.
- `controllers/`: Handles the logic for each route.
- `views/`: Contains the frontend templates.
- `public/`: Hosts static files like CSS and JavaScript.
- `config/`: Configuration files, including Twilio setup.

## Dependencies

Key dependencies include:

- **Express**: Web framework for Node.js.
- **Twilio**: Twilio Node.js SDK for interacting with Twilio's API.
- **Dotenv**: Loads environment variables from a `.env` file.

For a complete list, refer to the `package.json` file.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Twilio](https://www.twilio.com/) for their robust communication APIs.
- [Express](https://expressjs.com/) for the web framework.
- [Dotenv](https://www.npmjs.com/package/dotenv) for environment variable management.

## Contact

For questions or support, please open an issue in the repository or contact the maintainer at aadityavv9@gmail.com.
