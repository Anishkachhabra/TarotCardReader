// Tarot card scroll arrows functionality
// window.addEventListener('DOMContentLoaded', function() {
//     var leftArrow = document.getElementById('scroll-left');
//     var rightArrow = document.getElementById('scroll-right');
//     var cardsContainer = document.getElementById('tarot-cards-container');
//     if (leftArrow && rightArrow && cardsContainer) {
//         leftArrow.addEventListener('click', function() {
//             cardsContainer.scrollBy({ left: -240, behavior: 'smooth' });
//         });
//         rightArrow.addEventListener('click', function() {
//             cardsContainer.scrollBy({ left: 240, behavior: 'smooth' });
//         });
//     }
// });
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
    revealBtn.addEventListener('click', function() {
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
        }, 1500); // 1.5 second delay
        
        // Create 3 reading cards
        for (let i = 0; i < 3; i++) {
            const readingCard = document.createElement('div');
            readingCard.classList.add('reading-card');
            readingCard.style.minWidth = '250px';
            readingCard.style.height = '350px';
            readingCard.style.background = 'url("images/Card\ cover.png") no-repeat center/cover';
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

});
