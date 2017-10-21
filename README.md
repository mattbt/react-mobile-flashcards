Flashcards: A ReactNative + Redux Mobile Quiz App
===

ReactNative + Redux code to create and take quizzes on your smartphone.    
Flashcards lets users create unlimited decks with unlimited questions, challenge themselves by taking quizzes on these decks, receive a notification reminder at 5pm if no quiz has been completed during the day.    
Flashcards uses *AsyncStorage* to store decks and cards.    
Flashcards has been styled for Android but - thanks to ReactNative - with very little effort could be restyled for IOS.    
This project is part of Udacity React Nanodegree Program.

### Setup
* download the project folder (master branch)
* open your terminal and navigate to project folder
* make sure you have Node.js and npm installed, or get them [here](https://nodejs.org/it/download)
* Run `npm install`
* To run the application, choose one of the following:
    - run with expo:
        - if you haven't already, head to the app store and install the Expo mobile app for your device:
            - [Google Play (Android)](https://play.google.com/store/apps/details?id=host.exp.exponent)
            - [App Store (iOS)](https://itunes.apple.com/us/app/expo-client/id982107779)
        - run `npm start` and wait for QR code to appear
        - open *Expo* on your device and scan QR code
    - run with Android/ios simulator: please check this [guide](https://facebook.github.io/react-native/docs/getting-started.html)


### App info
| Feature | Preview |
| --- | --- |
| The main page contains a list of all existing decks, <br>each presented with the number of questions it contains.| ![Deck List](/screenshots/img1.png?raw=true)|
| Users could add a new deck by navigating to tab *NEW DECK*, <br>entering the new deck title and submitting it. <br>New Deck page does not allow users to add a duplicated deck.| ![New Deck](/screenshots/img2.png?raw=true) |
| By selecting a deck from deck list user gets to deck detail page. <br>Here it is possible to choose wheter to take the quiz or add a new question. | ![Deck Detail](/screenshots/img3.png?raw=true) |
| User could add a new question to the deck by entering question and answer |![New Question](/screenshots/img8.png?raw=true)|
| When user takes a quiz, all questions contained in the deck are prompted, one by one;<br> user guess an answer, then check the correct one <br> (card flips) and decide whether it was a correct guess or not. | ![Quiz](/screenshots/img4.png?raw=true&)|
| When all questions are done, user gets quiz result. User could take the quiz again or go back to deck detail page.| ![Quiz Result](/screenshots/img7.png?raw=true)|

User receives a push notification reminder each day at 5pm if no quiz has been completed for the day.
