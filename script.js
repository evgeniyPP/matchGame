const OPENED_CLASSNAME = 'card_opened';
const SOLVED_ATTRIBUTE = 'data-solved';
const EMOJIS = ['🐳', '🐲', '🌞', '🌸', '🍑', '🍆', '🏀', '💩'];

const cards = [...document.querySelectorAll('.card')];

const cardsIdsInRandomOrder = randomizeArray(cards.map(card => getCardId(card)));

cardsIdsInRandomOrder.forEach((id, index) => {
  const card = cards.find(c => getCardId(c) === id);

  if (index >= EMOJIS.length) {
    index -= EMOJIS.length;
  }

  card.querySelector('.card__face').textContent = EMOJIS[index];
});

/**
 * @type {Element}
 */
let selectedCard;
let selectedCardId = '';
let selectedCardEmoji = '';
let isSecondCard = false;
let movesCount = 0;
let foundCardsCount = 0;

cards.forEach(card =>
  card.addEventListener('click', () => {
    if (isSecondCard) return;
    if (card.hasAttribute(SOLVED_ATTRIBUTE)) return;

    const cardId = getCardId(card);
    const cardEmoji = card.querySelector('.card__face').textContent;

    if (selectedCardId === cardId) return;

    if (!selectedCardId) {
      selectedCard = card;
      selectedCardId = cardId;
      selectedCardEmoji = cardEmoji;
    } else {
      isSecondCard = true;
    }

    card.classList.add(OPENED_CLASSNAME);

    if (!isSecondCard) return;

    if (selectedCardEmoji === cardEmoji) {
      selectedCard.setAttribute(SOLVED_ATTRIBUTE, 'true');
      card.setAttribute(SOLVED_ATTRIBUTE, 'true');
      foundCardsCount += 2;
      selectedCard = null;
      selectedCardId = '';
      selectedCardEmoji = '';
      movesCount++;

      setTimeout(() => {
        isSecondCard = false;
      }, 800);

      if (foundCardsCount === cards.length) {
        setTimeout(() => {
          alert(`Congradulations! You won in ${movesCount} moves!`);
        }, 1000);
      }
      return;
    }

    setTimeout(() => {
      selectedCard.classList.remove(OPENED_CLASSNAME);
      card.classList.remove(OPENED_CLASSNAME);
    }, 1000);
    setTimeout(() => {
      selectedCard = null;
      selectedCardId = '';
      isSecondCard = false;
      movesCount++;
    }, 1500);
  })
);

/**
 * @param {Element} card
 */
function getCardId(card) {
  return card.getAttribute('data-id');
}

/**
 * @template T
 * @param {T[]} array
 * @returns {T[]}
 */
function randomizeArray(array) {
  const output = [...array];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [output[i], output[j]] = [output[j], output[i]];
  }

  return output;
}
