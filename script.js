import { tarotCards } from './cards.js';

const toneMap = {
    positive: [
        "The Sun", "The Star", "The World", "The Lovers", "The Empress",
        "Strength", "Temperance", "The Magician", "The Chariot"
    ],
    neutral: [
        "The Hermit", "Justice", "The High Priestess", "The Hierophant",
        "The Fool", "Wheel of Fortune"
    ],
    challenging: [
        "The Tower", "Death", "The Hanged Man", "The Moon", "Judgement",
        "The Emperor"
    ]
};

// 🌙 Full-Length Smart Tarot Reading Generator
function getReading(selectedCardIndices) {
    if (!Array.isArray(selectedCardIndices) || selectedCardIndices.length !== 3)
        return "Please select exactly 3 cards.";

    const selected = selectedCardIndices.map(i => tarotCards[i]);
    const tags = selected.map(c => c.tag);
    const names = selected.map(c => c.name.split(":")[0].trim());
    const fullText = selected.map(c => c.name).join(". ");

    // 🎭 Tone detection
    let toneScore = 0;
    selected.forEach(c => {
        const cardName = c.name.split(":")[0].trim();
        if (toneMap.positive.includes(cardName)) toneScore += 1;
        else if (toneMap.challenging.includes(cardName)) toneScore -= 1;
    });

    const tone =
        toneScore > 0 ? "positive" :
        toneScore < 0 ? "challenging" :
        "balanced";

    // ✨ Dynamic tone phrasing (adds variety and personality)
    const toneOpeners = {
        positive: [
            "Your cards radiate optimism and growth.",
            "This reading glows with uplifting energy and momentum.",
            "A bright, empowering current flows through your spread."
        ],
        balanced: [
            "Your cards reflect balance, patience, and quiet awareness.",
            "This reading captures a moment of reflection and understanding.",
            "Harmony and inner wisdom shape your current journey."
        ],
        challenging: [
            "Your cards speak of transformation, release, and awakening.",
            "This reading reveals change, challenge, and powerful rebirth.",
            "Through struggle and reflection, deep truths come to light."
        ]
    };

    const toneClosers = {
        positive: [
            "Trust in your direction and keep your spirit open to new experiences.",
            "The universe supports your growth — embrace the opportunities ahead.",
            "Joy and alignment are within reach; nurture them with gratitude and courage."
        ],
        balanced: [
            "Stay mindful of balance — neither rush nor resist what unfolds.",
            "Your awareness is your strength; trust your intuition to guide each step.",
            "Let patience and compassion shape your next decisions — progress will follow naturally."
        ],
        challenging: [
            "Though change may seem uncertain, transformation brings wisdom and strength.",
            "Every challenge holds a hidden lesson — surrender to the process of renewal.",
            "Endings are merely transitions; from the ashes of difficulty, new purpose arises."
        ]
    };

    const opener =
        toneOpeners[tone][Math.floor(Math.random() * toneOpeners[tone].length)];
    const closer =
        toneClosers[tone][Math.floor(Math.random() * toneClosers[tone].length)];

    // 🪶 Detailed 3-part narrative
    let narrative = "";
    switch (tone) {
        case "positive":
            narrative = `${opener} The cards — ${names.join(", ")} — illuminate a path filled with ${tags[0]}, evolving through ${tags[1]}, and blossoming into ${tags[2]}. You are moving through a season of abundance and self-belief, where effort and enthusiasm will bring tangible rewards. ${closer}`;
            break;
        case "balanced":
            narrative = `${opener} The spread — ${names.join(", ")} — explores the steady rhythm of ${tags[0]}, ${tags[1]}, and ${tags[2]}. It represents a crossroads where reflection meets motion, and awareness meets opportunity. You are being called to move forward calmly, guided by both logic and feeling. ${closer}`;
            break;
        case "challenging":
            narrative = `${opener} The cards — ${names.join(", ")} — trace a story of ${tags[0]} giving way to ${tags[1]}, and ultimately transforming into ${tags[2]}. This cycle encourages acceptance and inner strength as you navigate uncertainty or emotional change. The lessons here are powerful, urging renewal and courage. ${closer}`;
            break;
    }

    // 🌌 Combine with the card meanings for full richness
    const detailedText = `${fullText}. ${narrative}`;

    return detailedText;
}


window.addEventListener('DOMContentLoaded', function () {
    var floatingImages = document.querySelectorAll('.container img.cover1');
    if (floatingImages.length === 1) {
        var img = floatingImages[0];
        img.style.display = 'block';
        img.style.position = 'absolute';
        var w = window.innerWidth * 0.35;
        var h = w;
        img.style.width = w + 'px';
        img.style.height = 'auto';
        img.classList.add('rotate360');
        // Start in center
        var x = window.innerWidth / 2 - w / 2;
        var y = window.innerHeight / 2 - h / 2;
        img.style.left = x + 'px';
        img.style.top = y + 'px';
        // Random direction
        var dx = (Math.random() - 0.5) * 2.5;
        var dy = (Math.random() - 0.5) * 2.5;
        function animate() {
            x += dx;
            y += dy;
            // Bounce off edges
            if (x < 0 || x > window.innerWidth - w) dx *= -1;
            if (y < 0 || y > window.innerHeight - h) dy *= -1;
            img.style.left = x + 'px';
            img.style.top = y + 'px';
            requestAnimationFrame(animate);
        }
        animate();
    }

    // === Tarot cards logic ===
    const cardsContainer = document.querySelector(".cards");

    // Generate 24 cards
    for (let i = 0; i < 24; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.animationDelay = `${i * 0.1}s`; // stagger entrance

        const inner = document.createElement("div");
        inner.classList.add("card-inner");

        const back = document.createElement("div");
        back.classList.add("card-back");

        inner.appendChild(back);
        card.appendChild(inner);
        cardsContainer.appendChild(card);
    }



    // Handle max 3 selections
    let selectedCards = [];
    cardsContainer.addEventListener("click", (e) => {
        const card = e.target.closest(".card");
        if (!card) return;

        if (card.classList.contains("selected")) {
            card.classList.remove("selected");
            selectedCards = selectedCards.filter(c => c !== card);
        } else if (selectedCards.length < 3) {
            card.classList.add("selected");
            selectedCards.push(card);
        }
    });

    // Add Reveal button if not present
    let revealBtn = document.getElementById('reveal-btn');
    if (!revealBtn) {
        revealBtn = document.createElement('button');
        revealBtn.id = 'reveal-btn';
        revealBtn.textContent = 'Reveal';
        revealBtn.style.position = 'absolute';
        revealBtn.style.top = '80%';
        revealBtn.style.left = '50%';
        revealBtn.style.transform = 'translateX(-50%)';
        revealBtn.style.padding = '12px 32px';
        revealBtn.style.fontSize = '1.2rem';
        revealBtn.style.background = '#4F335B';
        revealBtn.style.color = '#fff';
        revealBtn.style.border = '2px solid #edce8c';
        revealBtn.style.borderRadius = '8px';
        revealBtn.style.zIndex = '10';
        document.body.appendChild(revealBtn);
    }

    revealBtn.addEventListener('click', function () {
        if (selectedCards.length !== 3) {
            alert('Please select exactly 3 cards to reveal.');
            return;
        }
        // Add fade-out class to non-selected cards, revealed to selected
        document.querySelectorAll('.card').forEach(card => {
            card.classList.add('fade-out');
        });

        revealBtn.style.display = 'none';
        resetButton.style.display = 'none';

        // Fade out hero text
        var hero = document.querySelector('.hero');
        if (hero) hero.classList.add('fade-hero');
    });

    var resetButton = document.getElementById('reset-btn');
    resetButton.addEventListener('click', function () {
        selectedCards.forEach(card => card.classList.remove('selected'));
        selectedCards = [];
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, i) => {
            card.classList.remove('fade-out');
            card.classList.remove('revealed');

            const parent = card.parentNode;
            const oldCard = parent.removeChild(card);
            void parent.offsetWidth;
            oldCard.style.animationDelay = `${i * 0.1}s`;
            parent.appendChild(oldCard);
        });

        var hero = document.querySelector('.hero');
        if (hero) hero.classList.remove('fade-hero');
    });

    // Create a container for reading cards if not present
    let readingContainer = document.getElementById('reading-container');
    if (!readingContainer) {
        readingContainer = document.createElement('div');
        readingContainer.id = 'reading-container';
        readingContainer.style.position = 'fixed';
        readingContainer.style.top = '50%';
        readingContainer.style.left = '50%';
        readingContainer.style.transform = 'translate(-50%, -50%)';
        readingContainer.style.display = 'flex';
        readingContainer.style.flexDirection = 'column';
        readingContainer.style.justifyContent = 'center';
        readingContainer.style.alignItems = 'center';
        readingContainer.style.gap = '30px';
        readingContainer.style.opacity = '0';
        readingContainer.style.transition = 'opacity 1s ease-in';
        readingContainer.style.zIndex = '100';
        document.body.appendChild(readingContainer);
    }

    // Update reveal button click to show reading cards
    revealBtn.addEventListener('click', function () {
        if (selectedCards.length !== 3) {
            alert('Please select exactly 3 cards to reveal.');
            return;
        }

        // Add fade-out class to non-selected cards
        document.querySelectorAll('.card').forEach(card => {
            card.classList.add('fade-out');
        });

        revealBtn.style.display = 'none';
        resetButton.style.display = 'none';

        // Fade out hero text
        var hero = document.querySelector('.hero');
        if (hero) hero.classList.add('fade-hero');

        // Clear and create new reading cards
        readingContainer.innerHTML = '';

        // Create instruction heading with delay
        const instructionHeading = document.createElement('h1');
        instructionHeading.textContent = "Click on the cards to reveal your future";
        instructionHeading.style.color = '#412058c0';
        instructionHeading.style.textAlign = 'center';
        instructionHeading.style.width = '100%';
        instructionHeading.style.position = 'absolute';
        instructionHeading.style.top = '55%';
        instructionHeading.style.fontFamily = 'Lavishly Yours, serif';
        instructionHeading.style.opacity = '0';
        readingContainer.appendChild(instructionHeading);

        // Add delay before showing the instruction
        setTimeout(() => {
            instructionHeading.style.transition = 'opacity 1s ease-in';
            instructionHeading.style.opacity = '1';
        }, 1000);

        // Create 3 reading cards
        window.revealedIndices = [];
        const cardsWrapper = document.createElement('div');
        cardsWrapper.style.display = 'flex';
        cardsWrapper.style.gap = '30px';
        cardsWrapper.style.justifyContent = 'center';
        cardsWrapper.style.alignItems = 'center';

        for (let i = 0; i < 3; i++) {
            const readingCard = document.createElement('div');
            readingCard.classList.add('reading-card');
            readingCard.style.minWidth = '200px';
            readingCard.style.height = '350px';
            readingCard.style.background = 'url("images/Card cover.png") no-repeat center/cover';
            readingCard.style.border = '3px solid #edce8c';
            readingCard.style.borderRadius = '10px';
            readingCard.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
            readingCard.style.alignItems = 'center';
            readingCard.style.color = '#fff';
            readingCard.style.padding = '15px';
            readingCard.style.transform = 'scale(0)';
            readingCard.style.animation = `revealCard 0.8s ${i * 0.3}s forwards ease-out`;
            readingCard.style.cursor = 'pointer';
            readingCard.style.position = 'relative';
            // readingCard.style.marginTop = ';
            cardsWrapper.appendChild(readingCard);
        }
        readingContainer.appendChild(cardsWrapper);

        // Make reading container visible
        readingContainer.style.opacity = '1';

    }, { once: true });

    // Add necessary animations to head
    const style = document.createElement('style');
    style.textContent = `
        @keyframes revealCard {
            0% { transform: scale(0) rotate(-10deg); opacity: 0; }
            100% { transform: scale(1) rotate(0); opacity: 1; }
        }

        @keyframes smoothFlip {
            0% {
                transform: rotateY(0deg) rotateX(0deg);
                opacity: 1;
            }
            50% {
                transform: rotateY(90deg) rotateX(5deg);
            }
            100% {
                transform: rotateY(0deg) rotateX(0deg);
                opacity: 1;
            }
        }

        @keyframes moveCardsUp {
            0% {
                transform: translateY(0);
            }
            100% {
                transform: translateY(-60px);
            }
        }

        .reading-card {
            transition: all 0.3s ease;
            transform-style: preserve-3d;
            perspective: 1000px;
        }

        .reading-card.flipping {
            animation: smoothFlip 0.8s ease-in-out forwards;
        }

        .card-meaning {
            font-family: 'Lavishly Yours', serif;
            word-wrap: break-word;
        }
    `;
    document.head.appendChild(style);

    // Add click handlers for reading cards
    readingContainer.addEventListener('click', function (e) {
        const clickedCard = e.target.closest('.reading-card');
        if (!clickedCard || clickedCard.classList.contains('flipped')) return;

        // Generate unique random index that hasn't been used yet
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * tarotCards.length);
        } while (window.revealedIndices && window.revealedIndices.includes(randomIndex));

        // Track which indices have been revealed
        if (!window.revealedIndices) window.revealedIndices = [];
        window.revealedIndices.push(randomIndex);

        // Get a random card from the tarot deck
        const tarotCard = tarotCards[randomIndex];
        // Store the revealed index on the card for later retrieval
        clickedCard.setAttribute('data-tarot-idx', randomIndex);

        // Flip animation
        clickedCard.classList.add('flipping');

        setTimeout(() => {
            // Replace background with card image
            clickedCard.style.background = `url("${tarotCard.img}") no-repeat center/cover`;

            // Add meaning text that appears when hovering
            const meaningText = document.createElement('div');
            meaningText.classList.add('card-meaning');
            meaningText.innerHTML = `<p>${tarotCard.name}</p>`;
            meaningText.style.position = 'absolute';
            meaningText.style.top = '0';
            meaningText.style.left = '0';
            meaningText.style.width = '100%';
            meaningText.style.height = '100%';
            meaningText.style.background = 'rgba(0,0,0,0.85)';
            meaningText.style.color = '#fff';
            meaningText.style.padding = '20px';
            meaningText.style.boxSizing = 'border-box';
            meaningText.style.opacity = '0';
            meaningText.style.transition = 'opacity 0.3s ease';
            meaningText.style.display = 'flex';
            meaningText.style.alignItems = 'center';
            meaningText.style.justifyContent = 'center';
            meaningText.style.fontSize = '0.9rem';
            meaningText.style.lineHeight = '1.4';
            meaningText.style.textAlign = 'center';
            meaningText.style.borderRadius = '7px';
            meaningText.style.margin = '0';

            clickedCard.innerHTML = '';
            clickedCard.appendChild(meaningText);

            // Add hover effect for meaning
            clickedCard.addEventListener('mouseenter', () => {
                meaningText.style.opacity = '1';
            });

            clickedCard.addEventListener('mouseleave', () => {
                meaningText.style.opacity = '0';
            });

            clickedCard.classList.remove('flipping');
            clickedCard.classList.add('flipped');

            // Show reset button when all 3 cards are flipped
            if (document.querySelectorAll('.reading-card.flipped').length === 3) {
                setTimeout(() => {
                    // Remove any existing Get Reading button
                    const oldBtn = document.getElementById('get-reading-btn');
                    if (oldBtn) oldBtn.remove();
                    // Create a "Get Reading" button
                    const getReadingBtn = document.createElement('button');
                    getReadingBtn.classList.add('btn');
                    getReadingBtn.id = 'get-reading-btn';
                    getReadingBtn.textContent = 'Get Reading';
                    getReadingBtn.style.position = 'fixed';
                    getReadingBtn.style.bottom = '80px';
                    getReadingBtn.style.left = '50%';
                    getReadingBtn.style.transform = 'translateX(-50%)';
                    getReadingBtn.style.padding = '12px 32px';
                    getReadingBtn.style.fontSize = '1.2rem';
                    getReadingBtn.style.background = '#4F335B';
                    getReadingBtn.style.color = '#fff';
                    getReadingBtn.style.border = '2px solid #edce8c';
                    getReadingBtn.style.borderRadius = '8px';
                    getReadingBtn.style.zIndex = '10';
                    getReadingBtn.style.transition = 'all 0.3s ease';
                    getReadingBtn.style.cursor = 'pointer';
                    document.body.appendChild(getReadingBtn);

                    // Hover effects
                    getReadingBtn.addEventListener('mouseenter', function () {
                        this.style.background = '#664275';
                        this.style.transform = 'translateX(-50%) scale(1.05)';
                        this.style.boxShadow = '0 0 15px rgba(237, 206, 140, 0.6)';
                    });

                    getReadingBtn.addEventListener('mouseleave', function () {
                        this.style.background = '#4F335B';
                        this.style.transform = 'translateX(-50%) scale(1)';
                        this.style.boxShadow = 'none';
                    });

                    // Active state for clicking
                    getReadingBtn.addEventListener('mousedown', function () {
                        this.style.transform = 'translateX(-50%) scale(0.98)';
                    });

                    getReadingBtn.addEventListener('mouseup', function () {
                        this.style.transform = 'translateX(-50%) scale(1.05)';
                    });

                    // Add click event for the Get Reading button
                    getReadingBtn.addEventListener('click', function () {
                        // Get indices of the 3 flipped cards in the order they appear
                        const flippedCards = Array.from(document.querySelectorAll('.reading-card.flipped'));
                        const selectedIndices = flippedCards.map(card => {
                            const idx = card.getAttribute('data-tarot-idx');
                            return idx !== null ? parseInt(idx, 10) : undefined;
                        });
                        if (selectedIndices.length !== 3 || selectedIndices.some(idx => typeof idx !== 'number' || isNaN(idx))) {
                            alert('Please flip all 3 cards first.');
                            return;
                        }

                        // Animate cards up
                        flippedCards.forEach(card => card.classList.add('move-up'));

                        const reading = getReading(selectedIndices);

                        // Create reading summary after cards move up
                        setTimeout(() => {
                            // Remove any previous reading summary
                            let readingSummaryDiv = document.getElementById('reading-summary');
                            if (readingSummaryDiv) readingSummaryDiv.remove();

                            readingSummaryDiv = document.createElement('div');
                            readingSummaryDiv.id = 'reading-summary';
                            readingSummaryDiv.style.position = 'fixed';
                            readingSummaryDiv.style.top = '55%';
                            readingSummaryDiv.style.left = '50%';
                            readingSummaryDiv.style.transform = 'translateX(-50%)';
                            readingSummaryDiv.style.background = '#ffeec8b2';
                            readingSummaryDiv.style.color = '#412058';
                            readingSummaryDiv.style.border = '2px solid #edce8c';
                            readingSummaryDiv.style.borderRadius = '10px';
                            readingSummaryDiv.style.padding = '50px 30px';
                            readingSummaryDiv.style.fontSize = '1rem';
                            readingSummaryDiv.style.fontFamily = 'serif';
                            readingSummaryDiv.style.zIndex = '20';
                            readingSummaryDiv.style.maxWidth = '600px';
                            readingSummaryDiv.style.opacity = '0';
                            readingSummaryDiv.style.transition = 'opacity 0.8s ease-in';
                            readingSummaryDiv.style.lineHeight = '1.6';
                            document.body.appendChild(readingSummaryDiv);

                            readingSummaryDiv.innerHTML = `<h2 style='margin-top:0; margin-bottom:15px; text-align:center; font-family:Lavishly Yours,serif; font-size:1.8rem;'>Your Tarot Reading</h2><p style='margin-bottom:0; text-align:center;'>${reading}</p>`;

                            // Fade in the reading summary
                            setTimeout(() => {
                                readingSummaryDiv.style.opacity = '1';
                            }, 50);
                        }, 600);

                        this.disabled = true;
                        this.style.opacity = '0';
                    });

                    // Remove instruction text
                    const instructionHeading = readingContainer.querySelector('h1');
                    if (instructionHeading) instructionHeading.style.opacity = '0';
                }, 1000);
            }
        }, 400);
    });
});