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

// Custom popup notification system
function showPopup(message, type = 'info') {
    const existingPopup = document.querySelector('.custom-popup');
    if (existingPopup) existingPopup.remove();

    const popup = document.createElement('div');
    popup.classList.add('custom-popup');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.background = 'rgba(79, 51, 91, 0.98)';
    popup.style.border = '2px solid #edce8c';
    popup.style.borderRadius = '15px';
    popup.style.padding = '30px 40px';
    popup.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.5)';
    popup.style.zIndex = '10000';
    popup.style.minWidth = '300px';
    popup.style.maxWidth = '500px';
    popup.style.textAlign = 'center';
    popup.style.opacity = '0';
    popup.style.transition = 'opacity 0.3s ease';

    const messageEl = document.createElement('p');
    messageEl.textContent = message;
    messageEl.style.color = '#fff';
    messageEl.style.fontSize = '1.1rem';
    messageEl.style.fontFamily = 'Cinzel Decorative, serif';
    messageEl.style.marginBottom = '20px';
    messageEl.style.lineHeight = '1.5';

    const button = document.createElement('button');
    button.textContent = 'OK';
    button.style.padding = '10px 30px';
    button.style.background = '#edce8c';
    button.style.color = '#4F335B';
    button.style.border = 'none';
    button.style.borderRadius = '8px';
    button.style.fontSize = '1rem';
    button.style.fontFamily = 'Cinzel Decorative, serif';
    button.style.cursor = 'pointer';
    button.style.fontWeight = 'bold';
    button.style.transition = 'all 0.3s ease';

    button.addEventListener('mouseenter', () => {
        button.style.background = '#f4d99e';
        button.style.transform = 'scale(1.05)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.background = '#edce8c';
        button.style.transform = 'scale(1)';
    });

    button.addEventListener('click', () => {
        popup.style.opacity = '0';
        setTimeout(() => popup.remove(), 300);
    });

    popup.appendChild(messageEl);
    popup.appendChild(button);
    document.body.appendChild(popup);

    setTimeout(() => popup.style.opacity = '1', 10);
}

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

    // ✨ Dynamic tone phrasing
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

    const opener = toneOpeners[tone][Math.floor(Math.random() * toneOpeners[tone].length)];
    const closer = toneClosers[tone][Math.floor(Math.random() * toneClosers[tone].length)];

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
        var x = window.innerWidth / 2 - w / 2;
        var y = window.innerHeight / 2 - h / 2;
        img.style.left = x + 'px';
        img.style.top = y + 'px';
        var dx = (Math.random() - 0.5) * 2.5;
        var dy = (Math.random() - 0.5) * 2.5;
        function animate() {
            x += dx;
            y += dy;
            if (x < 0 || x > window.innerWidth - w) dx *= -1;
            if (y < 0 || y > window.innerHeight - h) dy *= -1;
            img.style.left = x + 'px';
            img.style.top = y + 'px';
            requestAnimationFrame(animate);
        }
        animate();
    }

    const cardsContainer = document.querySelector(".cards");
    let selectedCards = [];
    let revealBtnClicked = false;

    // Generate 24 cards
    for (let i = 0; i < 24; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.animationDelay = `${i * 0.1}s`;

        const inner = document.createElement("div");
        inner.classList.add("card-inner");

        const back = document.createElement("div");
        back.classList.add("card-back");

        inner.appendChild(back);
        card.appendChild(inner);
        cardsContainer.appendChild(card);
    }

    // Handle card selection
    cardsContainer.addEventListener("click", (e) => {
        if (revealBtnClicked) return;
        
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

    let revealBtn = document.getElementById('reveal-btn');
    let resetButton = document.getElementById('reset-btn');

    // Reveal button logic
    revealBtn.addEventListener('click', function () {
        if (selectedCards.length !== 3) {
            showPopup('Please select exactly 3 cards to reveal.');
            return;
        }

        revealBtnClicked = true;
        document.querySelectorAll('.card').forEach(card => {
            card.classList.add('fade-out');
        });

        revealBtn.style.display = 'none';
        resetButton.style.display = 'none';

        var hero = document.querySelector('.hero');
        if (hero) hero.classList.add('fade-hero');

        let readingContainer = document.getElementById('reading-container');
        readingContainer.innerHTML = '';

        const instructionHeading = document.createElement('h1');
        instructionHeading.textContent = "Click on the cards to reveal your future";
        instructionHeading.style.color = '#412058c0';
        instructionHeading.style.textAlign = 'center';
        instructionHeading.style.width = '100%';
        instructionHeading.style.position = 'absolute';
        instructionHeading.style.top = '55%';
        instructionHeading.style.fontFamily = 'Lavishly Yours, serif';
        instructionHeading.style.fontSize = 'clamp(1.5rem, 4vw, 3rem)';
        instructionHeading.style.opacity = '0';
        instructionHeading.style.padding = '0 20px';
        readingContainer.appendChild(instructionHeading);

        setTimeout(() => {
            instructionHeading.style.transition = 'opacity 1s ease-in';
            instructionHeading.style.opacity = '1';
        }, 1000);

        window.revealedIndices = [];
        const cardsWrapper = document.createElement('div');
        cardsWrapper.style.display = 'flex';
        cardsWrapper.style.gap = 'clamp(15px, 3vw, 30px)';
        cardsWrapper.style.justifyContent = 'center';
        cardsWrapper.style.alignItems = 'center';
        cardsWrapper.style.flexWrap = 'wrap';
        cardsWrapper.style.padding = '0 20px';

        for (let i = 0; i < 3; i++) {
            const readingCard = document.createElement('div');
            readingCard.classList.add('reading-card');
            readingCard.style.minWidth = 'clamp(150px, 25vw, 200px)';
            readingCard.style.height = 'clamp(250px, 40vw, 350px)';
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
            cardsWrapper.appendChild(readingCard);
        }
        readingContainer.appendChild(cardsWrapper);
        readingContainer.style.opacity = '1';
    });

    // Reset button logic
    resetButton.addEventListener('click', function () {
        revealBtnClicked = false;
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

        let readingContainer = document.getElementById('reading-container');
        if (readingContainer) {
            readingContainer.style.opacity = '0';
            setTimeout(() => readingContainer.innerHTML = '', 300);
        }
    });

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes revealCard {
            0% { transform: scale(0) rotate(-10deg); opacity: 0; }
            100% { transform: scale(1) rotate(0); opacity: 1; }
        }

        @keyframes smoothFlip {
            0% { transform: rotateY(0deg) rotateX(0deg); opacity: 1; }
            50% { transform: rotateY(90deg) rotateX(5deg); }
            100% { transform: rotateY(0deg) rotateX(0deg); opacity: 1; }
        }

        @keyframes moveCardsUp {
            0% { transform: translateY(0); }
            100% { transform: translateY(-60px); }
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

        .move-up {
            animation: moveCardsUp 0.6s forwards;
        }

        @media (max-width: 768px) {
            #reading-container h1 {
                font-size: 1.5rem !important;
            }
        }
    `;
    document.head.appendChild(style);

    // Reading card click handler
    let readingContainer = document.getElementById('reading-container');
    readingContainer.addEventListener('click', function (e) {
        const clickedCard = e.target.closest('.reading-card');
        if (!clickedCard || clickedCard.classList.contains('flipped')) return;

        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * tarotCards.length);
        } while (window.revealedIndices && window.revealedIndices.includes(randomIndex));

        if (!window.revealedIndices) window.revealedIndices = [];
        window.revealedIndices.push(randomIndex);

        const tarotCard = tarotCards[randomIndex];
        clickedCard.setAttribute('data-tarot-idx', randomIndex);

        clickedCard.classList.add('flipping');

        setTimeout(() => {
            clickedCard.style.background = `url("${tarotCard.img}") no-repeat center/cover`;

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
            meaningText.style.padding = 'clamp(10px, 3vw, 20px)';
            meaningText.style.boxSizing = 'border-box';
            meaningText.style.opacity = '0';
            meaningText.style.transition = 'opacity 0.3s ease';
            meaningText.style.display = 'flex';
            meaningText.style.alignItems = 'center';
            meaningText.style.justifyContent = 'center';
            meaningText.style.fontSize = 'clamp(0.75rem, 2vw, 0.9rem)';
            meaningText.style.lineHeight = '1.4';
            meaningText.style.textAlign = 'center';
            meaningText.style.borderRadius = '7px';
            meaningText.style.margin = '0';

            clickedCard.innerHTML = '';
            clickedCard.appendChild(meaningText);

            clickedCard.addEventListener('mouseenter', () => meaningText.style.opacity = '1');
            clickedCard.addEventListener('mouseleave', () => meaningText.style.opacity = '0');

            clickedCard.classList.remove('flipping');
            clickedCard.classList.add('flipped');

            if (document.querySelectorAll('.reading-card.flipped').length === 3) {
                setTimeout(() => {
                    const oldBtn = document.getElementById('get-reading-btn');
                    if (oldBtn) oldBtn.remove();
                    
                    const getReadingBtn = document.createElement('button');
                    getReadingBtn.classList.add('btn');
                    getReadingBtn.id = 'get-reading-btn';
                    getReadingBtn.textContent = 'Get Reading';
                    getReadingBtn.style.position = 'fixed';
                    getReadingBtn.style.bottom = 'clamp(60px, 10vh, 80px)';
                    getReadingBtn.style.left = '50%';
                    getReadingBtn.style.transform = 'translateX(-50%)';
                    getReadingBtn.style.padding = 'clamp(10px, 2vw, 12px) clamp(24px, 4vw, 32px)';
                    getReadingBtn.style.fontSize = 'clamp(1rem, 2vw, 1.2rem)';
                    getReadingBtn.style.background = '#4F335B';
                    getReadingBtn.style.color = '#fff';
                    getReadingBtn.style.border = '2px solid #edce8c';
                    getReadingBtn.style.borderRadius = '8px';
                    getReadingBtn.style.zIndex = '10';
                    getReadingBtn.style.transition = 'all 0.3s ease';
                    getReadingBtn.style.cursor = 'pointer';
                    getReadingBtn.style.fontFamily = 'Cinzel Decorative, serif';
                    document.body.appendChild(getReadingBtn);

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

                    getReadingBtn.addEventListener('click', function () {
                        const flippedCards = Array.from(document.querySelectorAll('.reading-card.flipped'));
                        const selectedIndices = flippedCards.map(card => {
                            const idx = card.getAttribute('data-tarot-idx');
                            return idx !== null ? parseInt(idx, 10) : undefined;
                        });
                        
                        if (selectedIndices.length !== 3 || selectedIndices.some(idx => typeof idx !== 'number' || isNaN(idx))) {
                            showPopup('Please flip all 3 cards first.');
                            return;
                        }

                        flippedCards.forEach(card => card.classList.add('move-up'));
                        const reading = getReading(selectedIndices);

                        setTimeout(() => {
                            let readingSummaryDiv = document.getElementById('reading-summary');
                            if (readingSummaryDiv) readingSummaryDiv.remove();

                            readingSummaryDiv = document.createElement('div');
                            readingSummaryDiv.id = 'reading-summary';
                            readingSummaryDiv.style.position = 'fixed';
                            readingSummaryDiv.style.top = '55%';
                            readingSummaryDiv.style.left = '50%';
                            readingSummaryDiv.style.transform = 'translate(-50%, -50%)';
                            readingSummaryDiv.style.background = 'rgba(255, 238, 200, 0.95)';
                            readingSummaryDiv.style.color = '#412058';
                            readingSummaryDiv.style.border = '2px solid #edce8c';
                            readingSummaryDiv.style.borderRadius = '15px';
                            readingSummaryDiv.style.padding = 'clamp(20px, 4vw, 40px)';
                            readingSummaryDiv.style.fontSize = 'clamp(0.85rem, 2vw, 1rem)';
                            readingSummaryDiv.style.fontFamily = 'serif';
                            readingSummaryDiv.style.zIndex = '20';
                            readingSummaryDiv.style.width = '90%';
                            readingSummaryDiv.style.maxWidth = '650px';
                            readingSummaryDiv.style.opacity = '0';
                            readingSummaryDiv.style.transition = 'opacity 0.8s ease-in';
                            readingSummaryDiv.style.lineHeight = '1.6';
                            readingSummaryDiv.style.maxHeight = '60vh';
                            readingSummaryDiv.style.overflowY = 'auto';
                            readingSummaryDiv.style.scrollBehavior = 'smooth';
                            readingSummaryDiv.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';

                            const heading = document.createElement('h2');
                            heading.textContent = 'Your Tarot Reading';
                            heading.style.marginTop = '0';
                            heading.style.marginBottom = 'clamp(15px, 3vw, 20px)';
                            heading.style.textAlign = 'center';
                            heading.style.fontFamily = 'Lavishly Yours, serif';
                            heading.style.fontSize = 'clamp(1.5rem, 4vw, 2rem)';
                            heading.style.color = '#4F335B';

                            const readingText = document.createElement('p');
                            readingText.textContent = reading;
                            readingText.style.marginBottom = 'clamp(15px, 3vw, 25px)';
                            readingText.style.textAlign = 'justify';

                            const retryBtn = document.createElement('button');
                            retryBtn.textContent = 'Try Again';
                            retryBtn.style.display = 'block';
                            retryBtn.style.margin = '0 auto';
                            retryBtn.style.padding = 'clamp(8px, 2vw, 12px) clamp(20px, 4vw, 32px)';
                            retryBtn.style.background = '#4F335B';
                            retryBtn.style.color = '#fff';
                            retryBtn.style.border = '2px solid #edce8c';
                            retryBtn.style.borderRadius = '8px';
                            retryBtn.style.fontSize = 'clamp(0.9rem, 2vw, 1.1rem)';
                            retryBtn.style.fontFamily = 'Cinzel Decorative, serif';
                            retryBtn.style.cursor = 'pointer';
                            retryBtn.style.transition = 'all 0.3s ease';
                            retryBtn.style.fontWeight = 'bold';

                            retryBtn.addEventListener('mouseenter', () => {
                                retryBtn.style.background = '#664275';
                                retryBtn.style.transform = 'scale(1.05)';
                            });

                            retryBtn.addEventListener('mouseleave', () => {
                                retryBtn.style.background = '#4F335B';
                                retryBtn.style.transform = 'scale(1)';
                            });

                            retryBtn.addEventListener('click', () => {
                                window.location.reload();
                            });

                            readingSummaryDiv.appendChild(heading);
                            readingSummaryDiv.appendChild(readingText);
                            readingSummaryDiv.appendChild(retryBtn);
                            document.body.appendChild(readingSummaryDiv);

                            setTimeout(() => readingSummaryDiv.style.opacity = '1', 50);
                        }, 600);

                        this.disabled = true;
                        this.style.opacity = '0';
                    });

                    const instructionHeading = readingContainer.querySelector('h1');
                    if (instructionHeading) instructionHeading.style.opacity = '0';
                }, 1000);
            }
        }, 400);
    });
});