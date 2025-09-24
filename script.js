window.addEventListener('DOMContentLoaded', function() {
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
        var x = window.innerWidth/2 - w/2;
        var y = window.innerHeight/2 - h/2;
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
});
