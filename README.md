# Google Drive Integration with React

This project demonstrates how to integrate Google Drive into a React.js application. Users can upload files to their Google Drive and list the files stored in their Google Drive.

## Features

- **Google OAuth Authentication**: Users can log in using their Google account.
- **File Upload**: Users can upload files directly to their Google Drive.
- **File Listing**: List all files stored in the user's Google Drive.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine.
- A Google Cloud project set up with OAuth 2.0 credentials.
- The `@react-oauth/google` package installed.

### Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/google-drive-react.git
    cd google-drive-react
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Google Cloud Setup**:
    - Go to the [Google Cloud Console](https://console.cloud.google.com/).
    - Create a new project and enable the Google Drive API.
    - Create OAuth 2.0 Client IDs under "APIs & Services" > "Credentials".
    - Download the `credentials.json` file and store it in your project.

4. **Create a `.env` File**:
    Create a `.env` file in the root of your project and add your Google Client ID:
    ```plaintext
    REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
    ```

5. **Run the App**:
    ```bash
    npm start
    ```

### Usage

1. **Log In**:
    - Users can log in using their Google account by clicking the "Login with Google" button.

2. **Upload Files**:
    - After logging in, users can select files to upload to their Google Drive.

3. **List Files**:
    - The app lists all the files in the user's Google Drive, displaying the file name and other details.

### Project Structure

- `src/`
  - `components/`
    - `GoogleAuth.js`: Handles Google OAuth login.
    - `Home.js`: Handles file uploads to Google Drive.
  - `App.js`: Main app component.
  - `index.js`: Entry point of the application.

### Dependencies

- `@react-oauth/google`: React wrapper for Google OAuth 2.0.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgements

- [React](https://reactjs.org/)
- [Google Drive API](https://developers.google.com/drive/api)
- [Google OAuth](https://developers.google.com/identity/protocols/oauth2)
