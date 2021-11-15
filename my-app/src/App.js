import {React, useState,useEffect} from 'react'


const width= 8;
const candyColor=[
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "yellow"

]

function App() {
  const [currentColorArray,setCurrentColorArray]= useState([])

  const checkForColumnofFour=()=>{

    for (let i=0; i< 47; i++){
      const columnofFour= [i, i + width, i+ width * 2, i+ width *3]
      const decideColor= currentColorArray[i]

      if(columnofFour.every(v=> currentColorArray[v]=== decideColor)){
        columnofFour.forEach(v=> currentColorArray[v]= '')
      }
    }
  }

  const checkForColumnofThree=()=>{

    for (let i=0; i< 47; i++){
      const columnofThree= [i, i + width, i+ width * 2]
      const decideColor= currentColorArray[i]


      if(columnofThree.every(v=> currentColorArray[v]=== decideColor)){
        columnofThree.forEach(v=> currentColorArray[v]= '')
      }
    }
  }
  const checkForRowofThree=()=>{

    for (let i=0; i<64 ; i++){
      const rowofThree= [i,i+1, i + 2]
      const decideColor= currentColorArray[i]
      const notValid=[6,7,14,15,22,23,30,31,38,39,47,47,54,55,63,64]
      if(notValid.includes(i)) continue

      if(rowofThree.every(v=> currentColorArray[v]=== decideColor)){
        rowofThree.forEach(v=> currentColorArray[v]= '')
      }
    }
  }

  

  const createBoard=()=>{

    
    const randomColorArray=[]
    for(let i=0; i< width* width;i++){

      const randomColor= candyColor[Math.floor( Math.random()*candyColor.length)]
      randomColorArray.push(randomColor)
    }
    setCurrentColorArray(randomColorArray)
    console.log(currentColorArray)
  };

  useEffect(() => {
    createBoard()    
  }, [])

  useEffect(() => {

    const timer= setInterval(()=>{
      checkForColumnofFour()
      checkForColumnofThree()
      checkForRowofThree()
      setCurrentColorArray([...currentColorArray])
    },10)

    return()=> clearInterval(timer)

  }, [checkForColumnofThree, checkForColumnofFour,
    checkForRowofThree,currentColorArray])



  return (
    <div className="app">

<div className="game">

  {currentColorArray.map((v,index)=>{
    return <img
    alt=""
    key={index}
    style={{backgroundColor:v}}
    />
  })}

</div>
     
    </div>
  );
}

export default App;
