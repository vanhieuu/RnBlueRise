# RnBlueRise

A modern React Native application built with TypeScript, featuring advanced navigation, state management, and multimedia capabilities.

# Getting Started

## 📋 Table of Contents
- [Requirements](#requirements)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Environment Configuration](#environment-configuration)
- [Available Scripts](#available-scripts)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Troubleshooting](#troubleshooting)

## 🔧 Requirements

- **Node.js**: 18.0.0
- **React Native CLI**: Latest version
- **Yarn**: Package manager
- **Android Studio**: For Android development
- **Xcode**: For iOS development (macOS only)
- **JDK**: 11 or higher

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RnBluerise
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Configure environment files**
   - Create `env/.dev` for development environment
   - Create `env/.prod` for production environment

## 📱 Running the App

### Android

**Development (Windows):**
```bash
yarn android:dev:win
```

**Development (macOS/Linux):**
```bash
yarn android:dev:mac
```

**Production Debug (Windows):**
```bash
yarn android:prodDebug:win
```

**Production Debug (macOS/Linux):**
```bash
yarn android:prodDebug:mac
```

### iOS

**Development:**
```bash
yarn ios:dev
```

**Production:**
```bash
yarn ios:prod
```

## ⚙️ Environment Configuration

The app supports multiple environments:

- **Development**: Uses `env/.dev` configuration
- **Production**: Uses `env/.prod` configuration

Environment files should include:
```
APP_DISPLAY_NAME=Your App Name
BUNDLE_IDENTIFIER=com.yourcompany.appname
VERSION_CODE=1
VERSION_NAME=1.0.0
```

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `yarn start` | Start Metro bundler |
| `yarn android` | Run on Android (basic) |
| `yarn ios` | Run on iOS (basic) |
| `yarn lint` | Lint code with ESLint |
| `yarn test` | Run Jest tests |
| `yarn clean-android` | Clean Android build |
| `yarn clean-ios` | Clean iOS build |

## ✨ Key Features

- **Modern React Native**: Version 0.79.5 with New Architecture support
- **TypeScript**: Full TypeScript support
- **Navigation**: React Navigation v7 with drawer and bottom tabs
- **State Management**: Redux Toolkit with Redux Saga
- **Persistence**: Redux Persist with MMKV storage
- **Internationalization**: i18next for multi-language support
- **Animations**: Reanimated v3 and Lottie animations
- **Image Handling**: Fast Image with caching
- **Form Management**: React Hook Form
- **Date Handling**: Moment.js with lunar calendar support
- **OTA Updates**: Hot update capabilities
- **File System**: File system access and blob utilities

## 📁 Project Structure

```
src/
├── app/
│   ├── assets/              # Images, icons, and static assets
│   ├── common/              # Shared utilities and hooks
│   │   ├── animated/        # Animation utilities
│   │   ├── hook/           # Custom hooks
│   │   └── native-module/  # Native module interfaces
│   ├── config/             # App configuration
│   ├── features/           # All application screens and features
    |   ├── unAuth/         # UnAuthentication screens
│   │   ├── auth/           # Authentication screens
│   ├── library/            # Reusable components and utilities
│   │   ├── components/     # UI components
│   │   └── utils/          # Utility functions
│   ├── model/              # Type definitions
│   ├── navigation/         # Navigation setup
│   ├── services/           # API services
│   ├── storage/            # Redux store and reducers
│   ├── themes/             # Styling and themes
│   └── transition/         # Transition and animation configs
```

## 📦 Dependencies

### Core Libraries
- **React**: 19.0.0
- **React Native**: 0.79.5
- **TypeScript**: 5.0.4

### Navigation
- **@react-navigation/native**: ^7.1.16
- **@react-navigation/native-stack**: ^7.3.23
- **@react-navigation/bottom-tabs**: ^7.4.4
- **@react-navigation/drawer**: ^7.5.5

### State Management
- **@reduxjs/toolkit**: ^2.8.2
- **react-redux**: ^9.2.0
- **redux-saga**: ^1.3.0
- **redux-persist**: ^6.0.0

### UI  26 Animation
- **react-native-reanimated**: ^3.19.0
- **react-native-gesture-handler**: ^2.27.2
- **lottie-react-native**: ^7.2.5
- **react-native-svg**: ^15.12.0

### Storage   26 Networking
- **react-native-mmkv**: ^3.3.0
- **axios**: ^1.11.0
- **@react-native-community/netinfo**: ^11.4.1

### Utilities
- **moment**: ^2.30.1
- **lodash**: ^4.17.21
- **i18next**: ^25.3.2
- **react-hook-form**: ^7.61.1

## 🔧 Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   yarn start --reset-cache
   ```

2. **Android build issues**
   ```bash
   yarn clean-android
   cd android && ./gradlew clean && cd ..
   ```

3. **iOS build issues**
   ```bash
   yarn clean-ios
   cd ios && pod install && cd ..
   ```

4. **Environment file not found**
   - Ensure `env/.dev` and `env/.prod` files exist
   - Check that environment variables are correctly set

### Build Requirements

- **Android**: API level 24+ (Android 7.0+)
- **iOS**: iOS 11.0+
- **New Architecture**: Enabled by default

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

Please read the contributing guidelines before making any changes to the codebase.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
