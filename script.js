var tarotCards = [
    {
        img: 'images/Cards/The Fool.png',
        name: 'The Fool: New beginnings, optimism, trust in life'
    },
    {
        img: 'images/Cards/The Magician.png',
        name: 'The Magician: Action, the power to manifest'
    },
    {
        img: 'images/Cards/The High Priestess.png',
        name: 'The High Priestess: Inaction, going within, the subconscious'
    },
    {
        img: 'images/Cards/The Empress.png',
        name: 'The Empress: Abundance, nurturing, fertility, life in bloom!'
    },
    {
        img: 'images/Cards/The Emperor.png',
        name: 'The Emperor: Structure, stability, rules and power'
    },
    {
        img: 'images/Cards/The Hierophant.png',
        name: 'The Hierophant: Institutions, tradition, society and its rules'
    },
    {
        img: 'images/Cards/The Lovers.png',
        name: 'The Lovers: Love, harmony, relationships, values alignment, choices'
    },
    {
        img: 'images/Cards/The Chariot.png',
        name: 'The Chariot: Movement, progress, integration'
    },
    {
        img: 'images/Cards/Strength.png',
        name: 'Strength: Courage, subtle power, integration of animal self'
    },
    {
        img: 'images/Cards/The Hermit.png',
        name: 'The Hermit: Meditation, solitude, consciousness'
    },
    {
        img: 'images/Cards/Wheel of Fortune.png',
        name: 'Wheel of Fortune: Cycles, change, ups and downs'
    },
    {
        img: 'images/Cards/Justice.png',
        name: 'Justice: Fairness, equality, balance'
    },
    {
        img: 'images/Cards/The Hanged Man.png',
        name: 'The Hanged Man: Surrender, new perspective, enlightenment'
    },
    {
        img: 'images/Cards/Death.png',
        name: 'Death: The end of something, change, the impermeability of all things'
    },
    {
        img: 'images/Cards/Temperance.png',
        name: 'Temperance: Balance, moderation, being sensible'
    },

    {
        img: 'images/Cards/The Tower.png',
        name: 'The Tower: Collapse of stable structures, release, sudden insight'
    },
    {
        img: 'images/Cards/The Star.png',
        name: 'The Star: Hope, calm, a good omen!'
    },
    {
        img: 'images/Cards/The Moon.png',
        name: 'The Moon: Mystery, the subconscious, dreams'
    },
    {
        img: 'images/Cards/The Sun.png',
        name: 'The Sun: Success, happiness, all will be well'
    },
    {
        img: 'images/Cards/Judgment.png',
        name: 'Judgement: Rebirth, a new phase, inner calling'
    },
    {
        img: 'images/Cards/The World.png',
        name: 'The World: Completion, wholeness, attainment, celebration of life'
    }
];

// Summarize text utility
function summarizeText(text, sentenceCount = 3) {
    // Split into sentences
    let sentences = text.match(/[^\.\!?]+[\.\!?]+/g) || [text];
    // Split into words and count frequencies
    let wordFreq = {};
    let stopwords = new Set(["the", "is", "in", "at", "which", "on", "a", "an", "and", "of", "to", "for", "with", "that", "this"]);
    text.toLowerCase().split(/\W+/).forEach(word => {
        if (word && !stopwords.has(word)) {
            wordFreq[word] = (wordFreq[word] || 0) + 1;
        }
    });
    // Score sentences
    let sentenceScores = sentences.map(s => {
        let score = 0;
        s.toLowerCase().split(/\W+/).forEach(word => {
            if (wordFreq[word]) score += wordFreq[word];
        });
        return { sentence: s.trim(), score };
    });
    // Sort by score and pick top sentences
    let summary = sentenceScores
        .sort((a, b) => b.score - a.score)
        .slice(0, sentenceCount)
        .map(obj => obj.sentence)
        .join(" ");

    return summary;
}

// Get reading summary for 3 selected cards
function getReading(selectedCardIndices) {
    // selectedCardIndices: array of 3 indices from tarotCards
    if (!Array.isArray(selectedCardIndices) || selectedCardIndices.length !== 3) return "Please select 3 cards.";
    let descriptions = selectedCardIndices.map(idx => {
        const card = tarotCards[idx];
        return card?.description || card?.name || "";
    }).join(" ");
    return summarizeText(descriptions, 3);
}

// function getReading(selectedCardIndices) {
//     // selectedCardIndices: array of 3 indices from tarotCards
//     if (!Array.isArray(selectedCardIndices) || selectedCardIndices.length !== 3) return "Please select 3 cards.";
//     let descriptions = selectedCardIndices.map(idx => {
//         const card = tarotCards[idx];
//         return card?.name || "";
//     }).join("<br>");
//     return descriptions;
// }

// function getReading(selectedCardIndices) {
//     // selectedCardIndices: array of 3 indices from tarotCards
//     if (!Array.isArray(selectedCardIndices) || selectedCardIndices.length !== 3) return "Please select 3 cards.";
//     return selectedCardIndices.map(idx => tarotCards[idx]?.name || "").join('<br>');
// }

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
        readingContainer.style.justifyContent = 'center';
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
        instructionHeading.style.top = '100px';
        instructionHeading.style.fontFamily = 'Lavishly Yours, serif';
        instructionHeading.style.opacity = '0';
        readingContainer.appendChild(instructionHeading);

        // Add delay before showing the instruction
        setTimeout(() => {
            instructionHeading.style.transition = 'opacity 1s ease-in';
            instructionHeading.style.opacity = '1';
        }, 1000); // 1.5 second delay

        // Create 3 reading cards
        // Reset revealedIndices for each new reading
        window.revealedIndices = [];
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
            readingCard.style.marginTop = '250px';
            readingCard.style.color = '#fff';
            readingCard.style.padding = '15px';
            readingCard.style.transform = 'scale(0)';
            readingCard.style.animation = `revealCard 0.8s ${i * 0.3}s forwards ease-out`;
            readingContainer.appendChild(readingCard);
        }

        // Make reading container visible
        readingContainer.style.opacity = '1';

    }, { once: true });

    // Add necessary animation to head
    const style = document.createElement('style');
    style.textContent = `
        @keyframes revealCard {
            0% { transform: scale(0) rotate(-10deg); opacity: 0; }
            100% { transform: scale(1) rotate(0); opacity: 1; }
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
                    getReadingBtn.style.position = 'absolute';
                    getReadingBtn.style.top = '80%';
                    getReadingBtn.style.left = '50%';
                    getReadingBtn.style.transform = 'translateX(-50%)';
                    getReadingBtn.style.padding = '12px 32px';
                    getReadingBtn.style.fontSize = '1.2rem';
                    getReadingBtn.style.background = '#4F335B';
                    getReadingBtn.style.color = '#fff';
                    getReadingBtn.style.border = '2px solid #edce8c';
                    getReadingBtn.style.borderRadius = '8px';
                    getReadingBtn.style.zIndex = '10';
                    document.body.appendChild(getReadingBtn);
                    // Add hover properties for the Get Reading button
                    getReadingBtn.style.transition = 'all 0.3s ease';
                    getReadingBtn.style.cursor = 'pointer';

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
                        const reading = getReading(selectedIndices);
                        // Remove any previous reading summary
                        let readingSummaryDiv = document.getElementById('reading-summary');
                        if (!readingSummaryDiv) {
                            readingSummaryDiv = document.createElement('div');
                            readingSummaryDiv.id = 'reading-summary';
                            readingSummaryDiv.style.position = 'absolute';
                            readingSummaryDiv.style.top = '90%';
                            readingSummaryDiv.style.left = '50%';
                            readingSummaryDiv.style.transform = 'translateX(-50%)';
                            readingSummaryDiv.style.background = 'rgba(255,255,255,0.95)';
                            readingSummaryDiv.style.color = '#412058';
                            readingSummaryDiv.style.border = '2px solid #edce8c';
                            readingSummaryDiv.style.borderRadius = '10px';
                            readingSummaryDiv.style.padding = '18px 24px';
                            readingSummaryDiv.style.fontSize = '1.1rem';
                            readingSummaryDiv.style.fontFamily = 'serif';
                            readingSummaryDiv.style.zIndex = '20';
                            document.body.appendChild(readingSummaryDiv);
                        }
                        readingSummaryDiv.innerHTML = `<h2 style='margin-top:0;text-align:center;font-family:Lavishly Yours,serif;'>Your Tarot Reading</h2><p style='margin-bottom:0;text-align:center;'>${reading}</p>`;
                        // this.disabled = true;
                    });

                    // Remove instruction text
                    const instructionHeading = readingContainer.querySelector('h1');
                    if (instructionHeading) instructionHeading.style.opacity = '0';
                }, 1000);
            }
        }, 500);
    });

    // Add flipping animation style
    const flipStyle = document.createElement('style');
    flipStyle.textContent = `
        .flipping {
            animation: flip 1s ease;
            transform-style: preserve-3d;
            perspective: 1000px;
            backface-visibility: hidden;
        }
        
        @keyframes flip {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
        }
        
        .reading-card {
            transition: transform 0.5s;
            transform-style: preserve-3d;
        }
    `;
    document.head.appendChild(flipStyle);

});
