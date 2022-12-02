import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable} from 'react-native';

import { useState } from 'react';

export default function App() {

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
    setGuess((weekday == calculateWeekday(date) ? true : false))
    setTimeToAnswer(Math.round((Date.now() - startTime) / 1000))
  }

  const nextDate = () => {
    setGuess(null)
    setDate(getRandomDate())
    startTime = Date.now();
  }

  const [date, setDate] = useState(getRandomDate())
  const [guess, setGuess] = useState(null)
  const [timeToAnswer, setTimeToAnswer] = useState();
  var startTime = Date.now();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>What day is <Text style={styles.textBold}>{date.day}/{date.month}, {date.year}</Text>?</Text>
      {guess!=null ? 
        (guess ?  <Text style={styles.text}> <Text style={styles.correct}>Correct</Text>, it took you {timeToAnswer} seconds.</Text> 
                  :
                  <Text style={styles.text} > <Text style={styles.incorrect}>Incorrect</Text>, the right answer is {calculateWeekday(date)}.</Text>
              
        ) : (
        <View style={styles.buttonRow}>
          {weekdays.map((weekday, index)=>(
            <Pressable style={styles.button}  key={index} onPress={() => handleGuess(weekday)}>
              <Text style={styles.text2}>{weekday}</Text>
            </Pressable>
          ))}
        </View>
        )
      }
      {guess!=null && <Pressable style={styles.button}  id='nextButton' onPress={()=> nextDate()}>
      <Text style={styles.text2}>Next</Text>
      </Pressable>}
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color: '#fff',
    fontSize: 20
  },
  text2:{
    color:'#000',
    fontSize: 14
  },
  textBold:{
    fontWeight: 'bold'
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 70,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
    marginLeft: 5,
    marginTop: 10
    
  },
  buttonRow:{
    flexDirection:'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  },
  correct:{
    color: 'lightgreen'
  },
  incorrect:{
    color: 'red'
  }
});
/*
appearance: none;
  background-color: #FAFBFC;
  width: 80pt;
  height: 50pt;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  box-sizing: border-box;
  color: #24292E;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  padding: 6px 16px;
  position: relative;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: break-word;
  margin-left: 10pt;*/