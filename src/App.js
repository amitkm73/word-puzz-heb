import React, { useEffect, useRef, useState} from 'react';
import { nanoid } from 'nanoid';
import Header from './components/Header';
import Row from './components/Row';
import Keyboard from './components/Keyboard';
import Usage from './components/Usage';
import Settings from './components/Settings';
import UserMsg from './components/UserMsg';
import Stats from './components/Stats';
import ALL_WORDS from './components/Allwords';
import HEB_LETTERS from './components/HebLetters';
import getSolution from './components/Solutions';
import copyToClipboard from './components/Clipboard';

const WIN_MESSAGES = ["גאוני", "מצויין", "טוב מאוד", "טוב", "נכון", "נכון"];

// globals that store game state
// 5 letters * 6 rows => 30 tiles
var tileData = [
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"},
  {letter: "*", dataState:"empty"}
];
// in addition to tiles the game state inlcudesthe following:
var userCursorY = 0;
var userGuessCount = 0;
var userGameState = "playing";
const [puzzleNum, puzzleSolution] = getSolution();
var animationState = "idle-cells";
var animationRow = 0;
var msgText = "תוצאות";

// user game history:
var userPuzzleNum = 0;
var userWins = [0, 0, 0, 0, 0, 0];
var userCurrentStreak = 0;
var userMaxStreak = 0;
var userNumPlayed = 0;

/**
 * loads tile history from local storage.
 * helper function to loadUserState().
 */
function loadUserTiles() {
  var i, letter, dataState;
  for (i=0; i<30; i++) {
    letter = localStorage.getItem('t_l'+i);
    dataState = localStorage.getItem('t_s'+i);
    if (letter !== null) {
      tileData[i].letter = letter;
    }
    if (dataState !== null) {
      tileData[i].dataState = dataState;
    }
  }
}
/**
 * saves tile to local storage.
 * helper function to saveUserState().
 */
function saveUserTiles() {
  for (var i=0; i<30; i++) {
    localStorage.setItem('t_l'+i, tileData[i].letter);
    localStorage.setItem('t_s'+i, tileData[i].dataState);
  }
}
/**
 * calculates and save user stats to local storage.
 * helper function to saveUserState().
 * @param {number} guessCount how many guesses were done in the game.
 * @param {string} gameState 'win' or 'lost'.
 */
function saveUserStats(guessCount, gameState) {
  if (gameState === 'win') {
    userWins[guessCount-1] +=1;
    localStorage.setItem('win'+guessCount, userWins[guessCount-1]);
    userCurrentStreak ++;
    localStorage.setItem('currentStreak', userCurrentStreak);
    if ((userCurrentStreak) > userMaxStreak) {
      userMaxStreak = userCurrentStreak;
      localStorage.setItem('maxStreak', userMaxStreak);
    }
    userNumPlayed++;
    localStorage.setItem('numPlayed', userNumPlayed);
  }
  if (gameState === 'lost') {
    userCurrentStreak = 0;
    localStorage.setItem('currentStreak', 0);
    userNumPlayed++;
    localStorage.setItem('numPlayed', userNumPlayed);
  }
}
/**
 * loads statistics from local storage.
 * helper function to loadUserState().
 */
function loadUserStats() {
  var i, tmp;
  for (i=1; i<=6; i++) {
    tmp = localStorage.getItem('win'+i);
    if (tmp !== null) {
      userWins[i-1] = parseInt(tmp);
    }
  }
  tmp = localStorage.getItem('currentStreak');
  if (tmp !== null) {
    userCurrentStreak = parseInt(tmp);
  }
  tmp = localStorage.getItem('maxStreak');
  if (tmp !== null) {
    userMaxStreak = parseInt(tmp);
  }
  tmp = localStorage.getItem('numPlayed');
  if (tmp !== null) {
    userNumPlayed = parseInt(tmp);
  }
}
/**
 * loads user state and history from local storage.
 * local storage works per browser x per device.
 * chosen by the original game in order to keep everything client-side.
 */
function loadUserState() {
    var tmp;
    tmp = localStorage.getItem('puzzleNum');
    if (tmp !== null) {
      userPuzzleNum = parseInt(tmp);
    }
    if (userPuzzleNum !== puzzleNum) {
      // state is from a previous puzzle delteting it
      clearUserState();
      return;
    }
    tmp = localStorage.getItem('cursorY');
    if (tmp !== null) {
      userCursorY = parseInt(tmp);
    }
    tmp = localStorage.getItem('guessCount');
    if (tmp !== null) {
      userGuessCount = parseInt(tmp);
    }
    tmp = localStorage.getItem('gameState');
    if (tmp !== null) {
      userGameState = tmp;
    }
    if (userGameState === 'win' || userGameState === 'lost') {
      animationState = userGameState;
    }
    loadUserTiles();
    loadUserStats();
}
/**
 * saves user state and history to local storage.
 * local storage works per browser x per device.
 * chosen by the original game in order to keep everything client-side.
 */
function saveUserState(puzzleNum, cursorY, guessCount, gameState) {
    localStorage.setItem('puzzleNum', puzzleNum);
    localStorage.setItem('cursorY', cursorY);
    localStorage.setItem('guessCount', guessCount);
    localStorage.setItem('gameState', gameState);
    saveUserTiles();
    saveUserStats(guessCount, gameState);
}
/**
 * clears per game user state from local storage.
 * this happens if the saved state belongs to a puzzle from a past day.
 */
function clearUserState() {
  var i;
  userCursorY = 0;
  userGuessCount = 0;
  userGameState = "playing";
  userPuzzleNum = puzzleNum;
  localStorage.setItem('puzzleNum', userPuzzleNum);
  localStorage.setItem('cursorY', 0);
  localStorage.setItem('guessCount', 0);
  localStorage.setItem('gameState', "playing");
  for (i=0; i<30; i++) {
    tileData[i].letter = "*";
    tileData[i].dataState = "empty";
    localStorage.setItem('t_l'+i, "*");
    localStorage.setItem('t_s'+i, "empty");
  }
}

/**
 * activates animation on all tiles in the current row.
 * helper function to animationControl() state machine.
 * @param {string} animationState 'idle', 'flip-in', 'flip-out'.
 */
function setDataAnimation(animationState) {
  const row_list = document.getElementsByClassName('row');
  const cell_list = row_list[animationRow].getElementsByClassName('tile');
  for (var i=0; i<5; i++) {
    cell_list[i].setAttribute("data-animation", animationState);
  }
}
/**
 * state machine that controls animation on the game tiles.
 * the game is using css animation.
 * the state machine sets the 'data-animation' attribute of the html elements
 * global vars that control the state machine: animationState, animationRow.
 * @param {func} userMsgFunc function to show text message to the user.
 */
function animationControl(userMsgFunc) {
  var row_list;
  var game_element;
  switch (animationState) {
    case "idle-cells":
      setDataAnimation("idle");
      break;
    case "idle-row":
      row_list = document.getElementsByClassName('row');
      row_list[animationRow].setAttribute("data-animation", "idle");
      break;
    case "idle-game":
      game_element = document.getElementById("game");
      game_element.setAttribute("data-animation", "idle");
      break;
    case "valid-row-1":
      setDataAnimation("flip-in");
      animationState = "valid-row-2";
      setTimeout(animationControl, 250, userMsgFunc);
      break;
    case "valid-row-2":
      setDataAnimation("flip-out");
      animationState = "idle-cells";
      setTimeout(animationControl, 250, userMsgFunc);
      break;
    case "invalid-row":
      row_list = document.getElementsByClassName('row');
      row_list[animationRow].setAttribute("data-animation", "shake");
      animationState = "invalid-row-2";
      setTimeout(animationControl, 600, userMsgFunc);
      break;
    case "invalid-row-2":
      animationState = "idle-row";
      userMsgFunc("לא מילה בת חמש אותיות");
      setTimeout(animationControl, 10, userMsgFunc);
      break;
    case "win":
      game_element = document.getElementById("game");
      game_element.setAttribute("data-animation", "bounce");
      animationState = "win-2";
      setTimeout(animationControl, 1000, userMsgFunc);
      break;
    case "win-2":
      animationState = "idle-game";
      userMsgFunc("win");
      setTimeout(animationControl, 10, userMsgFunc);
      break;
    case "lost":
      game_element = document.getElementById("game");
      game_element.setAttribute("data-animation", "shake");
      animationState = "lost-2";
      setTimeout(animationControl, 1000, userMsgFunc);
      break;
    case "lost-2":
      animationState = "idle-game";
      userMsgFunc(puzzleSolution);
      setTimeout(animationControl, 10, userMsgFunc);
      break;
    default:
      console.log("unexpected animation state");
  }
}

// calling this to initialize globals that hold the game state
loadUserState();

/**
 * react app component function.
 * function structure:
 *   state variables - framrwork will re-render when these change
 *   helper functions - (1) user messages (2) game logic (3) event handlers
 *     typical flow is event -> game logic -> state change -> render
 *   html elements rendering code
 *   (post render actions - focus, animation)
 * @return {element} game application component.
 */
function App() {

  const [tiles, setTiles] = useState(tileData);
  const [cursorX, setCursorX] = useState(4);
  const [cursorY, setCursorY] = useState(userCursorY);
  const [guessCount, setGuessCount] = useState(userGuessCount);
  const [gameState, setGameState] = useState(userGameState);
  const [usage, setUsage] = useState(userGameState === "playing" ? true : false);
  const [settings, setSettings] = useState(false);
  const gameRef = useRef(null);
  const [msgOpen, setMsgOpen] = useState(false);
  const [solvedMsg, setSolvedMsg] = useState(false);
  /**
   * shows a text message.
   * this is done by setting one of the state variables.
   * @param {string} text the messgage to show.
   */
  function showUserMsg(text) {
      if (text === "win") {
        msgText = WIN_MESSAGES[guessCount-1];
        setSolvedMsg(true);
      } else {          // lost or invalid word
        msgText = text;
        setMsgOpen(true);
      }
  }
  /**
   * hides the user message.
   */
  function hideUserMsg() {
    msgText = "תוצאות";
    setMsgOpen(false);
  }
  /**
   * check the tiles in the current row after the user submitted a guess.
   * sets the .dataState of each tile to "absent", "present" or "correct".
   * helper function to checkGuess().
   */
  function checkTiles() {
    for (var i=4; i>=0; i--) {
      if(!puzzleSolution.includes(tiles[cursorY*5+i].letter)) {
        tiles[cursorY*5+i].dataState = "absent";
      } else if(tiles[cursorY*5+i].letter === puzzleSolution[4-i]) {
        tiles[cursorY*5+i].dataState = "correct";
      } else {
        // tile 'i' letter is in the word but not in the right place
        // we will mark it as present only if it is not a repetition of correct tile
        tiles[cursorY*5+i].dataState = "present";
        for (var j=4; j>=0; j--) {
          if((tiles[cursorY*5 +j].letter === puzzleSolution[4-j]) &&
             (tiles[cursorY*5 +j].letter === tiles[cursorY*5 +i].letter))
             {
               tiles[cursorY*5+i].dataState = "absent";
             }
        }
      }
    }
    setTiles(tiles);
  }
  /**
   * checks user guess after the user submitted a word.
   */
  function checkGuess() {
    var guess = "";
    var tmpState = "playing";
    for (var i=4; i>=0; i--) {
      guess = guess + tiles[cursorY*5+i].letter;
    }
    animationRow = cursorY;
    if (! ALL_WORDS.includes(guess)) {
      animationState = "invalid-row";
      animationControl(showUserMsg);
      return;
    }
    checkTiles();
    animationState = "valid-row-1";
    if (guess === puzzleSolution) {
      tmpState = "win";
      animationState = "win";
    } else if (guessCount === 5) {
      tmpState = "lost";
      animationState = "lost";
    }
    saveUserState(puzzleNum, cursorY+1, guessCount+1, tmpState);
    setGameState(tmpState);
    setGuessCount(guessCount+1);
    setCursorY(cursorY+1);
    setCursorX(4);
  }
  /**
   * handles input of hebrew letter either from keyboard or virtual keyboard.
   */
  function handleHebLetter(letter) {
    if (gameState !== "playing") {
      return;
    }
    if (cursorX < 0) {
      return;
    }
    tiles[cursorY*5 + cursorX].letter = letter;
    tiles[cursorY*5 + cursorX].dataState = "tbd";
    setTiles(tiles);
    setCursorX(cursorX-1);
  }
  /**
   * handles user pressing 'Enter' either from keyboard or virtual keyboard.
   */
  function handleEnter() {
    if (gameState !== "playing") {
      return;
    }
    if (cursorX !== -1) {
      return;
    }
    checkGuess();
  }
  /**
   * handles user pressing 'Delete' either from keyboard or virtual keyboard.
   */
  function handleDelete() {
    if (gameState !== "playing") {
      return;
    }
    if (cursorX >= 4) {
      return;
    }
    tiles[cursorY*5 + cursorX + 1].letter = "*";
    tiles[cursorY*5 + cursorX + 1].dataState = "empty";
    setTiles(tiles);
    setCursorX(cursorX+1);
  }
  /**
   * handles key press events.
   */
  function handleKeyPress(e) {
    const k = e.key;
    if (HEB_LETTERS.includes(k)) {
      handleHebLetter(k);
    } else if (k === 'Enter') {
      handleEnter();
    }
  }
  /**
   * handles key down events, this is needed for the 'Backspace' key.
   */
  function handleKeyDown(e) {
    hideUserMsg();
    if (gameState !== "playing") {
      return;
    }
    const k = e.key;
    if (k === 'Backspace') {
      handleDelete();
    }
  }
  /**
   * handles virtual keyboard events.
   */
  function handleVirtualKey(id) {
    switch(id) {
      case "DEL":
        handleDelete();
        break;
      case "ENTER":
        handleEnter();
        break;
      default:
        handleHebLetter(id);
        break;
    }
  }
  /**
   * handles 'Share' button event which is show in the Statistics screen.
   */
  function handleShare() {
    var shareChar='*';
    setSolvedMsg(false);
    var shareText = "חידון " + puzzleNum + " " + guessCount + "/6 \n";
    for (var row=0; row<guessCount; row++) {
      for (var col=0; col<5; col++) {
        switch(tileData[row*5+col].dataState) {
          case "correct":
            shareChar = String.fromCodePoint(129001);
            break;
          case "present":
            shareChar = String.fromCodePoint(129000);
            break;
          case "absent":
            shareChar = String.fromCodePoint(11036);
            break;
          default:
            shareChar = String.fromCodePoint(11036);
        }
        shareText += shareChar;
      }
      shareText += "\n";
    }
    copyToClipboard(shareText);
    msgText="התוצאות הועתקו אל הלוח";
    setMsgOpen(true);
  }
  // build 5 tile rows to be rendered:
  var rowList = [];
  for (var row=0; row<=5; row++) {
    var rowWord = "";
    var rowDataStates = "";
    for (var col=0; col<=4; col++) {
        rowWord += tiles[row*5 + col].letter;
        rowDataStates += tiles[row*5 + col].dataState[0];
    }
    rowList.push(<Row rowword={rowWord} rowdatastates={rowDataStates} key={nanoid()}/>);
  }
  // after rendering we need to do the following:
  useEffect(() => {
    gameRef.current.focus();
    animationControl(showUserMsg);
  });

  return (
    <div id="game" onKeyPress={handleKeyPress} onKeyDown={handleKeyDown} tabIndex="-1" ref={gameRef}>
      <Header handleUsage={()=>setUsage(true)} handleStats={()=>setSolvedMsg(true)} handleSettings={()=>setSettings(true)} />
      <div id="board-container">
        <div id="board">
          {rowList}
        </div>
      </div>
      <Keyboard onClick={handleVirtualKey} tileData={tileData} />
      <Usage open={usage} onClose={()=>setUsage(false)} />
      <Settings open={settings} onClose={()=>setSettings(false)} />
      <div>
        {msgOpen && <UserMsg
            content={<>
              <p><b>{msgText}</b></p>
          </>}
          handleClose={hideUserMsg}
        />}
      </div>
      <div>
        {solvedMsg && <Stats  msgText={msgText}
                              userNumPlayed={userNumPlayed}
                              userCurrentStreak={userCurrentStreak}
                              userMaxStreak={userMaxStreak}
                              userWins={userWins}
                              onClose={()=>setSolvedMsg(false)}
                              onShare={handleShare}/>}
      </div>
    </div>
  );
}

export default App;
