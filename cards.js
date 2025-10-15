// Tarot Cards Data Storage with localStorage sync

// Default tarot cards
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

// Initialize localStorage with default cards if not already present
function initializeCards() {
    const storedCards = localStorage.getItem('tarotCards');
    if (!storedCards || storedCards === 'null' || storedCards === '[]') {
        console.log('Initializing localStorage with default tarot cards');
        localStorage.setItem('tarotCards', JSON.stringify(defaultTarotCards));
        return [...defaultTarotCards];
    }
    try {
        const parsed = JSON.parse(storedCards);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...defaultTarotCards];
    } catch (e) {
        console.error('Error parsing tarot cards, using defaults:', e);
        localStorage.setItem('tarotCards', JSON.stringify(defaultTarotCards));
        return [...defaultTarotCards];
    }
}

// Load cards from localStorage
function loadCardsFromStorage() {
    const storedCards = localStorage.getItem('tarotCards');
    if (!storedCards || storedCards === 'null') {
        console.log('No cards in localStorage, initializing with defaults');
        localStorage.setItem('tarotCards', JSON.stringify(defaultTarotCards));
        return [...defaultTarotCards];
    }
    try {
        const parsed = JSON.parse(storedCards);
        if (!Array.isArray(parsed) || parsed.length === 0) {
            console.log('Invalid cards in localStorage, using defaults');
            localStorage.setItem('tarotCards', JSON.stringify(defaultTarotCards));
            return [...defaultTarotCards];
        }
        return parsed;
    } catch (e) {
        console.error('Error loading cards from localStorage:', e);
        return [...defaultTarotCards];
    }
}

// Save cards to localStorage
function saveCardsToStorage(cards) {
    localStorage.setItem('tarotCards', JSON.stringify(cards));
    console.log('Saved', cards.length, 'cards to localStorage');
}

// Initialize immediately and export
const initializedCards = initializeCards();
export let tarotCards = initializedCards;

// CRUD Operations
export function addCard(cardData) {
    tarotCards.push(cardData);
    saveCardsToStorage(tarotCards);
}

export function updateCard(index, cardData) {
    if (index >= 0 && index < tarotCards.length) {
        tarotCards[index] = cardData;
        saveCardsToStorage(tarotCards);
    }
}

export function deleteCard(index) {
    if (index >= 0 && index < tarotCards.length) {
        tarotCards.splice(index, 1);
        saveCardsToStorage(tarotCards);
    }
}

export function clearAllCards() {
    tarotCards.length = 0;
    saveCardsToStorage(tarotCards);
}

export function getCard(index) {
    return tarotCards[index];
}

export function getAllCards() {
    return loadCardsFromStorage();
}

export function refreshCards() {
    const cards = loadCardsFromStorage();
    tarotCards.length = 0;
    tarotCards.push(...cards);
    return tarotCards;
}

export function resetToDefault() {
    tarotCards.length = 0;
    tarotCards.push(...defaultTarotCards);
    saveCardsToStorage(tarotCards);
}

// Initialize on load
initializeCards();