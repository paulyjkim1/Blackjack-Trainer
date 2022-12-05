//create a deck of cards from A hearts to K clubs and store in array
const suits = ["♥", "♦", "♠", "♣"] 
const numbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
const deck= []

for(const suit of suits){
    for(const number of numbers){
        deck.push(number + suit)
    }
}

let newDeal = document.querySelector('.new')
let dealerUp = document.querySelector('#dealerUp')
let playerUp1 = document.querySelector('#playerUp1')
let playerUp2 = document.querySelector('#playerUp2')
let analysis = document.querySelector('.analysis')
let hit = document.querySelector('.hit')
let stay = document.querySelector('.stay')
let double = document.querySelector('.double')
let spit = document.querySelector('.split')


//on click new deal button, randomly change cards
newDeal.addEventListener('click', () => {
    
    //getting three random numbers to feed into randomDeal
    let a = Math.floor(Math.random() * 52)
    let b = Math.floor(Math.random() * 52)
    let c = Math.floor(Math.random() * 52)
    //invoke function on each spot
    randomDeal(dealerUp, a)
    randomDeal(playerUp1, b)
    randomDeal(playerUp2, c)

    let dealerValue= getValue(dealerUp)
    let playerValue= 0;
    let p1val = getValue(playerUp1)
    let p2val = getValue(playerUp2)
    let correct;
    //if statement here changes values for pairs
    if(p1val === p2val){
        playerValue = parseInt('' + p1val + p2val)
    } else {
        playerValue = getValue(playerUp1) + getValue(playerUp2)
    }

    if(playerValue === 1121){
        correct = 'blackjack'
        analysis.innerText = correct
        
    } else {
        correct = basicStrategy[playerValue][dealerValue]
        
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



// gets value of card (k q j = 10 and A = 1)
//coud do just a getValue function and the player value is just equal to the two player cardspot values
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

//function that takes in the playervalue as parameter and identifies if its a hard hand, soft hand, or pair


// Aces can be their own thing, set it to a huge value (1111)
// Pairs: check if two player cards are the same, if they are, set value to the two numbers concatenated, not added. For ex. if player has two 9s value would be 99 instead of 18.
// Done by parseInt('' + getValue(playerUpcard1) + getValue(playerUpcard2))
//  Main conditional:
// if (value === 1121) {player has a blackjack} 
// else if (value is less than 22 (22 being pocket 2s)) {player value = two card values added together (ex. KQ = 20)- compare with hard hand rules}
// else if (value is < 1010) {player has pair, compare with pair rules}
// else if (value is < 1121) {player has soft hand, compare with soft hand rules}
// else {player has pocket aces (value of 11111111) compare with pair rules}


const basicStrategy= {
    1120: {2:"s", 3:"s", 4:"s", 5:"s", 6:"s", 7:"s", 8:"s", 9:"s", 10:"s", 1111:"s"},
    1119: {2:"s", 3:"s", 4:"s", 5:"s", 6:"d", 7:"s", 8:"s", 9:"s", 10:"s", 1111:"s"},
    1118: {2:"d", 3:"d", 4:"d", 5:"d", 6:"d", 7:"s", 8:"s", 9:"h", 10:"h", 1111:"h"},
    1117: {2:"h", 3:"d", 4:"d", 5:"d", 6:"d", 7:"h", 8:"h", 9:"h", 10:"h", 1111:"h"},
    1116: {2:"h", 3:"h", 4:"d", 5:"d", 6:"d", 7:"h", 8:"h", 9:"h", 10:"h", 1111:"h"},
    1115: {2:"h", 3:"h", 4:"d", 5:"d", 6:"d", 7:"h", 8:"h", 9:"h", 10:"h", 1111:"h"},
    1114: {2:"h", 3:"h", 4:"h", 5:"d", 6:"d", 7:"h", 8:"h", 9:"h", 10:"h", 1111:"h"},
    1113: {2:"h", 3:"h", 4:"h", 5:"d", 6:"d", 7:"h", 8:"h", 9:"h", 10:"h", 1111:"h"},
    11111111: {2:"sp", 3:"sp", 4:"sp", 5:"sp", 6:"sp", 7:"sp", 8:"sp", 9:"sp", 10:"sp", 1111:"sp"},
    1010: {2:"s", 3:"s", 4:"s", 5:"s", 6:"s", 7:"s", 8:"s", 9:"s", 10:"s", 1111:"s"},
    99: {2:"sp", 3:"sp", 4:"sp", 5:"sp", 6:"sp", 7:"s", 8:"sp", 9:"sp", 10:"s", 1111:"s"},
    88: {2:"sp", 3:"sp", 4:"sp", 5:"sp", 6:"sp", 7:"sp", 8:"sp", 9:"sp", 10:"sp", 1111:"sp"},
    77: {2:"sp", 3:"sp", 4:"sp", 5:"sp", 6:"sp", 7:"sp", 8:"h", 9:"h", 10:"h", 1111:"h"},
    66: {2:"sp", 3:"sp", 4:"sp", 5:"sp", 6:"sp", 7:"h", 8:"h", 9:"h", 10:"h", 1111:"h"},
    55: {2:"d", 3:"d", 4:"d", 5:"d", 6:"d", 7:"d", 8:"d", 9:"d", 10:"h", 1111:"h"},
    44: {2:"h", 3:"h", 4:"h", 5:"sp", 6:"sp", 7:"h", 8:"h", 9:"h", 10:"h", 1111:"h"},
    33: {2:"sp", 3:"sp", 4:"sp", 5:"sp", 6:"sp", 7:"sp", 8:"h", 9:"h", 10:"h", 1111:"h"},
    22: {2:"sp", 3:"sp", 4:"sp", 5:"sp", 6:"sp", 7:"sp", 8:"h", 9:"h", 10:"h", 1111:"h"},
    20: {2:"s", 3:"s", 4:"s", 5:"s", 6:"s", 7:"s", 8:"s", 9:"s", 10:"s", 1111:"s"},
    19: {2:"s", 3:"s", 4:"s", 5:"s", 6:"s", 7:"s", 8:"s", 9:"s", 10:"s", 1111:"s"},
    18: {2:"s", 3:"s", 4:"s", 5:"s", 6:"s", 7:"s", 8:"s", 9:"s", 10:"s", 1111:"s"},
    17: {2:"s", 3:"s", 4:"s", 5:"s", 6:"s", 7:"s", 8:"s", 9:"s", 10:"s", 1111:"s"},
    16: {2:"s", 3:"s", 4:"s", 5:"s", 6:"s", 7:"h", 8:"h", 9:"h", 10:"h", 1111:"h"},
    15: {2:"s", 3:"s", 4:"s", 5:"s", 6:"s", 7:"h", 8:"h", 9:"h", 10:"h", 1111:"h"},
    14: {2:"s", 3:"s", 4:"s", 5:"s", 6:"s", 7:"h", 8:"h", 9:"h", 10:"h", 1111:"h"},
    13: {2:"s", 3:"s", 4:"s", 5:"s", 6:"s", 7:"h", 8:"h", 9:"h", 10:"h", 1111:"h"},
    12: {2:"h", 3:"h", 4:"s", 5:"s", 6:"s", 7:"h", 8:"h", 9:"h", 10:"h", 1111:"h"},
    11: {2:"d", 3:"d", 4:"d", 5:"d", 6:"d", 7:"d", 8:"d", 9:"d", 10:"d", 1111:"d"},
    10: {2:"d", 3:"d", 4:"d", 5:"d", 6:"d", 7:"d", 8:"d", 9:"d", 10:"h", 1111:"h"},
    9: {2:"h", 3:"d", 4:"d", 5:"d", 6:"d", 7:"h", 8:"h", 9:"h", 10:"h", 1111:"h"},
    8: {2:"h", 3:"h", 4:"h", 5:"h", 6:"h", 7:"h", 8:"h", 9:"h", 10:"h", 1111:"h"},
    7: {2:"h", 3:"h", 4:"h", 5:"h", 6:"h", 7:"h", 8:"h", 9:"h", 10:"h", 1111:"h"},
    6: {2:"h", 3:"h", 4:"h", 5:"h", 6:"h", 7:"h", 8:"h", 9:"h", 10:"h", 1111:"h"},
    5: {2:"h", 3:"h", 4:"h", 5:"h", 6:"h", 7:"h", 8:"h", 9:"h", 10:"h", 1111:"h"},
}