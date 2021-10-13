const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const imageElement = document.getElementById('image')
const imageElementContainer = document.getElementById('container2')


let state = {}

function startGame() {
     state = {}
     state.health = 100;
     state.gold = 100;
     state.damage = 0;
     state.gainedGold = 0;
     state.lostGold = 0;
     showTextNode(1);
     setStats();

}

function showTextNode(textNodeIndex) {

    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    setImage(textNode)
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })

}
function setImage(textNode) {
    if (textNode.imageId != null) {
        imageElement.src = textNode.imageId
    }
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}
function setStats() {
    let newHealth = state.health
    if (newHealth < 0) {
        newHealth = 0
    }
    document.getElementById("health").style.width = newHealth + "px"
    document.getElementById("gold").innerText = "GOLD: " + state.gold
    }
function selectOption(option) {

    let nextTextNodeId = option.nextText
    if (nextTextNodeId == 'Explore') {
        nextTextNodeId = (getRandomInt(3) + 251)
    }
    if (nextTextNodeId <= 0) {
        return startGame()
    }

    state = Object.assign(state, option.setState) //overrides current state with option states
    if (state.damage > 0) {
        state.health = state.health - state.damage
        state.damage = 0
    }
    if (state.lostGold > 0) {
        state.gold = state.gold - state.lostGold
        state.lostGold = 0
    }
    if (state.gainedGold > 0) {
        state.gold = state.gold + state.gainedGold
        state.gainedGold = 0
    }
    setStats()
    showTextNode(nextTextNodeId)
}

const textNodes = [
    { //LOBBY
        id: 1,
        imageId: "town.jpg",
        text: 'You are in the town square, what would you like to do?',
        options: [
            {
                text: 'Enter Shop',
                setState: { },
                nextText: 100,
            },
            {
                text: 'Enter Labyrinth',
                nextText: 200
            },
            {
                text: 'Enter Arena',
                nextText: 300
            },
            {
                text: 'Enter Casino',
                nextText: 400
            },
            {
                text: 'Tutorial',
                nextText: 600
            }
        ]
    },//lobby
    {
        id: 600,
        text: 'Just clikc the fucking buttons dumbass',
        options: [
            {
                text: 'Leave',
                nextText: 1
            },
        ]
    }, //tutorial 600
    {
        id: 400,
        text: 'Welcome to the Casino! You gotta risk-it for the biscuit!',
        options: [
            {
                text: 'Bet 10g',
                requiredState: (currentState) => currentState.gold >= 10,
                setState: {lostGold: 10},
                nextText: 401
            },
            {
                text: 'Leave',
                nextText: 1
            },
        ]
    },//casino 400
    {
        id: 300,
        text: 'Welcome to the Arena! Entertain the audience to win gold! Entry fee: 10g',
        options: [
            {
                text: 'Enter the Arena (10g)',
                requiredState: (currentState) => currentState.gold >= 10,
                setState: {lostGold: 10},
                nextText: 1
            },
            {
                text: 'Leave',
                nextText: 1
            },
        ]
    },//arena 300
    {//SHOP
        id: 100,
        imageId: "shopkeeper.jpg",
        text: 'You enter the Shop.... I sell \n -Sword (50g) \n -Shield (20g) \n -Health Potion (10g)',
        options: [
            {
                text: 'Buy Sword',
                requiredState: (currentState) => currentState.gold >= 50,
                setState: { sword: true, lostGold: 50},
                nextText: 100
            },
            {
                text: 'Buy Shield',
                requiredState: (currentState) => currentState.gold >= 20,
                setState: { shield: true, lostGold: 20},
                nextText: 100
            },
            {
                text: 'Buy Health Potion',
                requiredState: (currentState) => currentState.gold >= 10,
                setState: { newHealth: 50, lostGold: 10},
                nextText: 100
            },
            {
                text: 'Leave',
                nextText: 1
            },
        ]
    },//shop 100
    {
        id: 200,
        text: 'You are at the entrance to the Labyrinth',
        options: [
            {
                text: 'Explore',
                nextText: 'Explore'
            },
            {
                text: 'Leave',
                nextText: 1
            },
        ]
    }, //lab entrance 200
    {
        id: 251,
        imageId: '251.jpg',
        text: 'Room 251',
        options: [
            {
                text: 'Loot!',
                nextText: 251,
                setState: { gainedGold: 25 }
            },
            {
                text: 'Cool!',
                nextText: 200,
            },
        ]
    },//251
    {
        id: 252,
        imageId: '252.jpg',
        text: 'Room 252',
        options: [
            {
                text: 'Cool!',
                nextText: 200,
            },
        ]
    }, //252
    {
        id: 253,
        imageId: '253.jpg',
        text: 'Room 253',
        options: [
            {
                text: 'Cool!',
                nextText: 200,
            },
        ]
    },//253

]


startGame()

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}