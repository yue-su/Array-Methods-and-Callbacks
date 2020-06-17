import { fifaData } from './fifa.js';
// console.log(fifaData);
// console.log('its working');
// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. 
Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */

// --- a b c d ---
const homeGoals = fifaData.filter((item) => item.Year === 2014);
console.log(homeGoals.map((item) => item['Home Team Name']));
console.log(homeGoals.map((item) => item['Away Team Name']));
console.log(homeGoals.map((item) => item['Home Team Goals']));
console.log(homeGoals.map((item) => item['Away Team Goals']));

// --- e ---
const winner = fifaData.filter((item) => item.Stage === 'Final' && item.Year === 2014 );
console.log(winner[0]['Home Team Goals'] > winner[0]['Away Team Goals'] ? winner[0]['Home Team Goals'] : winner[0]['Away Team Goals']);


/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(data) {
    return data.filter((item) => item.Stage === 'Final')
};
console.log(getFinals(fifaData));

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(callback) {
    const years = (callback.map((item) => item.Year));
    return years;
}

getYears(getFinals(fifaData));

/* Task 5: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 

function getWinners(callback) {
    const winner = (callback.map((item) => item['Home Team Goals'] > item['Away Team Goals']? item['Home Team Name']:item['Away Team Name']));
    return winner;
};

getWinners(getFinals(fifaData));

/* Task 6: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

 function getWinnersByYear(func1, func2){
    const result = [];
    const winners = func1;
    const years = func2;
    for (let i = 0; i<years.length; i++) {
        result.push(`In ${years[i]}, ${winners[i]} won the world cup!`);
    }
    return result;
 }

console.log(getWinnersByYear(getWinners(getFinals(fifaData)), getYears(getFinals(fifaData))));

/* Task 7: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match 
(Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {

    const avgHome = data.map((item) => item["Home Team Goals"]).reduce(((a, b)=>a+b))/data.length;
    const avgAway = data.map((item) => item["Away Team Goals"]).reduce(((a, b)=>a+b))/data.length;
    console.log(`the average of Home team is ${avgHome} and Away Team is ${avgAway}`);
};

getAverageGoals(fifaData);

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` 
and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, init) {

    const arr = data.filter((item) => item['Home Team Initials'] === init && item['Home Team Goals'] > item['Away Team Goals']);
    const arr2 = data.filter((item) => item['Away Team Initials'] === init && item['Away Team Goals'] > item['Home Team Goals']);
    return arr.length + arr2.length;
};  

console.log(getCountryWins(fifaData, 'ITA'));


/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` 
and returns the team with the most goals score per appearance (average goals for) 
in the World Cup finals */

function getGoals(data) {
    // step 1 -- filter the final team list.
    const final = data.filter((item)=> item.Stage === 'Final');
    console.log(final);

    // step 2 -- since it doesn't matter if it's Home or Away, I'll just put them in a new array with name and score and appearance
    const nameScore = [];
    for (let i = 0; i < final.length; i++) {
        nameScore.push({name : final[i]['Home Team Name'], score : final[i]['Home Team Goals'], appearance : 1});
        nameScore.push({name : final[i]['Away Team Name'], score : final[i]['Away Team Goals'], appearance : 1});
    }
    // step 3 -- find out items with same name and then update the score and appearance. Also replace the duplicates with ''
    console.log(nameScore);
    for (let i = 0; i<nameScore.length; i++) {
        for(let j = 1 + i; j<nameScore.length; j++) {
            if(nameScore[i].name === nameScore[j].name) {
                nameScore[i].appearance++;
                nameScore[i].score += nameScore[j].score;
                nameScore[j].name = '';
            }
        }
    }
    // step 4 -- filter the final list of 13 teams
    const finalList = nameScore.filter((item)=>item.name !== '')
    console.log(finalList);
    const averageList = [];
    for (let i = 0; i<finalList.length; i++) {
        averageList[i] = {name: finalList[i].name, average: finalList[i].score / finalList[i].appearance}
    }
    console.log(averageList);
    // step 5 -- sort the queue with the max in the top
    let max = [...averageList];
    max.sort((a, b) =>  b.average - a.average );
    console.log(max);
    console.log(`The best team are ${max[0].name} and ${max[1].name}`)
};

getGoals(fifaData);


/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data) {

    /* code here */

};

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
