const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
let isJumping = false;
let dinoPosition = 0;

const body = document.getElementsByName("body");

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (dinoPosition >= 200) {
            clearInterval(upInterval);

            //Dino descendo 
            let downInterval = setInterval(() => {
                if (dinoPosition <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    dinoPosition -= 20;
                    dino.style.bottom = dinoPosition + 'px';
                }
            }, 20)
        } else {
            //Dino subindo
            dinoPosition += 20;
            dino.style.bottom = dinoPosition + 'px';
        }
    }, 20)
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add("cactus");
    cactus.style.left = cactusPosition + "px";
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition < 0 && cactusPosition < 60 && dinoPosition < 60) {
            //Game over
            clearInterval(leftInterval);
            document.body.innerHTML = '<div class="game-over"><h1>Fim do jogo</h1><button class="play-again">Jogar novamente</button></div>';
            document.querySelector(".play-again").addEventListener("click", () => {
                location.reload(true);
            })
        }
        else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + "px";
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

createCactus()
document.addEventListener("keyup", handleKeyUp);

