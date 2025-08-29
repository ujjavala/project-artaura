# Art Beyond Barriers

🎨 **Transforming construction sites into inclusive art spaces**

Art Beyond Barriers is a React.js web application designed to support Australia's innovative program that transforms construction site barriers into vibrant displays of community art and cultural expression.

## 🌟 Features

### 🔐 Authentication System
- **Username/Password Login**: Secure login with form validation
- **Social Authentication**: Login with Google, Microsoft, and LinkedIn
- **Session Management**: Persistent login sessions with localStorage

### 🎨 Art Submission System
- **Image Upload**: Drag-and-drop interface with multiple file support
- **File Validation**: Automatic validation for file types and sizes
- **Progress Tracking**: Real-time upload progress and status updates
- **Preview Gallery**: Visual preview of uploaded artworks

### 📊 Dashboard
- **Project Overview**: Statistics and active project monitoring
- **Submission Management**: Track art submissions and their status
- **User Profile**: Personalized user experience
- **Responsive Design**: Optimized for all device sizes

### 🗂️ Project Management
- **Active Projects**: View ongoing construction projects needing art
- **Community Engagement**: Connect artists with local communities
- **Status Tracking**: Monitor project phases and deadlines

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd art-beyond-barriers
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## 🔧 Available Scripts

### `npm start`
Runs the app in development mode. The page will reload when you make changes.

### `npm run build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm test`
Launches the test runner in the interactive watch mode.

### `npm run eject`
**Note: this is a one-way operation. Once you eject, you can't go back!**

## 🏗️ Project Structure

```
art-beyond-barriers/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Login/
│   │   │   ├── Login.js
│   │   │   └── Login.css
│   │   ├── SocialLogin/
│   │   │   ├── SocialLogin.js
│   │   │   └── SocialLogin.css
│   │   ├── Header/
│   │   │   ├── Header.js
│   │   │   └── Header.css
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.js
│   │   │   └── Dashboard.css
│   │   └── ImageUpload/
│   │       ├── ImageUpload.js
│   │       └── ImageUpload.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🎯 Usage Guide

### 1. Authentication
- **Login**: Use the login form with username/password or social login options
- **Demo Credentials**: Any username/password combination will work in demo mode
- **Social Login**: Click on Google, Microsoft, or LinkedIn buttons for OAuth simulation

### 2. Dashboard Navigation
- **Overview**: View project statistics and recent activity
- **Submit Artwork**: Upload and submit art proposals
- **Projects**: Browse active construction projects
- **Gallery**: View approved artworks (coming soon)

### 3. Submitting Artwork
1. Navigate to the "Submit Artwork" tab
2. Select a target project from the dropdown
3. Fill in artwork details and artist statement
4. Upload image files using drag-and-drop or file browser
5. Add community connection information
6. Submit for review or save as draft

### 4. Image Upload
- **Supported Formats**: JPG, PNG, GIF, WEBP
- **File Limits**: Maximum 5 files, 10MB each
- **Features**: Drag-and-drop, preview, progress tracking, removal

## 🎨 Design Features

### Visual Identity
- **Color Scheme**: Gradient backgrounds with purple/blue tones
- **Typography**: Clean, modern fonts with good readability
- **Icons**: Emoji-based icons for friendly, accessible interface
- **Cards**: Rounded corners with subtle shadows for depth

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Adaptive layout for tablet screens
- **Desktop**: Full-featured experience on larger screens

### Accessibility
- **Focus Management**: Proper keyboard navigation
- **Color Contrast**: High contrast for readability
- **Screen Readers**: Semantic HTML and ARIA labels

## 🔒 Security Features

- **Input Validation**: Client-side form validation
- **File Type Checking**: Secure file upload with type validation
- **XSS Prevention**: Proper data sanitization
- **Session Management**: Secure token-based authentication

## 🌍 Community Impact

This application supports Australia's mission to:
- **Promote Inclusion**: Showcase diverse artists and communities
- **Enhance Public Spaces**: Transform construction barriers into art
- **Build Community**: Connect local artists with infrastructure projects
- **Cultural Representation**: Ensure diverse voices are heard in public art

## 🔮 Future Enhancements

- **Real-time Notifications**: WebSocket integration for live updates
- **Advanced Analytics**: Detailed project and submission analytics
- **Mobile App**: React Native companion app
- **AI Integration**: Automated art categorization and recommendations
- **Community Voting**: Public voting on art submissions
- **Integration APIs**: Connect with Australia project management systems

## 🤝 Contributing

This application was created as part of the "Pitch to the Panel 2025" innovation program for Australia For questions about contributing or implementation, please contact the Finance, Technology and Commercial (FTC) division.

**Art Beyond Barriers** - Because a wall doesn't have to divide us — it can bring us together. 🎨✨


**DataSets Used:**

https://www.abs.gov.au/statistics/people/education/education-and-work-australia/may-2024

https://www.abs.gov.au/statistics/measuring-what-matters/measuring-what-matters-themes-and-indicators/prosperous/skills-development

https://www.abs.gov.au/statistics/measuring-what-matters/measuring-what-matters-themes-and-indicators/prosperous/broadening-access-work

https://www.abs.gov.au/statistics/measuring-what-matters/measuring-what-matters-themes-and-indicators/prosperous/job-opportunities

https://www.abs.gov.au/statistics/measuring-what-matters/measuring-what-matters-themes-and-indicators/prosperous/job-satisfaction

https://scanloninstitute.org.au/mapping-social-cohesion-2024

https://www.abs.gov.au/statistics/people/education/work-related-training-and-adult-learning-australia/2020-21

