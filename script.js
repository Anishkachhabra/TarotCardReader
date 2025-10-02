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
            readingCard.style.minWidth = '250px';
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

    var tarotCards = [
        {
            img: 'images/Cards/fool.png',
            name: 'The Fool',
            description: 'The Fool: New beginnings, optimism, and freedom.'
        },
        {
            img: 'images/Cards/I-The-Magician-Earth-Woman-Tarot.jpg',
            name: 'The Magician',
            description: 'The Magician: Manifestation, resourcefulness, power.'
        },
        {
            img: 'images/Cards/II-The-High-Priestess-Earth-Woman-Tarot.webp',
            name: 'The High Priestess',
            description: 'The High Priestess: Intuition, wisdom, mystery.'
        },
        {
            img: 'images/Cards/III-The-Empress-Earth-Woman-Tarot.webp',
            name: 'The Empress',
            description: 'The Empress: Abundance, nurturing, fertility.'
        },
        {
            img: 'images/Cards/IV-The-Emperor-Earth-Woman-Tarot.webp',
            name: 'The Emperor',
            description: 'The Emperor: Authority, structure, control.'
        },
        {
            img: 'images/Cards/VII-The-Chariot-Earth-Woman-Tarot.webp',
            name: 'The Chariot',
            description: 'The Chariot: Determination, victory, willpower.'
        },
        {
            img: 'images/Cards/VIII-Strength-Earth-Woman-Tarot.webp',
            name: 'Strength',
            description: 'Strength: Courage, patience, inner strength.'
        },
        {
            img: 'images/Cards/XI-Justice-Earth-Woman-Tarot.webp',
            name: 'Justice',
            description: 'Justice: Fairness, truth, law.'
        },
        {
            img: 'images/Cards/XII-The-Hanged-One-Earth-Woman-Tarot.webp',
            name: 'The Hanged One',
            description: 'The Hanged One: Surrender, perspective, pause.'
        },
        {
            img: 'images/Cards/XIII-Death-Earth-Woman-Tarot.webp',
            name: 'Death',
            description: 'Death: Transformation, endings, change.'
        },
        {
            img: 'images/Cards/XIX-The-Sun-Earth-Woman-Tarot.webp',
            name: 'The Sun',
            description: 'The Sun: Joy, success, positivity.'
        },
        {
            img: 'images/Cards/10-of-Wands-Earth-Woman-Tarot.webp',
            name: '10 of Wands',
            description: '10 of Wands: Burden, responsibility, hard work.'
        },
        {
            img: 'images/Cards/Eight-of-Cups-Earth-Woman-Tarot.webp',
            name: '8 of Cups',
            description: '8 of Cups: Walking away, introspection, change.'
        },
        {
            img: 'images/Cards/Eight-of-Pentacles-Earth-Woman-Tarot.webp',
            name: '8 of Pentacles',
            description: '8 of Pentacles: Diligence, mastery, skill.'
        },
        {
            img: 'images/Cards/Five-of-Wands-Earth-Woman-Tarot.webp',
            name: '5 of Wands',
            description: '5 of Wands: Conflict, competition, tension.'
        },
        {
            img: 'images/Cards/Knight-of-Cups-Earth-Woman-Tarot.webp',
            name: 'Knight of Cups',
            description: 'Knight of Cups: Romance, imagination, charm.'
        },
        {
            img: 'images/Cards/Knight-of-Pentacles-Earth-Woman-Tarot.webp',
            name: 'Knight of Pentacles',
            description: 'Knight of Pentacles: Efficiency, routine, responsibility.'
        },
        {
            img: 'images/Cards/Nine-of-Cups-Earth-Woman-Tarot.webp',
            name: '9 of Cups',
            description: '9 of Cups: Satisfaction, emotional contentment.'
        },
        {
            img: 'images/Cards/Nine-of-Swords-Earth-Woman-Tarot.webp',
            name: '9 of Swords',
            description: '9 of Swords: Anxiety, worry, fear.'
        },
        {
            img: 'images/Cards/Nine-of-Wands-Earth-Woman-Tarot.webp',
            name: '9 of Wands',
            description: '9 of Wands: Resilience, persistence, boundaries.'
        },
        {
            img: 'images/Cards/Queen-of-Wands-Earth-Woman-Tarot.webp',
            name: 'Queen of Wands',
            description: 'Queen of Wands: Confidence, independence, determination.'
        },
        {
            img: 'images/Cards/Seven-of-Pentacles-Earth-Woman-Tarot.webp',
            name: '7 of Pentacles',
            description: '7 of Pentacles: Patience, investment, growth.'
        },
        {
            img: 'images/Cards/Six-of-Swords-Earth-Woman-Tarot.webp',
            name: '6 of Swords',
            description: '6 of Swords: Transition, change, rite of passage.'
        },
        {
            img: 'images/Cards/Ten-of-Cups-Earth-Woman-Tarot.webp',
            name: '10 of Cups',
            description: '10 of Cups: Happiness, harmony, fulfillment.'
        },
        {
            img: 'images/Cards/Ten-of-Pentacles-Earth-Woman-Tarot.webp',
            name: '10 of Pentacles',
            description: '10 of Pentacles: Legacy, inheritance, stability.'
        },
        {
            img: 'images/Cards/Three-of-Wands-Earth-Woman-Tarot.webp',
            name: '3 of Wands',
            description: '3 of Wands: Expansion, foresight, progress.'
        },
        {
            img: 'images/Cards/Two-of-Pentacles.webp',
            name: '2 of Pentacles',
            description: '2 of Pentacles: Balance, adaptability, priorities.'
        }
    ];


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
            // clickedCard.appendChild(cardTitle);
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
                    // Create a "Get Reading" button instead of showing reset button
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
                        alert('Your detailed reading is being prepared...');
                        // Here you can add code to show a more detailed reading
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
