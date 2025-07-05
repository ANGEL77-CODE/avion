const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const statusText = document.getElementById("status");

canvas.width = 1000;
canvas.height = 600;

let airplanes = [];
let gameRunning = false;

// Clase Airplane
class Airplane {
    constructor(x, y, id, color) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.color = color;
        this.speed = 0.2; // Velocidad inicial
        this.direction = Math.random() * 360; // Dirección aleatoria
        this.initialSpeed = this.speed; // Guardar velocidad inicial
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.fillText(this.id, this.x - 10, this.y - 15);
    }

    move() {
        this.x += this.speed * Math.cos(this.direction * (Math.PI / 180));
        this.y += this.speed * Math.sin(this.direction * (Math.PI / 180));

        // Limitar dentro del área del canvas
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    increaseSpeed(amount) {
        this.speed += amount;
    }

    resetSpeed() {
        this.speed = this.initialSpeed;
    }
}

// Inicializar juego
function startGame() {
    airplanes = [
        new Airplane(100, 100, "A1", "red"),
        new Airplane(200, 200, "B1", "green"),
        new Airplane(300, 300, "C1", "orange"),
        new Airplane(400, 400, "D1", "blue"),
      
        new Airplane(500, 100, "A2", "red"),
        new Airplane(600, 200, "B2", "green"),
        new Airplane(700, 300, "C2", "orange"),
        new Airplane(800, 400, "D2", "blue"),
    ];
    gameRunning = true;
    statusText.textContent = "Estado: Juego en ejecución...";
    
    gameLoop();
}

// Bucle principal del juego
function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    airplanes.forEach((plane) => {
        plane.move();
        plane.draw();
    });

    detectCollisions();
    requestAnimationFrame(gameLoop);
}

// Detección de colisiones
function detectCollisions() {
    for (let i = 0; i < airplanes.length; i++) {
        for (let j = i + 1; j < airplanes.length; j++) {
            const dx = airplanes[i].x - airplanes[j].x;
            const dy = airplanes[i].y - airplanes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 20) {
                gameRunning = false;
                statusText.textContent = `¡Colisión detectada entre ${airplanes[i].id} y ${airplanes[j].id}! Fin del juego.`;
            }
        }
    }
}

// Evento para aumentar y restablecer velocidad con teclas
document.addEventListener("keydown", (e) => {
    if (gameRunning) {
        switch (e.key) {
            case "1":
                airplanes[0].increaseSpeed(1); // Aumentar velocidad del avión rojo
                break;
            case "2":
                airplanes[1].increaseSpeed(1); // Aumentar velocidad del avión verde
                break;
            case "3":
                airplanes[2].increaseSpeed(1); // Aumentar velocidad del avión naranja
                break;
            case "4":
                airplanes[3].increaseSpeed(1); // Aumentar velocidad del avión azul
                break;
            case "A":
                airplanes[4].increaseSpeed(1); // Aumentar velocidad del avión rojo
                break;
            case "B":
                airplanes[5].increaseSpeed(1); // Aumentar velocidad del avión verde
                break;
            case "C":
                airplanes[6].increaseSpeed(1); // Aumentar velocidad del avión naranja
                break;
            case "D":
                airplanes[7].increaseSpeed(1); // Aumentar velocidad del avión azul
                break;
        }
    }
});

document.addEventListener("keyup", (e) => {
    if (gameRunning) {
        switch (e.key) {
            case "1":
                airplanes[0].resetSpeed(); // Restablecer velocidad del avión rojo
                break;
            case "2":
                airplanes[1].resetSpeed(); // Restablecer velocidad del avión verde
                break;
            case "3":
                airplanes[2].resetSpeed(); // Restablecer velocidad del avión naranja
                break;
            case "4":
                airplanes[3].resetSpeed(); // Restablecer velocidad del avión azul
                break;
            case "A":
                airplanes[4].resetSpeed(); // Restablecer velocidad del avión rojo
                break;
            case "B":
                airplanes[5].resetSpeed(); // Restablecer velocidad del avión verde
                break;
            case "C":
                airplanes[6].resetSpeed(); // Restablecer velocidad del avión naranja
                break;
            case "D":
                airplanes[7].resetSpeed(); // Restablecer velocidad del avión azul
                break;
        }
    }
});

// Evento de inicio del juego
startButton.addEventListener("click", () => {
    if (!gameRunning) startGame();
});