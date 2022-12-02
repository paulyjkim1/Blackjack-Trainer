const suits = ["♥", "♦", "♠", "♣"] 
const numbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
const deck= []

for(const suit of suits){
    for(const number of numbers){
        deck.push(number + suit)
    }
}

console.log(deck)

//on new deal button, randomly change cards
let newDeal = document.querySelector('.new')
let dealerUp = document.getElementById('dealerUp')
let playerUp1 = document.getElementById('playerUp1')
let playerUp2 = document.getElementById('playerUp2')



newDeal.addEventListener('click', () => {
    let a = Math.floor(Math.random() * 53)
    let b = Math.floor(Math.random() * 53)
    let c = Math.floor(Math.random() * 53)

    dealerUp.setAttribute('value', deck[a])
    playerUp1.setAttribute('value', deck[b])
    playerUp2.setAttribute('value', deck[c])
    


})