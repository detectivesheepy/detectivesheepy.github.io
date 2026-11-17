    const canvas = document.getElementById('snow-canvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Resize canvas automatically when the window changes size
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    // Customize your snow settings here
    const flakeCount = 150;
    const snowflakes = [];

    for (let i = 0; i < flakeCount; i++) {
      snowflakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,      // Size between 1px and 4px
        speed: Math.random() * 1.5 + 0.5,   // Fall speed
        wind: Math.random() * 0.5 - 0.25    // Slight horizontal drift
      });
    }

    function drawSnow() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.beginPath();

      for (let flake of snowflakes) {
        ctx.moveTo(flake.x, flake.y);
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      }

      ctx.fill();
      updateSnow();
      requestAnimationFrame(drawSnow);
    }

    function updateSnow() {
      for (let flake of snowflakes) {
        flake.y += flake.speed;
        flake.x += flake.wind + Math.sin(flake.y * 0.01) * 0.3;

        // Reset flake to the top once it falls off the bottom
        if (flake.y > height) {
          flake.y = -flake.radius;
          flake.x = Math.random() * width;
        }
        // Wrap horizontally
        if (flake.x > width) flake.x = 0;
        if (flake.x < 0) flake.x = width;
      }
    }

    drawSnow();