import React, { useState, useEffect } from 'react';
import './App.css';
import { LinearProgress, OutlinedInput, TextField, Button, Card, CardContent, Typography, Text } from '@material-ui/core';

function App() {
  
  const [domain,setDomain] = useState(['letters', 'numbers', 'images']);
  const [letters,setLetters] = useState(['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']);
  const [numbers,setNumbers] = useState([0,1,2,3,4,5,6,7,8,9]);
  const [images, setImages] = useState();
  const [numberOfScreens, setNumberOfScreens] = useState(2);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [waitingForAns, setWaitingForAns] = useState(false);
  const [numberOfItems, setNumberOfItems] = useState(2);
  const [actualItems, setActualItems] = useState();
  const [answer, setAnswer] = useState();
  const [score, setScore] = useState(0);
  const [erredScreens, setErredScreens] = useState([]);
  const [erredSeq, setErredSeq] = useState([]);
  const [userSeq, setUserSeq] = useState([]);

  const onNext = (e) => {

    if(answer){
      let matches = 0;
      answer.toUpperCase().split('').forEach((elem)=>{
        if(actualItems.includes(elem))
          matches = matches + 1;
        else {
          if(!erredScreens.includes(currentScreen)) {
            erredScreens.push(currentScreen);
            setErredScreens(erredScreens);
            erredSeq.push(actualItems);
            setErredSeq(erredSeq);
            userSeq.push(answer.toUpperCase().split(''));
            setUserSeq(userSeq);
          }
        }
      })

      if(matches == actualItems.length)
        setScore(score+1)
    }

    setCurrentScreen(currentScreen+1);
  }

  useEffect(()=>{
    setNumberOfItems(currentScreen*2);

    setWaitingForAns(false);
    setTimeout(() => {
      setWaitingForAns(true)
    }, 5000)

  },[currentScreen])

  useEffect(()=>{
    let arr = [];
    for(let i=0; i<numberOfItems; i++){
      arr.push(letters[Math.floor(Math.random()*letters.length)])
      setActualItems(arr);
    }
  },[numberOfItems])

  return (
    <div className="App">
      <div className="Header">
        Memory Game
      </div>
      
      { 
        currentScreen == 0 ?
          <div className="RulesPage">
            Rules Page
            <Button onClick={onNext} variant="contained" color="primary">
              Start Game
            </Button>
          </div>
        :
        currentScreen > 0 && currentScreen <= numberOfScreens ?
          <div>
            <div className="Progress">
              <LinearProgress variant="determinate" value={(currentScreen/numberOfScreens)*100} />
            </div>
            <div className="Playground">
              { 
                waitingForAns ?
                  <form noValidate autoComplete="off" className="InputBox">
                    <TextField onChange={(e)=>{setAnswer(e.target.value)}} id="outlined-basic" label="Your Answer" variant="outlined" />
                    <Button onClick={onNext} variant="contained" color="primary">
                      Next
                    </Button>
                  </form>
                :
                  actualItems && actualItems.map((item)=>{
                    return(
                      <Card style={{ margin:'2rem' }}>
                        <CardContent>
                          <Typography variant="h5" component="h2">
                            {item}
                          </Typography>
                        </CardContent>
                      </Card>
                    )
                  })
              }
            </div>
          </div>
        :
          <div className="Results">
            <div className="mainScore">
              Your score is: {((score/numberOfScreens)*100).toFixed(2)}%
            </div>
            {
              erredScreens.length == 0 ?
                <div className="report">
                  Oh wow! You seem to be a pro at this. No errors to report.
                </div>
              :
              <div className="report">
                <p>Your error was at screen: {erredScreens.map((screen)=>{return(screen+', ')})}</p>
                <p>The actual sequence was: {erredSeq.map((seq)=>{return(seq+', ')})}</p>
                <p>Your Sequence was: {userSeq.map((seq)=>{return(seq+', ')})}</p>
              </div>
                
            }
            <Button onClick={()=>{window.location.reload()}} variant="contained" color="primary">
              Play Again
            </Button>
          </div>
        
      }
      
    </div>
  );
}

export default App;
