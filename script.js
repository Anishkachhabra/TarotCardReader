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
    
    var resetButton = document.getElementById('reset-btn');   
    resetButton.addEventListener('click', function() {
        selectedCards.forEach(card => card.classList.remove('selected'));
        selectedCards = [];
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, i) => {
            const parent = card.parentNode;
            const oldCard = parent.removeChild(card);
            void parent.offsetWidth;
            oldCard.style.animationDelay = `${i * 0.1}s`;
            parent.appendChild(oldCard);
        });
    });

    var revealButton = document.getElementById('reveal-btn');
    revealButton.addEventListener('click', function() {
        if (selectedCards.length < 3) {
            alert('Please select exactly 3 cards to reveal.');
            return;
        }
        selectedCards.forEach(card => card.classList.add('revealed'));
    });

});
