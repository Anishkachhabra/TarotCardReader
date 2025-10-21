const defaultTarotCards = [
  {
    img: 'images/Cards/The Fool.png',
    name: 'The Fool: New beginnings, optimism, trust in life',
    tag: 'new beginnings'
  },
  {
    img: 'images/Cards/The Magician.png',
    name: 'The Magician: Action, the power to manifest',
    tag: 'manifestation and willpower'
  },
  {
    img: 'images/Cards/The High Priestess.png',
    name: 'The High Priestess: Inaction, going within, the subconscious',
    tag: 'intuition and inner wisdom'
  },
  {
    img: 'images/Cards/The Empress.png',
    name: 'The Empress: Abundance, nurturing, fertility, life in bloom!',
    tag: 'nurturing and growth'
  },
  {
    img: 'images/Cards/The Emperor.png',
    name: 'The Emperor: Structure, stability, rules and power',
    tag: 'authority and control'
  },
  {
    img: 'images/Cards/The Hierophant.png',
    name: 'The Hierophant: Institutions, tradition, society and its rules',
    tag: 'tradition and guidance'
  },
  {
    img: 'images/Cards/The Lovers.png',
    name: 'The Lovers: Love, harmony, relationships, values alignment, choices',
    tag: 'love and alignment'
  },
  {
    img: 'images/Cards/The Chariot.png',
    name: 'The Chariot: Movement, progress, integration',
    tag: 'determination and victory'
  },
  {
    img: 'images/Cards/Strength.png',
    name: 'Strength: Courage, subtle power, integration of animal self',
    tag: 'courage and inner strength'
  },
  {
    img: 'images/Cards/The Hermit.png',
    name: 'The Hermit: Meditation, solitude, consciousness',
    tag: 'reflection and inner search'
  },
  {
    img: 'images/Cards/Wheel of Fortune.png',
    name: 'Wheel of Fortune: Cycles, change, ups and downs',
    tag: 'change and destiny'
  },
  {
    img: 'images/Cards/Justice.png',
    name: 'Justice: Fairness, equality, balance',
    tag: 'truth and balance'
  },
  {
    img: 'images/Cards/The Hanged Man.png',
    name: 'The Hanged Man: Surrender, new perspective, enlightenment',
    tag: 'sacrifice and new perspective'
  },
  {
    img: 'images/Cards/Death.png',
    name: 'Death: The end of something, change, the impermeability of all things',
    tag: 'transformation and rebirth'
  },
  {
    img: 'images/Cards/Temperance.png',
    name: 'Temperance: Balance, moderation, being sensible',
    tag: 'harmony and moderation'
  },
  {
    img: 'images/Cards/The Tower.png',
    name: 'The Tower: Collapse of stable structures, release, sudden insight',
    tag: 'sudden change and awakening'
  },
  {
    img: 'images/Cards/The Star.png',
    name: 'The Star: Hope, calm, a good omen!',
    tag: 'hope and renewal'
  },
  {
    img: 'images/Cards/The Moon.png',
    name: 'The Moon: Mystery, the subconscious, dreams',
    tag: 'illusion and intuition'
  },
  {
    img: 'images/Cards/The Sun.png',
    name: 'The Sun: Success, happiness, all will be well',
    tag: 'joy and clarity'
  },
  {
    img: 'images/Cards/Judgment.png',
    name: 'Judgement: Rebirth, a new phase, inner calling',
    tag: 'awakening and purpose'
  },
  {
    img: 'images/Cards/The World.png',
    name: 'The World: Completion, wholeness, attainment, celebration of life',
    tag: 'fulfillment and completion'
  }
];

let editingIndex = null;
let deletingIndex = null;

// Load cards from localStorage
function getTarotCards() {
  const cards = localStorage.getItem('tarotCards');
  if (!cards || cards === 'null' || cards === '[]') {
    // Initialize with default cards
    console.log('Initializing localStorage with default cards from admin panel');
    localStorage.setItem('tarotCards', JSON.stringify(defaultTarotCards));
    return defaultTarotCards;
  }
  try {
    const parsed = JSON.parse(cards);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem('tarotCards', JSON.stringify(defaultTarotCards));
      return defaultTarotCards;
    }
    return parsed;
  } catch (e) {
    console.error('Error parsing cards:', e);
    localStorage.setItem('tarotCards', JSON.stringify(defaultTarotCards));
    return defaultTarotCards;
  }
}

// Save cards to localStorage
function saveTarotCards(cards) {
  localStorage.setItem('tarotCards', JSON.stringify(cards));
  console.log('Saved', cards.length, 'cards to localStorage');
}

// DOM Elements
const cardForm = document.getElementById('card-form');
const cardsContainer = document.getElementById('cards-container');
const logoutBtn = document.getElementById('logout-btn');
const clearAllBtn = document.getElementById('clear-all');
const cancelBtn = document.getElementById('cancel-btn');
const formTitle = document.getElementById('form-title');
const cardCount = document.getElementById('card-count');

// Modal elements
const deleteModal = document.getElementById('delete-modal');
const clearModal = document.getElementById('clear-modal');
const confirmDelete = document.getElementById('confirm-delete');
const cancelDelete = document.getElementById('cancel-delete');
const confirmClear = document.getElementById('confirm-clear');
const cancelClear = document.getElementById('cancel-clear');

// Display all cards
function displayCards() {
  const tarotCards = getTarotCards();
  console.log('Displaying cards:', tarotCards.length);
  cardsContainer.innerHTML = '';
  cardCount.textContent = `${tarotCards.length} Card${tarotCards.length !== 1 ? 's' : ''}`;

  if (!tarotCards || tarotCards.length === 0) {
    cardsContainer.innerHTML = `
                    <div class="empty-state">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3>No cards yet</h3>
                        <p>Create your first tarot card to get started</p>
                    </div>
                `;
    return;
  }

  tarotCards.forEach((card, index) => {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card-item');
    cardEl.innerHTML = `
                    <img src="${card.img}" alt="${card.name}" onerror="this.src='https://via.placeholder.com/200x200?text=No+Image'">
                    <h3>${card.name.split(':')[0]}</h3>
                    <p>${card.tag}</p>
                    <div class="card-actions">
                        <button class="btn-edit" data-index="${index}">Edit</button>
                        <button class="btn-delete" data-index="${index}">Delete</button>
                    </div>
                `;
    cardsContainer.appendChild(cardEl);
  });
}

// Add or update card
cardForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('card-name').value.trim();
  const tag = document.getElementById('card-tag').value.trim();
  const meaning = document.getElementById('card-meaning').value.trim();
  const image = document.getElementById('card-image').value.trim();

  if (!name || !tag || !meaning || !image) {
    alert('Please fill in all fields.');
    return;
  }

  const cardData = {
    img: image,
    name: `${name}: ${meaning}`,
    tag: tag
  };

  const tarotCards = getTarotCards();

  if (editingIndex !== null) {
    tarotCards[editingIndex] = cardData;
    editingIndex = null;
    formTitle.textContent = 'Add New Card';
    cancelBtn.classList.remove('active');
  } else {
    tarotCards.push(cardData);
  }

  saveTarotCards(tarotCards);
  displayCards();
  cardForm.reset();
});

// Handle edit and delete buttons
cardsContainer.addEventListener('click', function (e) {
  const index = e.target.dataset.index;

  if (e.target.classList.contains('btn-edit')) {
    const tarotCards = getTarotCards();
    const card = tarotCards[index];
    const [cardName, ...meaningParts] = card.name.split(':');
    const cardMeaning = meaningParts.join(':').trim();

    document.getElementById('card-name').value = cardName.trim();
    document.getElementById('card-tag').value = card.tag;
    document.getElementById('card-meaning').value = cardMeaning;
    document.getElementById('card-image').value = card.img;

    editingIndex = parseInt(index);
    formTitle.textContent = 'Edit Card';
    cancelBtn.classList.add('active');

    // Scroll to form
    document.querySelector('.card-form-section').scrollIntoView({ behavior: 'smooth' });
  } else if (e.target.classList.contains('btn-delete')) {
    deletingIndex = parseInt(index);
    deleteModal.classList.add('active');
  }
});

// Cancel editing
cancelBtn.addEventListener('click', function () {
  cardForm.reset();
  editingIndex = null;
  formTitle.textContent = 'Add New Card';
  cancelBtn.classList.remove('active');
});

// Delete card confirmation
confirmDelete.addEventListener('click', function () {
  if (deletingIndex !== null) {
    const tarotCards = getTarotCards();
    tarotCards.splice(deletingIndex, 1);
    saveTarotCards(tarotCards);
    displayCards();
    deletingIndex = null;
    deleteModal.classList.remove('active');
  }
});

cancelDelete.addEventListener('click', function () {
  deletingIndex = null;
  deleteModal.classList.remove('active');
});

// Clear all cards
clearAllBtn.addEventListener('click', function () {
  const tarotCards = getTarotCards();
  if (tarotCards.length > 0) {
    clearModal.classList.add('active');
  }
});

confirmClear.addEventListener('click', function () {
  saveTarotCards([]);
  displayCards();
  clearModal.classList.remove('active');
});

cancelClear.addEventListener('click', function () {
  clearModal.classList.remove('active');
});

// Close modals on outside click
deleteModal.addEventListener('click', function (e) {
  if (e.target === deleteModal) {
    deleteModal.classList.remove('active');
  }
});

clearModal.addEventListener('click', function (e) {
  if (e.target === clearModal) {
    clearModal.classList.remove('active');
  }
});

// Logout
logoutBtn.addEventListener('click', function () {
  if (confirm('Are you sure you want to logout?')) {
    window.location.href = 'login.html';
  }
});

// Initial load - ensure cards are initialized first
window.addEventListener('DOMContentLoaded', function () {
  console.log('Admin panel loaded, initializing cards...');
  // Force initialization of cards
  const cards = getTarotCards();
  console.log('Cards initialized:', cards.length);
  displayCards();
});