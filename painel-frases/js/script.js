const lista = [
    "Mesmo com o mar agitado, continue nandando.",
    "Antes se arrepender de ter feito, do que se arrepender de não ter tentado.",
    "Aprenda com seus erros, eles mostram onde você pode melhorar.",
    "Antes tarde do que nunca.",
    "A única maneira de alcançar o impossível é acreditar que é possível.",
    "A coragem está um passo a frente do medo.",
    "O único lugar onde o sucesso vem antes do trabalho é no dicionário.",
    "Comece onde você está. Use o que você tem. Faça o que você pode.",
    "Não espere por oportunidades extraordinárias. Agarre as ocasiões comuns e as torne grandes.",
    "Seja a mudança que você deseja ver no mundo.",
    "A persistência realiza o impossível.",
    "Não tenha medo de desistir do bom para ir atrás do ótimo.",
    "Acredite em si mesmo e em tudo que você é. Saiba que há algo dentro de você que é maior do que qualquer obstáculo.",
    "O desenvolvimento pessoal é o seu maior investimento.",
    "A vida encolhe ou se expande na proporção da sua coragem.",
    "O fracasso é a chance de começar de novo com mais inteligência.",
    "Se você pode sonhar, você pode realizar.",
    "O futuro pertence àqueles que acreditam na beleza de seus sonhos.",
    "Seja a sua própria âncora e veleje na direção dos seus objetivos.",
    "Defina metas altas e não pare até chegar lá."
];
const botao = document.querySelector('button');
const frase = document.querySelector('#frase');

function mostraFrase(){
    const indiceAleatorio = Math.floor(Math.random() * lista.length);
    frase.innerText = lista[indiceAleatorio];
};
botao.addEventListener('click', mostraFrase);