
Critter App
==========

Basic app written in React Native to read from the Critter API's and show basic information to the user.

## Setup
In order to run the app, you need to install node and watchman, if not already installed.
```
brew install node
brew install watchman
```

Next, you must install the react native CLI.
```
npm install -g react-native-cli
```

You must also have XCode 8 installed, along with the XCode Command Line Tools.

Finally, you must install all the dependencies in this directly.
```
npm install
```

## Run

Once all the dependencies are installed, you can run the app directly on the iOS Simulator.
```
react-native run-ios
```

This will start an iOS simulator, install and start the app. You can then modify the React code and hit Command+R to refresh the code in the app.

## Usage

The app requires login to a valid Particle account. Go to the Account tab and enter your credentials there. The list of devices that id visible in the Devices tab are valid Particle devices that are named critter_X, where X can be anything further. So testing with the app requires real devices, with a real Particle account. 
