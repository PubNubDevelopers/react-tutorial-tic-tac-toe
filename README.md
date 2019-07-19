# Realtime Tic Tac Toe React App

This React app is used to test the [React Native version](https://github.com/ocastroa/react-native-tictactoe) of this tic tac toe game. In the React Native app, players are able to create unqiue game channels where others players can join (total of 2 players per channel room). In this React app, players join a game channel that was created by another player. Once two players are connected to a channel, the game starts. We will use PubNub to power the realtime infrastructure of the game.

<p align="center">
  <img src="./media/empty-board-react-app.png " alt="Screenshot of the React tic tac toe app" width="600" height="306" />
</p>

NOTE: This app cannot run on its on without running the [React Native app](https://github.com/ocastroa/react-native-tictactoe).

## Setup
1) Clone the repo.
```bash
git clone https://github.com/ocastroa/react-tutorial-tic-tac-toe.git
```

2) Open the project in your favorite text editor, such as [VS Code](https://code.visualstudio.com/download) or [Notepad++](https://notepad-plus-plus.org/download/v7.6.4.html)

3)  Go to the file Game.js and replace 'ENTER_YOUR_PUBLISH_KEY_HERE' and 'ENTER_YOUR_SUBSCRIBE_KEY_HERE' with the SAME Pub/Sub API keys you used for the React Native tic tac toe game.

4) Run the following command in the terminal to install the dependencies:
```bash
npm install
```

5) To run the app, type the following command in the terminal:
```bash
npm start
```

6) The app will open in http://localhost:3000 with an empty table and two input fields. Make sure you have the React Native app set up and running on a simulator or emualtor. 

7) Go to the simulator/emulator and in the lobby, type Player X for the username and press the “Create” button to create a new room id. Go back to the browser and for the username field, type Player O. In the room name field, type the room id that was created in the simulator.

<p align="center">
  <img src="./media/join-room-react-app.png " alt="Join room channel" width="638" height="350"  />
</p>

8) Once both fields are filled in, press the Submit button and the game will start for both players. Since the simulator/emulator is the room creator, press any square on the table to place an X. In the browser, press any square to place an O.
- To see how to test the app using the React app, watch [this video](https://www.youtube.com/watch?v=0W6OqKiP7GM).

<p align="center">
  <img src="./media/react-app-gameplay.png " alt="React app gameplay" width="630" height="350" />
</p>

## Build Your Own Realtime Tic Tac Toe Game in React Native

To learn more about this project or if you want to build this project from scratch, check out the tutorial.

  <a href="https://www.pubnub.com/blog/multiplayer-mobile-tic-tac-toe-react-native-ios-android-part-one/?devrel_gh=react-native-tictactoe">
    <img alt="PubNub Blog" src="https://i.imgur.com/aJ927CO.png" width=260 height=98/>
  </a>
