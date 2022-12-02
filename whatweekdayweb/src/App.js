import logo from './logo.svg';
import './App.css';
import { useState, useTransition } from 'react';
 
import {RxQuestionMarkCircled} from 'react-icons/rx'

function App() {

  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const doomsdayDates = [
    {
      month : 1,
      day:3
    },
    {
      month : 2,
      day:28
    },
    {
      month : 3,
      day:14
    },
    {
      month : 4,
      day:4
    },
    {
      month : 5,
      day:9
    },
    {
      month : 6,
      day:6
    },
    {
      month : 7,
      day:11
    },
    {
      month : 8,
      day:8
    },
    {
      month : 9,
      day:5
    },
    {
      month : 10,
      day:10
    },
    {
      month : 11,
      day:7
    },
    {
      month : 12,
      day:12
    },

  ]
  const doomsdayDatesLeapYear = [
    {
      month : 1,
      day:4
    },
    {
      month : 2,
      day:29
    },
    {
      month : 3,
      day:14
    },
    {
      month : 4,
      day:4
    },
    {
      month : 5,
      day:9
    },
    {
      month : 6,
      day:6
    },
    {
      month : 7,
      day:11
    },
    {
      month : 8,
      day:8
    },
    {
      month : 9,
      day:5
    },
    {
      month : 10,
      day:10
    },
    {
      month : 11,
      day:7
    },
    {
      month : 12,
      day:12
    },

  ]
  const getRandomDate = () => {

    let year = 1700 + Math.floor(Math.random() * 400)
    let month = Math.ceil(Math.random() * 12)
    let day = (month==2) ? Math.ceil(Math.random() * 28) : Math.ceil(Math.random() * 30)

    let date={
      year: year,
      month: month,
      day: day
    }
    return date
  }

  const calculateWeekday = (date) =>{
    var sum;
    switch((Math.floor(date.year/100)) % 4){
      case 0:
        sum = 2 
        break
      case 1:
        sum = 0
        break
      case 2:
        sum = 5
        break
      case 3:
        sum = 3
        break

    }
    console.log("Sum starts with: "  + sum)
    var years = date.year % 100
    sum += years 
    console.log("Then we add " + years + " =>  sum=" +sum)
    sum += Math.floor(years/4)
    console.log("Then we add " + Math.floor(years/4) + " =>  sum=" +sum)
 
    let ddd = (years % 4 == 0) ? doomsdayDatesLeapYear[date.month- 1] : doomsdayDates[date.month-1]
    console.log("The closest doomsday is " + ddd.day + "/" + ddd.month)

    sum+= (date.day - ddd.day)
    console.log("Then we add " + (date.day - ddd.day) + " =>  sum=" +sum)
    
    sum = sum % 7;
    console.log("Then we mod 7  => sum=" +sum)

    if(sum < 0){
      sum = 7 + sum
      console.log("Sum went negative, we then take 7 + sum => sum=" +sum)
    }
    return weekdays[sum%7]
   
  }
  const handleGuess = (weekday) =>{
    let time = Math.round((Date.now() - startTime) / 1000)
    setTimeToAnswer(time)
    setTotalTime(totalTime+time)
    console.log(time)
    setTotalGuesses(totalGuesses+1)
    

    if(weekday == calculateWeekday(date)){
      setCorrectGuesses(correctGuesses+1)
      setGuess(true)
    }else{
      setGuess(false)
    }

    
  }

  const nextDate = () => {
    setGuess(null)
    setDate(getRandomDate())
    startTime = Date.now();
  }


  const [date, setDate] = useState(getRandomDate())
  const [guess, setGuess] = useState(null)
  const [timeToAnswer, setTimeToAnswer] = useState()
  const [totalTime, setTotalTime] = useState(0)
  const [totalGuesses, setTotalGuesses] = useState(null)
  const [correctGuesses, setCorrectGuesses] = useState(null)
  var startTime = Date.now();


  return (
    <div className="App">
      
      <header className="App-header">
      <RxQuestionMarkCircled className='info'></RxQuestionMarkCircled>
      <div id="whatday">What weekday is <span id='date'>{date.day}/{date.month}, {date.year} ?</span></div>
      
      {guess!=null ? 
        (guess ?  <div><span id='correct'>Correct</span>, it took you {timeToAnswer} seconds.</div> :
        <div> <span id='incorrect'>Incorrect</span>, the right answer is {calculateWeekday(date)}.
              
        </div>
        ) :
        <div className='buttonRow'>
          {weekdays.map((weekday, index)=>(
            <button className='btn' key={index} onClick={() => handleGuess(weekday)}>{weekday}</button>
          ))}
        </div>
      }
      {guess!=null && <button className='btn' id='nextButton' onClick={()=> nextDate()}>Next</button>}
      {totalGuesses && <div>Accuracy: {Math.round((correctGuesses/totalGuesses) * 100)}%</div>}
      {totalGuesses && <div>Average Time: {Math.round((totalTime/totalGuesses) )} seconds</div>}
      </header>
      
    </div>
  );
}

export default App;
