import alienHater from "../img/alienHater.png"
import angelHater from "../img/angelHater.png"
import catHater from "../img/catHater.png"
import cockHater from "../img/cockHater.png"
import granddadHater from "../img/granddadHater.png"
import muchachaHater from "../img/muchachaHater.png"
import standartHater from "../img/standartHater.png"
import sunHater from "../img/sunHater.png"
import ukrHater from "../img/ukrHater.png"

import coolHater from "../img/coolHater.png"
import cyclopeHater from "../img/cyclopeHater.png"
import fallenInLoveHater from "../img/fallenInLoveHater.png"
import gentelmanHater from "../img/gentelmanHater.png"
import kingHater from "../img/kingHater.png"
import emoHater from "../img/emoHater.png"
import pumpkinHater from "../img/pumpkinHater.png"
import flowerHater from "../img/flowerHater.png"
import lockedHater from "../img/lockedHater.png"

const imgData = [ 
    {
        id: 1,
        image: alienHater,
        name: "Alien",
        isSelected: false,
        description: {
            title: "Very mysterious guy.",
            superpower: " can shoot you with the lasers from their eyes."
        }
    },
    {
        id: 2,
        image: angelHater,
        name: "Angel",
        isSelected: false,
        description:{ 
            title: "Calm and quiet, until they open the 'Haterville'.",
            superpower: " God helps them to destroy everything annoying."
        }
        
    },
    { 
        id: 4, 
        image: catHater,
        name: "Meow",
        isSelected: false,
        description: {
            title: "Meow meow meow.",
            superpower: "their beauty and gentleness rules the world."
        } 
    },

    {
        id: 5,
        image: cockHater,
        name: "Cock",
        isSelected: false,
        description: {
            title: "Seems to be an antagonist, but actually is cute enough.",
            superpower: "is ENTP."
        }
    },
    {
        id: 7,
        image: muchachaHater,
        name: "Moustached",
        isSelected: false,
        description: {
            title: "One of the best guys here. They are open-hearted and very cute.",
            superpower: "are cute even when they are furious. people always say YES to them"
        }
    },
    {
        id: 8,
        image: standartHater,
        name: "Standard",
        isSelected: false,
        description: {
            title: "Just a standard hater.",
            superpower: "works 8 hours per day 5 days a week."
        }
    },
    {
        id: 9,
        image: sunHater,
        name: "Sun",
        isSelected: false,
        description: {
            title: "THE ROOF THE ROOF THE ROOF IS ON FIRE",
            superpower: "can be warm or can be real hot."
        }
    },
    {
        id: 10,
        image: ukrHater,
        name: "Українець",
        isSelected: false,
        description: {
            title: "Шановна і поважна людина. ",
            superpower: "безмежна сила духу, любов до України і нескінченний запас борщу та сала."
        }
    },
    /* ---- Profile Images For Click Hates ---- */
    {
        id: 6, 
        image: granddadHater,
        name: "Granddad",
        isSelected: false,
        description: {
            title: "Does not know what is he doing here.",
            superpower: "much better than his son."
        },
        numOfClicks: 10000
    },
    {
        id: 11,
        image: coolHater,
        name: "Cool",
        isSelected: false,
        numOfClicks: 4444,
        description: {
            title: "Just a cool guy.",
            superpower: "chills."
        }
    },
    {
        id: 12,
        image: cyclopeHater,
        name: "Cyclope",
        numOfClicks: 6666,
        description: {
            title: "Cyclope.",
            superpower: "can look at the sun via a telescope only once."
        }
    },
    {
        id: 13,
        image: fallenInLoveHater,
        name: "Fallen in Love",
        numOfClicks: 444,
        description: {
            title: "They are cuter than usual now. Do not distract them.",
            superpower: "the one who knows everything about dophamine & endorphine."
        }
    },
    {
        id: 14,
        image: gentelmanHater,
        name: "Gentelman",
        numOfClicks: 8888,
        description: {
            title: "They asked not to call them 'a guy', so please call them 'gentleman'.",
            superpower: "knows more than 1000 interesting facts about worms. Also is British."
        }
    },
    {
        id: 15,
        image: kingHater,
        name: "The King",
        numOfClicks: 2222,
        description: {
            title: "Ew.",
            superpower: "of beasts."
        }
    },
    {
        id: 16, 
        image: emoHater,
        name: "Emo",
        numOfClicks: 15000,
        description: {
            title: "You can break their heart but you'll never break their love to 'Tokio Hotel'.",
            superpower: "the best users of 'Emo Diary'."
        }
    },
    {
        id: 17,
        image: pumpkinHater,
        name: "Pumpkin",
        numOfClicks: 20000,
        description: {
            title: "Boo! Congrats with Halloween ;)",
            superpower: "trick or treat!"
        }
    },
    {
        id: 18,
        image: flowerHater,
        name: "Flower",
        numOfClicks: 222,
        description: {
            title: "Just a flower.",
            superpower: "just grows up & smells good"
        }
    },
    {
        id: 0,
        image: lockedHater,
        name: "Locked :(",
        numOfClicks: 0,
        description: { title: "Click more to get me ;)" }
    }
]


export default { 
    imgData,
    findImage: (imageid) => {
        const img = imgData.find(image => image.id === imageid)
        return img.image
    } 
}
