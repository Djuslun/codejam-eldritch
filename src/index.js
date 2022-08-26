import ancientsData from './data/ancients'
import brownCardsData from './data/MythicCards/brown'
import blueCardsData from './data/MythicCards/blue'
import greenCardsData from './data/MythicCards/green'

const Deck = document.querySelector('.deck');
const card = document.querySelector('.card');
const difficulty = document.getElementById('difficulty');
const ancients = document.querySelector('.container');
const counterFirsfStage = document.querySelector('.first');
const counterSecondStage = document.querySelector('.second');
const counterThirdStage = document.querySelector('.third');


let deck = [];
let currentAncient;

ancientsData.forEach(item => {
	let element;
	let num;
	element = document.createElement('div');
	element.classList.add('ancient');
	ancients.append(element);
	element.style.backgroundImage = `url(${item.cardFace})`;
	element.addEventListener('click', (e) => {
		Deck.removeEventListener('click', clickOnDeck);
		num = ancientsData.indexOf(item);
		currentAncient = ancientsData[num];
		deckManager(currentAncient);
		removeClass();
		element.classList.add('active')
	})
})


difficulty.addEventListener('change', () => {
	deckManager(currentAncient);
})

let ancientsCard = document.querySelectorAll('.ancient');

function removeClass() {
	ancientsCard.forEach((item) => {
		item.classList.remove('active');
	})
}

function clickOnDeck() {
	if (deck.length > 1) {
		createCard();
	}
	else {
		createCard();
		Deck.style.backgroundImage = '';
		Deck.removeEventListener('click', clickOnDeck);
	}
}

let counter;

function createCard() {
	card.innerHTML = '';
	let img = document.createElement('div');
	img.classList.add('card-item');
	let imgSrc = {};
	imgSrc = deck.pop();
	img.style.backgroundImage = `url('${imgSrc.cardFace}')`
	card.append(img);
	counter(imgSrc);
}

function deckManager(ancient) {
	Deck.style.backgroundImage = 'url(src/assets/mythicCardBackground.png)'
	counterFirsfStage.style.color = '';
	counterSecondStage.style.color = '';
	counterThirdStage.style.color = '';
	let greenArr = [];
	let brownArr = [];
	let blueArr = [];
	function getSumOfCards() {
		let greenCard = [];
		let greenCards = [...greenCardsData];
		let brownCard = [];
		let brownCards = [...brownCardsData];
		let blueCard = [];
		let blueCards = [...blueCardsData];

		if (difficulty.value == 'hard') {
			greenCard = greenCards.filter((item) => {
				return item.difficulty !== 'easy'
			})
			brownCard = brownCards.filter((item) => {
				return item.difficulty !== 'easy'
			})
			blueCard = blueCards.filter((item) => {
				return item.difficulty !== 'easy'
			})
		}
		if (difficulty.value == 'easy') {
			greenCard = greenCards.filter((item) => {
				return item.difficulty !== 'hard'
			})
			brownCard = brownCards.filter((item) => {
				return item.difficulty !== 'hard'
			})
			blueCard = blueCards.filter((item) => {
				return item.difficulty !== 'hard'
			})
		}

		if (difficulty.value == 'normal') {
			greenCard = greenCards;
			brownCard = brownCards;
			blueCard = blueCards;
		}

		let green = ancient.firstStage.greenCards + ancient.secondStage.greenCards + ancient.thirdStage.greenCards;
		let brown = ancient.firstStage.brownCards + ancient.secondStage.brownCards + ancient.thirdStage.brownCards;
		let blue = ancient.firstStage.blueCards + ancient.secondStage.blueCards + ancient.thirdStage.blueCards;

		while (greenArr.length < green) {
			let num = Math.floor(Math.random() * greenCard.length);
			greenArr.push(greenCard[num]);
			greenCard.splice(num, 1)
		}

		while (brownArr.length < brown) {
			let num = Math.floor(Math.random() * brownCard.length);
			brownArr.push(brownCard[num]);
			brownCard.splice(num, 1)
		}

		while (blueArr.length < blue) {
			let num = Math.floor(Math.random() * blueCard.length);
			blueArr.push(blueCard[num]);
			blueCard.splice(num, 1)
		}

	}
	getSumOfCards();

	let firstStageStack = [];
	firstStageStack = [...greenArr.splice(0, ancient.firstStage.greenCards), ...brownArr.splice(0, ancient.firstStage.brownCards), ...blueArr.splice(0, ancient.firstStage.blueCards)]
	firstStageStack.sort(() => Math.random() - 0.5)
	let secondStageStack = [];
	secondStageStack = [...greenArr.splice(0, ancient.secondStage.greenCards), ...brownArr.splice(0, ancient.secondStage.brownCards), ...blueArr.splice(0, ancient.secondStage.blueCards)];
	secondStageStack.sort(() => Math.random() - 0.5);
	let thirdStageStack = [];
	thirdStageStack = [...greenArr.splice(0, ancient.thirdStage.greenCards), ...brownArr.splice(0, ancient.thirdStage.brownCards), ...blueArr.splice(0, ancient.thirdStage.blueCards)]
	thirdStageStack.sort(() => Math.random() - 0.5);

	deck = [...thirdStageStack, ...secondStageStack, ...firstStageStack];

	card.innerHTML = '';

	Deck.addEventListener('click', clickOnDeck);

	counter = function (imgSrc) {

		if (imgSrc.color === 'green' && Number(counterFirsfGreen.textContent) > 0) {
			counterFirsfGreen.textContent = Number(counterFirsfGreen.textContent) - 1;
		}
		else if (imgSrc.color === 'green' && Number(counterSeconfGreen.textContent) > 0) {
			counterSeconfGreen.textContent = Number(counterSeconfGreen.textContent) - 1;
		}
		else if (imgSrc.color === 'green' && Number(counterThirdGreen.textContent) > 0) {
			counterThirdGreen.textContent = Number(counterThirdGreen.textContent) - 1;
		}
		if (imgSrc.color === 'blue' && Number(counterFirsfBlue.textContent) > 0) {
			counterFirsfBlue.textContent = Number(counterFirsfBlue.textContent) - 1;
		}
		else if (imgSrc.color === 'blue' && Number(counterSeconfBlue.textContent) > 0) {
			counterSeconfBlue.textContent = Number(counterSeconfBlue.textContent) - 1;
		}
		else if (imgSrc.color === 'blue' && Number(counterThirdBlue.textContent) > 0) {
			counterThirdBlue.textContent = Number(counterThirdBlue.textContent) - 1;
		}
		if (imgSrc.color === 'brown' && Number(counterFirsfBrown.textContent) > 0) {
			counterFirsfBrown.textContent = Number(counterFirsfBrown.textContent) - 1;
		}
		else if (imgSrc.color === 'brown' && Number(counterSeconfBrown.textContent) > 0) {
			counterSeconfBrown.textContent = Number(counterSeconfBrown.textContent) - 1;
		}
		else if (imgSrc.color === 'brown' && Number(counterThirdBrown.textContent) > 0) {
			counterThirdBrown.textContent = Number(counterThirdBrown.textContent) - 1;
		}

		if (Number(counterFirsfGreen.textContent) == 0 && Number(counterFirsfBlue.textContent) == 0 && Number(counterFirsfBrown.textContent) == 0) {
			counterFirsfStage.style.color = 'red'
		}
		if (Number(counterSeconfGreen.textContent) == 0 && Number(counterSeconfBlue.textContent) == 0 && Number(counterSeconfBrown.textContent) == 0) {
			counterSecondStage.style.color = 'red'
		}
		if (Number(counterThirdGreen.textContent) == 0 && Number(counterThirdBlue.textContent) == 0 && Number(counterThirdBrown.textContent) == 0) {
			counterThirdStage.style.color = 'red'
		}
	}

	let counterFirsfGreen = document.querySelector('.first').firstElementChild;
	let counterFirsfBlue = counterFirsfGreen.nextElementSibling;
	let counterFirsfBrown = document.querySelector('.first').lastElementChild;

	counterFirsfGreen.textContent = `${ancient.firstStage.greenCards} `
	counterFirsfBlue.textContent = `${ancient.firstStage.blueCards} `
	counterFirsfBrown.textContent = `${ancient.firstStage.brownCards} `

	let counterSeconfGreen = document.querySelector('.second').firstElementChild;
	let counterSeconfBlue = counterSeconfGreen.nextElementSibling;
	let counterSeconfBrown = document.querySelector('.second').lastElementChild;

	counterSeconfGreen.textContent = `${ancient.secondStage.greenCards} `
	counterSeconfBlue.textContent = `${ancient.secondStage.blueCards} `
	counterSeconfBrown.textContent = `${ancient.secondStage.brownCards} `

	let counterThirdGreen = document.querySelector('.third').firstElementChild;
	let counterThirdBlue = counterThirdGreen.nextElementSibling;
	let counterThirdBrown = document.querySelector('.third').lastElementChild;

	counterThirdGreen.textContent = `${ancient.thirdStage.greenCards} `
	counterThirdBlue.textContent = `${ancient.thirdStage.blueCards} `
	counterThirdBrown.textContent = `${ancient.thirdStage.brownCards} `
}



