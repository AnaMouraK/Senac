// const form = document.querySelector('#formulario');
const erro = document.querySelector('.erro');
const personagens = document.querySelector('#personagens');
const ranking = document.querySelector('#lista-ranking');
const botao = document.querySelector('#votar');

const votos = {
    "Bojack": 0,
    "Todd": 0,
    "Diane": 0,
    "Princess Carolyn": 0,
    "Mr. Peanutbutter": 0,
    "Sarah Lynn": 0
}

function votar(e) {
    e.preventDefault();

    erro.innerText = ``;
    const votado = personagens.value;

        if (votado === `Selecione`) {
            erro.innerText = 'Escolha um personagem valido!';
            return;
        }

        votos[votado]++;

        atualizarRanking();
}

function atualizarRanking() {
    ranking.innerHTML = "";

    const rankingOrdenado = Object.entries(votos).sort((a, b) =>  b[1] - a[1]);
    const maiorVoto = rankingOrdenado[0][1];

    rankingOrdenado.forEach(personagem => {
    const li = document.createElement(`li`);
    li.textContent = `${personagem[0]} - ${personagem[1]} votos(s)`;

    if (personagem[1] === maiorVoto && maiorVoto !== 0) {
        li.classList.add(`lider`);
    }

    ranking.appendChild(li);
    });
};
botao.addEventListener("click", votar);