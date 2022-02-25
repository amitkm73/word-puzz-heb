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

const WIN_MESSAGES = ["גאוני", "מצויין", "טוב מאוד", "טוב", "נכון", "נכון"];

var userCursorY = 0;
var userGuessCount = 0;
var userGameState = "playing";
var userPuzzleNum = 0;
var userWins = [0, 0, 0, 0, 0, 0];
var userCurrentStreak = 0;
var userMaxStreak = 0;
var userNumPlayed = 0;
const [puzzleNum, puzzleSolution] = getSolution();
var animationState = "idle-cells";
var animationRow = 0;
var msgText = "תוצאות";

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

function saveUserTiles() {
  for (var i=0; i<30; i++) {
    localStorage.setItem('t_l'+i, tileData[i].letter);
    localStorage.setItem('t_s'+i, tileData[i].dataState);
  }
}

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

function saveUserState(puzzleNum, cursorY, guessCount, gameState) {
    localStorage.setItem('puzzleNum', puzzleNum);
    localStorage.setItem('cursorY', cursorY);
    localStorage.setItem('guessCount', guessCount);
    localStorage.setItem('gameState', gameState);
    saveUserTiles();
    saveUserStats(guessCount, gameState);
}

function clearUserState()
{
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

function setDataAnimation(animationState) {
  const row_list = document.getElementsByClassName('row');
  const cell_list = row_list[animationRow].getElementsByClassName('tile');
  for (var i=0; i<5; i++) {
    cell_list[i].setAttribute("data-animation", animationState);
  }
}

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

loadUserState();

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

  function showUserMsg(text) {
      if (text === "win") {
        msgText = WIN_MESSAGES[guessCount-1];
        setSolvedMsg(true);
      } else {          // lost or invalid word
        msgText = text;
        setMsgOpen(true);
      }
  }

  function hideUserMsg() {
    msgText = "תוצאות";
    setMsgOpen(false);
  }

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

  function handleEnter() {
    if (gameState !== "playing") {
      return;
    }
    if (cursorX !== -1) {
      return;
    }
    checkGuess();
  }

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

  function handleKeyPress(e) {
    const k = e.key;
    if (HEB_LETTERS.includes(k)) {
      handleHebLetter(k);
    } else if (k === 'Enter') {
      handleEnter();
    }
  }

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
