let newDeal = document.querySelector('.new')
let dealerUp = document.querySelector('#dealerUp')
let playerUp1 = document.querySelector('#playerUp1')
let playerUp2 = document.querySelector('#playerUp2')
let analysis = document.querySelector('.analysis')
let hit = document.querySelector('.hit')
let stand = document.querySelector('.stand')
let double = document.querySelector('.double')
let split = document.querySelector('.split')


//create a deck of cards from A hearts to K clubs and store in array
const suits = ["♥", "♦", "♠", "♣"] 
const numbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
const deck= []

for(const suit of suits){
    for(const number of numbers){
        deck.push(number + suit)
    }
}

let correctCount = 0;
let totalCount = 0;

//on click new deal button, randomly change cards
newDeal.addEventListener('click', () => {
    //add one to total count every new deal
    totalCount++
    console.log(totalCount)
    //initialize analysis to empty
    analysis.innerText = '';
    //getting three random numbers to feed into randomDeal
    let a = Math.floor(Math.random() * 52)
    let b = Math.floor(Math.random() * 52)
    let c = Math.floor(Math.random() * 52)
    //invoke function on each spot
    randomDeal(dealerUp, a)
    randomDeal(playerUp1, b)
    randomDeal(playerUp2, c)

    // define variables
    let dealerValue= getValue(dealerUp)
    let playerValue= 0;
    let p1val = getValue(playerUp1)
    let p2val = getValue(playerUp2)
    let p1cardNumber= playerUp1.getAttribute('value').slice(0,-1)
    let p2cardNumber= playerUp2.getAttribute('value').slice(0,-1)
    let dcardNumber= dealerUp.getAttribute('value').slice(0,-1)
    let correct;
    let playerAction;

    //if statement changes value to concatenated number if player hand is a pair
    if(p1val === p2val){
        playerValue = parseInt('' + p1val + p2val)
    } else {
        playerValue = getValue(playerUp1) + getValue(playerUp2)
    }

    //if statement checks for blackjack
    if(playerValue === 1121){
        correct = 'blackjack'
        analysis.innerText = correct    
    } else {
        correct = basicStrategy[playerValue][dealerValue]
        showAnalysis(hit)
        showAnalysis(stand)
        showAnalysis(double)
        showAnalysis(split)
    }

    //add an event listener to action buttons and compare user action with the correct move
    function showAnalysis(action){
        action.addEventListener('click', () => {
            let playerAction = action.innerText
            if(playerAction === correct && analysis.innerText === ''){
                analysis.innerText = `Correct! Player ${p1cardNumber} and ${p2cardNumber} against dealer ${dcardNumber} is a ${correct} `
                correctCount++
            } else if(playerAction != correct && analysis.innerText === ''){
                analysis.innerText = `Incorrect. Player ${p1cardNumber} and ${p2cardNumber} against dealer ${dcardNumber} is a ${correct}`
                
                correctCount--
                
            }
            console.log(correctCount)
        })
    }

})



//function takes in a number and cart spot and generates the card at deck[number]
function randomDeal(cardspot, randomNum){
    cardspot.setAttribute('value', deck[randomNum])
        let aSplit= deck[randomNum].split('')
        let x= ((deck[randomNum].split('').length)-1)
        cardspot.innerText = aSplit[x]
        
        if (aSplit[x] === "♠" || aSplit[x]=== "♣"){
            if(cardspot.className ==="card red-card"){
                cardspot.className = "card black-card"
            }
        } else if(aSplit[x] === "♥" || aSplit[x]=== "♦"){
            if(cardspot.className ==="card black-card"){
                cardspot.className = "card red-card"
            }
        }
}



// gets value of card (k q j = 10 and A = 1111)
function getValue(cardspot){
    let val= 0
    let cardVal= cardspot.getAttribute("value")
    if (cardVal.split('')[0] === "K" || cardVal.split('')[0] === "Q" || cardVal.split('')[0] === "J"){
        val = 10
    }else if(cardVal.split('')[0] === "A"){
        val = 1111
        
    }else {
        val = parseInt(cardVal)
    }
    return val
}


//object inside object to store basic strategy rules
const basicStrategy= {
    1120: {2:"Stand", 3:"Stand", 4:"Stand", 5:"Stand", 6:"Stand", 7:"Stand", 8:"Stand", 9:"Stand", 10:"Stand", 1111:"Stand"},
    1119: {2:"Stand", 3:"Stand", 4:"Stand", 5:"Stand", 6:"Double", 7:"Stand", 8:"Stand", 9:"Stand", 10:"Stand", 1111:"Stand"},
    1118: {2:"Double", 3:"Double", 4:"Double", 5:"Double", 6:"Double", 7:"Stand", 8:"Stand", 9:"Hit", 10:"Hit", 1111:"Hit"},
    1117: {2:"Hit", 3:"Double", 4:"Double", 5:"Double", 6:"Double", 7:"Hit", 8:"Hit", 9:"Hit", 10:"Hit", 1111:"Hit"},
    1116: {2:"Hit", 3:"Hit", 4:"Double", 5:"Double", 6:"Double", 7:"Hit", 8:"Hit", 9:"Hit", 10:"Hit", 1111:"Hit"},
    1115: {2:"Hit", 3:"Hit", 4:"Hit", 5:"Double", 6:"Double", 7:"Hit", 8:"Hit", 9:"Hit", 10:"Hit", 1111:"Hit"},
    1114: {2:"Hit", 3:"Hit", 4:"Hit", 5:"Double", 6:"Double", 7:"Hit", 8:"Hit", 9:"Hit", 10:"Hit", 1111:"Hit"},
    1113: {2:"Hit", 3:"Hit", 4:"Hit", 5:"Double", 6:"Double", 7:"Hit", 8:"Hit", 9:"Hit", 10:"Hit", 1111:"Hit"},
    11111111: {2:"Split", 3:"Split", 4:"Split", 5:"Split", 6:"Split", 7:"Split", 8:"Split", 9:"Split", 10:"Split", 1111:"Split"},
    1010: {2:"Stand", 3:"Stand", 4:"Stand", 5:"Stand", 6:"Stand", 7:"Stand", 8:"Stand", 9:"Stand", 10:"Stand", 1111:"Stand"},
    99: {2:"Split", 3:"Split", 4:"Split", 5:"Split", 6:"Split", 7:"Stand", 8:"Split", 9:"Split", 10:"Stand", 1111:"Stand"},
    88: {2:"Split", 3:"Split", 4:"Split", 5:"Split", 6:"Split", 7:"Split", 8:"Split", 9:"Split", 10:"Split", 1111:"Split"},
    77: {2:"Split", 3:"Split", 4:"Split", 5:"Split", 6:"Split", 7:"Split", 8:"Hit", 9:"Hit", 10:"Hit", 1111:"Hit"},
    66: {2:"Split", 3:"Split", 4:"Split", 5:"Split", 6:"Split", 7:"Hit", 8:"Hit", 9:"Hit", 10:"Hit", 1111:"Hit"},
    55: {2:"Double", 3:"Double", 4:"Double", 5:"Double", 6:"Double", 7:"Double", 8:"Double", 9:"Double", 10:"Hit", 1111:"Hit"},
    44: {2:"Hit", 3:"Hit", 4:"Hit", 5:"Split", 6:"Split", 7:"Hit", 8:"Hit", 9:"Hit", 10:"Hit", 1111:"Hit"},
    33: {2:"Split", 3:"Split", 4:"Split", 5:"Split", 6:"Split", 7:"Split", 8:"Hit", 9:"Hit", 10:"Hit", 1111:"Hit"},
    22: {2:"Split", 3:"Split", 4:"Split", 5:"Split", 6:"Split", 7:"Split", 8:"Hit", 9:"Hit", 10:"Hit", 1111:"Hit"},
    20: {2:"Stand", 3:"Stand", 4:"Stand", 5:"Stand", 6:"Stand", 7:"Stand", 8:"Stand", 9:"Stand", 10:"Stand", 1111:"Stand"},
    19: {2:"Stand", 3:"Stand", 4:"Stand", 5:"Stand", 6:"Stand", 7:"Stand", 8:"Stand", 9:"Stand", 10:"Stand", 1111:"Stand"},
    18: {2:"Stand", 3:"Stand", 4:"Stand", 5:"Stand", 6:"Stand", 7:"Stand", 8:"Stand", 9:"Stand", 10:"Stand", 1111:"Stand"},
    17: {2:"Stand", 3:"Stand", 4:"Stand", 5:"Stand", 6:"Stand", 7:"Stand", 8:"Stand", 9:"Stand", 10:"Stand", 1111:"Stand"},
    16: {2:"Stand", 3:"Stand", 4:"Stand", 5:"Stand", 6:"Stand", 7:"Hit", 8:"Hit", 9:"Hit", 10:"Hit", 1111:"Hit"},
    15: {2:"Stand", 3:"Stand", 4:"Stand", 5:"Stand", 6:"Stand", 7:"Hit", 8:"Hit", 9:"Hit", 10:"Hit", 1111:"Hit"},
    14: {2:"Stand", 3:"Stand", 4:"Stand", 5:"Stand", 6:"Stand", 7:"Hit", 8:"Hit", 9:"Hit", 10:"Hit", 1111:"Hit"},
    13: {2:"Stand", 3:"Stand", 4:"Stand", 5:"Stand", 6:"Stand", 7:"Hit", 8:"Hit", 9:"Hit", 10:"Hit", 1111:"Hit"},
    12: {2:"Hit", 3:"Hit", 4:"Stand", 5:"Stand", 6:"Stand", 7:"Hit", 8:"Hit", 9:"Hit", 10:"Hit", 1111:"Hit"},
    11: {2:"Double", 3:"Double", 4:"Double", 5:"Double", 6:"Double", 7:"Double", 8:"Double", 9:"Double", 10:"Double", 1111:"Double"},
    10: {2:"Double", 3:"Double", 4:"Double", 5:"Double", 6:"Double", 7:"Double", 8:"Double", 9:"Double", 10:"Hit", 1111:"Hit"},
    9: {2:"Hit", 3:"Double", 4:"Double", 5:"Double", 6:"Double", 7:"Hit", 8:"Hit", 9:"Hit", 10:"Hit", 1111:"Hit"},
    8: {2:"Hit", 3:"Hit", 4:"Hit", 5:"Hit", 6:"Hit", 7:"Hit", 8:"Hit", 9:"Hit", 10:"Hit", 1111:"Hit"},
    7: {2:"Hit", 3:"Hit", 4:"Hit", 5:"Hit", 6:"Hit", 7:"Hit", 8:"Hit", 9:"Hit", 10:"Hit", 1111:"Hit"},
    6: {2:"Hit", 3:"Hit", 4:"Hit", 5:"Hit", 6:"Hit", 7:"Hit", 8:"Hit", 9:"Hit", 10:"Hit", 1111:"Hit"},
    5: {2:"Hit", 3:"Hit", 4:"Hit", 5:"Hit", 6:"Hit", 7:"Hit", 8:"Hit", 9:"Hit", 10:"Hit", 1111:"Hit"},
}