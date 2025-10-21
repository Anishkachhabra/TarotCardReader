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

        // Make reading container scrollable
        readingContainer.style.position = 'absolute';
        readingContainer.style.top = '0';
        readingContainer.style.left = '0';
        readingContainer.style.width = '100%';
        readingContainer.style.minHeight = '100vh';
        readingContainer.style.height = 'auto';
        readingContainer.style.overflowY = 'auto';
        readingContainer.style.overflowX = 'hidden';
        readingContainer.style.paddingBottom = '60px';
        readingContainer.style.paddingTop = '20px';

        const instructionHeading = document.createElement('h1');
        instructionHeading.textContent = "Click on the cards to reveal your future";
        instructionHeading.style.color = '#412058c0';
        instructionHeading.style.textAlign = 'center';
        instructionHeading.style.width = '100%';
        instructionHeading.style.marginTop = 'clamp(20px, 5vh, 40px)';
        instructionHeading.style.fontFamily = 'Lavishly Yours, serif';
        instructionHeading.style.fontSize = 'clamp(1.2rem, 3vw, 2.2rem)';
        instructionHeading.style.opacity = '0';
        instructionHeading.style.padding = '0 20px';
        instructionHeading.style.lineHeight = '1.3';
        instructionHeading.style.marginBottom = 'clamp(20px, 4vh, 40px)';
        readingContainer.appendChild(instructionHeading);

        setTimeout(() => {
            instructionHeading.style.transition = 'opacity 1s ease-in';
            instructionHeading.style.opacity = '1';
        }, 1000);

        window.revealedIndices = [];
        const cardsWrapper = document.createElement('div');
        cardsWrapper.classList.add('cards-wrapper-reveal');
        cardsWrapper.style.display = 'flex';
        cardsWrapper.style.gap = 'clamp(15px, 3vw, 30px)';
        cardsWrapper.style.justifyContent = 'center';
        cardsWrapper.style.alignItems = 'center';
        cardsWrapper.style.flexWrap = 'wrap';
        cardsWrapper.style.padding = '0 20px';
        cardsWrapper.style.width = '100%';
        cardsWrapper.style.maxWidth = '1200px';
        cardsWrapper.style.margin = '0 auto';
        cardsWrapper.style.marginBottom = 'clamp(40px, 10vh, 80px)';
        cardsWrapper.style.minHeight = 'clamp(250px, 40vw, 350px)';

        for (let i = 0; i < 3; i++) {
            const readingCard = document.createElement('div');
            readingCard.classList.add('reading-card');
            readingCard.style.minWidth = 'clamp(130px, 22vw, 190px)';
            readingCard.style.height = 'clamp(220px, 35vw, 320px)';
            readingCard.style.background = 'url("images/Card cover.png") no-repeat center/cover';
            readingCard.style.border = '3px solid #edce8c';
            readingCard.style.borderRadius = '10px';
            readingCard.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
            readingCard.style.color = '#fff';
            readingCard.style.padding = '15px';
            readingCard.style.transform = 'scale(0)';
            readingCard.style.animation = `revealCard 0.8s ${i * 0.3}s forwards ease-out`;
            readingCard.style.cursor = 'pointer';
            readingCard.style.position = 'relative';
            readingCard.style.transition = 'all 0.3s ease';
            cardsWrapper.appendChild(readingCard);
        }
        readingContainer.appendChild(cardsWrapper);
        readingContainer.style.opacity = '1';

        // Setup card click handler
        setupCardClickHandler(readingContainer);
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
            setTimeout(() => {
                readingContainer.innerHTML = '';
                // Reset container styles
                readingContainer.style.position = '';
                readingContainer.style.top = '';
                readingContainer.style.left = '';
                readingContainer.style.width = '';
                readingContainer.style.minHeight = '';
                readingContainer.style.overflowY = '';
                readingContainer.style.paddingBottom = '';
            }, 300);
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

        /* Mobile and Tablet Responsive */
        @media (max-width: 768px) {
            #reading-container h1 {
                font-size: clamp(1.1rem, 3vw, 1.5rem) !important;
                margin-top: clamp(30px, 6vh, 50px) !important;
                margin-bottom: clamp(20px, 4vh, 30px) !important;
            }
            
            .reading-card {
                min-width: clamp(120px, 28vw, 160px) !important;
                height: clamp(200px, 44vw, 270px) !important;
            }

            .cards-wrapper-reveal {
                margin-bottom: clamp(20px, 4vh, 40px) !important;
            }
        }

        @media (max-width: 480px) {
            #reading-container h1 {
                font-size: clamp(1rem, 3.5vw, 1.3rem) !important;
                margin-top: clamp(20px, 5vh, 40px) !important;
                margin-bottom: clamp(15px, 3vh, 25px) !important;
                line-height: 1.2 !important;
            }
            
            .reading-card {
                min-width: clamp(110px, 30vw, 140px) !important;
                height: clamp(185px, 48vw, 240px) !important;
            }

            .cards-wrapper-reveal {
                gap: clamp(12px, 2.5vw, 20px) !important;
                margin-bottom: clamp(15px, 3vh, 30px) !important;
            }
        }

        @media (max-height: 600px) and (orientation: landscape) {
            #reading-container h1 {
                font-size: clamp(1rem, 2.5vh, 1.3rem) !important;
                margin-top: 20px !important;
                margin-bottom: 20px !important;
            }
            
            .reading-card {
                min-width: 120px !important;
                height: 200px !important;
            }

            .cards-wrapper-reveal {
                margin-bottom: 20px !important;
            }
        }

        /* Ensure smooth scrolling */
        #reading-container {
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
            max-height: 100vh;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
        }

        #reading-container::-webkit-scrollbar {
            width: 10px;
        }

        #reading-container::-webkit-scrollbar-track {
            background: rgba(79, 51, 91, 0.3);
            border-radius: 10px;
        }

        #reading-container::-webkit-scrollbar-thumb {
            background: #edce8c;
            border-radius: 10px;
            border: 2px solid rgba(79, 51, 91, 0.3);
        }

        #reading-container::-webkit-scrollbar-thumb:hover {
            background: #f4d99e;
        }

        /* Firefox scrollbar */
        #reading-container {
            scrollbar-width: thin;
            scrollbar-color: #edce8c rgba(79, 51, 91, 0.3);
        }
    `;
    document.head.appendChild(style);

    // Function to setup card click handler
    function setupCardClickHandler(readingContainer) {
        const cardsInContainer = readingContainer.querySelectorAll('.reading-card');

        cardsInContainer.forEach(clickedCard => {
            clickedCard.addEventListener('click', function () {
                if (clickedCard.classList.contains('flipped')) return;

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
                    meaningText.style.fontSize = 'clamp(0.7rem, 1.8vw, 0.9rem)';
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

                    if (readingContainer.querySelectorAll('.reading-card.flipped').length === 3) {
                        setTimeout(() => {
                            const oldBtn = document.getElementById('get-reading-btn');
                            if (oldBtn) oldBtn.remove();

                            const getReadingBtn = document.createElement('button');
                            getReadingBtn.classList.add('btn');
                            getReadingBtn.id = 'get-reading-btn';
                            getReadingBtn.textContent = 'Get Reading';
                            getReadingBtn.style.display = 'block';
                            getReadingBtn.style.margin = '0 auto';
                            getReadingBtn.style.marginTop = 'clamp(20px, 4vh, 40px)';
                            getReadingBtn.style.marginBottom = 'clamp(50px, 8vh, 80px)';
                            getReadingBtn.style.padding = 'clamp(10px, 2vh, 14px) clamp(24px, 4vw, 36px)';
                            getReadingBtn.style.fontSize = 'clamp(0.95rem, 2vw, 1.2rem)';
                            getReadingBtn.style.background = '#4F335B';
                            getReadingBtn.style.color = '#fff';
                            getReadingBtn.style.border = '2px solid #edce8c';
                            getReadingBtn.style.borderRadius = '8px';
                            getReadingBtn.style.transition = 'all 0.3s ease';
                            getReadingBtn.style.cursor = 'pointer';
                            getReadingBtn.style.fontFamily = 'Cinzel Decorative, serif';
                            getReadingBtn.style.whiteSpace = 'nowrap';
                            getReadingBtn.style.fontWeight = '600';

                            readingContainer.appendChild(getReadingBtn);

                            getReadingBtn.addEventListener('mouseenter', function () {
                                this.style.background = '#664275';
                                this.style.transform = 'scale(1.05)';
                                this.style.boxShadow = '0 0 15px rgba(237, 206, 140, 0.6)';
                            });

                            getReadingBtn.addEventListener('mouseleave', function () {
                                this.style.background = '#4F335B';
                                this.style.transform = 'scale(1)';
                                this.style.boxShadow = 'none';
                            });

                            getReadingBtn.addEventListener('click', function () {
                                const flippedCards = Array.from(readingContainer.querySelectorAll('.reading-card.flipped'));
                                const selectedIndices = flippedCards.map(card => {
                                    const idx = card.getAttribute('data-tarot-idx');
                                    return idx !== null ? parseInt(idx, 10) : undefined;
                                });

                                if (selectedIndices.length !== 3 || selectedIndices.some(idx => typeof idx !== 'number' || isNaN(idx))) {
                                    showPopup('Please flip all 3 cards first.');
                                    return;
                                }

                                const reading = getReading(selectedIndices);

                                // Remove the button
                                this.style.opacity = '0';
                                setTimeout(() => this.remove(), 300);

                                setTimeout(() => {
                                    let readingSummaryDiv = document.getElementById('reading-summary');
                                    if (readingSummaryDiv) readingSummaryDiv.remove();

                                    readingSummaryDiv = document.createElement('div');
                                    readingSummaryDiv.id = 'reading-summary';
                                    readingSummaryDiv.style.background = 'rgba(255, 238, 200, 0.95)';
                                    readingSummaryDiv.style.color = '#412058';
                                    readingSummaryDiv.style.border = '2px solid #edce8c';
                                    readingSummaryDiv.style.borderRadius = '15px';
                                    readingSummaryDiv.style.padding = 'clamp(20px, 4vw, 35px)';
                                    readingSummaryDiv.style.fontSize = 'clamp(0.85rem, 1.8vw, 1rem)';
                                    readingSummaryDiv.style.fontFamily = 'serif';
                                    readingSummaryDiv.style.width = '90%';
                                    readingSummaryDiv.style.maxWidth = '700px';
                                    readingSummaryDiv.style.opacity = '0';
                                    readingSummaryDiv.animate([
                                        { opacity: 0, transform: 'translateY(20px)' },
                                        { opacity: 1, transform: 'translateY(0)' }
                                    ], {
                                        duration: 800,
                                        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                                        fill: 'forwards'
                                    });

                                    readingSummaryDiv.style.transition = 'opacity 0.8s ease-in';
                                    readingSummaryDiv.style.lineHeight = '1.6';
                                    readingSummaryDiv.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
                                    readingSummaryDiv.style.margin = '0 auto';
                                    readingSummaryDiv.style.marginBottom = 'clamp(50px, 8vh, 80px)';
                                    readingSummaryDiv.style.marginTop = 'clamp(30px, 5vh, 50px)';

                                    const heading = document.createElement('h2');
                                    heading.textContent = 'Your Tarot Reading';
                                    heading.style.marginTop = '0';
                                    heading.style.marginBottom = 'clamp(15px, 3vh, 25px)';
                                    heading.style.textAlign = 'center';
                                    heading.style.fontFamily = 'Lavishly Yours, serif';
                                    heading.style.fontSize = 'clamp(1.4rem, 3.5vw, 2rem)';
                                    heading.style.color = '#4F335B';
                                    heading.style.lineHeight = '1.2';

                                    const readingText = document.createElement('p');
                                    readingText.textContent = reading;
                                    readingText.style.marginBottom = 'clamp(20px, 3vh, 30px)';
                                    readingText.style.textAlign = 'justify';
                                    readingText.style.fontSize = 'clamp(0.85rem, 1.8vw, 1rem)';
                                    readingText.style.lineHeight = '1.6';

                                    const retryBtn = document.createElement('button');
                                    retryBtn.textContent = 'Try Again';
                                    retryBtn.style.display = 'block';
                                    retryBtn.style.margin = '0 auto';
                                    retryBtn.style.padding = 'clamp(10px, 2vh, 14px) clamp(24px, 4vw, 36px)';
                                    retryBtn.style.background = '#4F335B';
                                    retryBtn.style.color = '#fff';
                                    retryBtn.style.border = '2px solid #edce8c';
                                    retryBtn.style.borderRadius = '8px';
                                    retryBtn.style.fontSize = 'clamp(0.9rem, 1.8vw, 1.1rem)';
                                    retryBtn.style.fontFamily = 'Cinzel Decorative, serif';
                                    retryBtn.style.cursor = 'pointer';
                                    retryBtn.style.transition = 'all 0.3s ease';
                                    retryBtn.style.fontWeight = '600';
                                    retryBtn.style.whiteSpace = 'nowrap';

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
                                    readingContainer.appendChild(readingSummaryDiv);

                                    // Show reading summary and scroll to show it while keeping cards visible
                                    setTimeout(() => {
                                        readingSummaryDiv.style.opacity = '1';
                                        // Scroll to show the reading summary at the bottom
                                        readingSummaryDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
                                    }, 50);
                                }, 300);
                            });

                            const instructionHeading = readingContainer.querySelector('h1');
                            if (instructionHeading) {
                                instructionHeading.style.transition = 'opacity 0.5s ease';
                                instructionHeading.style.opacity = '0';
                            }
                        }, 1000);
                    }
                }, 400);
            });
        });
    }
});