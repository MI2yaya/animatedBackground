const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

let width, height, columns, drops;
let mouseX = null;
let mouseY = null;
let mouseActive = false;



const fontSize = 16;
const chars = "01abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()[]{}<>";
const tailLength=5;

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    columns = Math.floor(width / fontSize);
    drops = new Array(columns).fill(0);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function draw() {
    // Slightly fade the canvas for the trail effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#0F0";
    ctx.font = `${fontSize}px monospace`;

    
    for (let i = 0; i < columns; i++) {
        for (let j =0; j < tailLength; j++){
            const char = chars[Math.floor(Math.random() * chars.length)];
            
            const baseX = i * fontSize;
            const baseY = (drops[i]-5*j) * fontSize;

            const dx = baseX - mouseX;
            const dy = baseY - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            let x = baseX;
            let y = baseY;

            const maxOffsetPx = fontSize * 1.5;
            const radiusPx = 100;

            ctx.fillStyle = "#0F0";

            if (mouseX !== null && dist < radiusPx) {
                ctx.fillStyle = "#00ffcc";
                const offsetFactor = Math.cos((dist / radiusPx) * Math.PI / 2); // falloff
                const maxOffsetPx = fontSize * 1.5;
                const offsetAmount = offsetFactor * maxOffsetPx;

                // Normalize vector (dx, dy)
                const ux = dx / dist;
                const uy = dy / dist;

                // Apply offset in both x and y
                x = baseX + ux * offsetAmount;
                y = baseY + uy * offsetAmount;
            }
            ctx.fillText(char, x, y);
        }

        // Move drop down normally
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        } else {
            drops[i]++;
        }
        
    }
    mouseActive = false;
    setTimeout(() => requestAnimationFrame(draw), 40);
}

draw();


document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    mouseActive = true;
});
