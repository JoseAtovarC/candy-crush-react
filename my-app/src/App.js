/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect } from "react";
 import red from './img/redcandy.jpg'
 import blue from './img/bluecandy.jpg'
 import orange from './img/orangecandy.png'
 import purple from './img/purple.jpg'
 import yellow from './img/yellowcandy.jpg'
 import green from './img/greencandy.jpg'
 import blank from './img/blank.png'
 import ScoreBoard from "./components/score-boards";

const width = 8;
const candyColor = [blue, green, orange, purple, red, yellow];

function App() {

  let [currentColorArray, setCurrentColorArray] = useState([]);
  const [squareBeingDrag, setsquareBeingDrag] = useState(null);
  const [squareBeingReplace, setsquareBeingReplace] = useState(null)
  const [scoreDisplay, setScoreDisplay] = useState(0)

  const checkForColumnofFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnofFour = [i, i + width, i + width * 2, i + width * 3];
      const decideColor = currentColorArray[i];
      const isBlank = currentColorArray[i] === blank

      if (columnofFour.every((v) => currentColorArray[v] === decideColor && !isBlank)) {
        setScoreDisplay((score) => score + 4)
        columnofFour.forEach((v) => (currentColorArray[v] = blank));
        return true
      }
    }
  };

  const checkForRowofFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowofFour = [i, i + 1, i + 2, i + 3];
      const decideColor = currentColorArray[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 47, 47, 54, 55, 63, 64,
      ];
      const isBlank = currentColorArray[i] === blank
      if (notValid.includes(i)) continue;

      if (rowofFour.every((v) => currentColorArray[v] === decideColor && !isBlank)) {
        setScoreDisplay((score) => score + 4)
        rowofFour.forEach((v) => (currentColorArray[v] = blank));
        return true
      }
    }
  };

  const checkForColumnofThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnofThree = [i, i + width, i + width * 2];
      const decideColor = currentColorArray[i];
      const isBlank = currentColorArray[i] === blank

      if (columnofThree.every((v) => currentColorArray[v] === decideColor && !isBlank)) {
        setScoreDisplay((score) => score + 3)
        columnofThree.forEach((v) => (currentColorArray[v] = blank));
        return true
      }
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkForRowofThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowofThree = [i, i + 1, i + 2];
      const decideColor = currentColorArray[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      const isBlank = currentColorArray[i] === blank
      if (notValid.includes(i)) continue;

      if (rowofThree.every((v) => currentColorArray[v] === decideColor && !isBlank)) {
        setScoreDisplay((score) => score + 3)
        rowofThree.forEach((v) => (currentColorArray[v] = blank));
        return true
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const moveIntoSquareBellow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArray[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColor.length);

        currentColorArray[i] = candyColor[randomNumber];
      }
      if (currentColorArray[i + width] === blank) {
        currentColorArray[i + width] = currentColorArray[i];
        currentColorArray[i] = blank;
      }
    }
  };

  const dragStart = (e) => {

    console.log(e.target)
    setsquareBeingDrag(e.target)
  };



  const dragDrop = (e) => {
   
    setsquareBeingReplace(e.target)
  };



  const dragEnd = () => {
    console.log("dragend");
    const squareBeingDraggedId = parseInt(squareBeingDrag.getAttribute('data-id'))
    const squareBeingReplacedId = parseInt(squareBeingReplace.getAttribute('data-id'))

    currentColorArray[squareBeingReplacedId] = squareBeingDrag.getAttribute('src')
    currentColorArray[squareBeingDraggedId] = squareBeingReplace.getAttribute('src')

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width
  ]

  const validMove = validMoves.includes(squareBeingReplacedId)
  const isAColumnOfFour = checkForColumnofFour()
  const isARowOfFour = checkForRowofFour()
  const isAColumnOfThree = checkForColumnofThree()
  const isARowOfThree = checkForRowofThree()


  if (squareBeingReplacedId &&
    validMove &&
    (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
    setsquareBeingDrag(null)
    setsquareBeingReplace(null)
} else {
    currentColorArray[squareBeingReplacedId] = squareBeingReplace.getAttribute('src')
    currentColorArray[squareBeingDraggedId] = squareBeingDrag.getAttribute('src')
    setCurrentColorArray([...currentColorArray])
}


  };






  const createBoard = () => {
    const randomColorArray = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColor[Math.floor(Math.random() * candyColor.length)];
      randomColorArray.push(randomColor);
    }
    setCurrentColorArray(randomColorArray);
    console.log(currentColorArray);
  };




  useEffect(() => {
    
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnofFour();
      checkForRowofFour();
      checkForColumnofThree();
      checkForRowofThree();
      moveIntoSquareBellow();
      setCurrentColorArray([...currentColorArray]);
    }, 100);

    return () => clearInterval(timer);
  }, [
    checkForColumnofFour,
    checkForRowofFour,
    checkForColumnofThree,
    checkForRowofThree,
    moveIntoSquareBellow,
    currentColorArray,
  ]);

  return (
    <div className="app">
      <div className="game">
        {currentColorArray.map((v, index) => {
          return (
            <img
              alt={v}
              key={index}
              src={v}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
            />
          );
        })}
      </div>
      <ScoreBoard score={scoreDisplay}/>
      
    </div>
  );
}

export default App;
