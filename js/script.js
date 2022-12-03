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

    let dealerValue= getDealerValue(dealerUp)
    console.log(dealerValue)


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


// need to get the value of the two player cards added together as well as the dealer's
//use ParseInt()


function getDealerValue(cardspot){
    let dealerVal= 0
    let cardVal= cardspot.getAttribute("value")
    if (cardVal.split('')[0] === "K" || cardVal.split('')[0] === "Q" || cardVal.split('')[0] === "J"){
        dealerVal = 10
    }else if(cardVal.split('')[0] === "A"){
        dealerVal = 1

    }else {
        dealerVal = parseInt(cardVal)
    }
    return dealerVal
}




