const produtos = [];
const btnCarrinho = document.querySelector(`.buttons .add-to-cart`);
const carrinhoLateral = document.querySelector(`#carrinho-lateral`);
btnCarrinho.addEventListener(`click`, function(e){
    e.preventDefault();
    const nomeProduto = document.querySelector(`.product-details .product-info h2`).textContent;
    const precoProduto = Number(document.querySelector(`.product-details .product-info .price span`).textContent);
    const qtdProduto = Number(document.querySelector(`.product-details .product-info #quantity`).value);
    const produto = { nomeProduto, precoProduto, qtdProduto };
    produtos.push(produto);
    mostrarCarrinho();
});
function mostrarCarrinho(){
    console.log(produtos);
    // lista.innerHTML = '';
    
    // for(let indice = 0; indice < tarefas.length; indice++){
    //     const tarefa = tarefas[indice];
    //     const card = document.createElement('div');
    //     card.classList.add('card');
    //     if(tarefa.prioridade === 'Alta'){
    //         card.classList.add('alta');
    //     } else if(tarefa.prioridade === 'Média'){
    //         card.classList.add('media');
    //     } else if(tarefa.prioridade === 'Baixa'){
    //         card.classList.add('baixa');
    //     }
    //     card.innerHTML = `
    //         <div>
    //             <h3>Título:
    //                 ${tarefa.titulo}
    //             </h3>
    //             <hr>
    //             <p>Descrição:<br>
    //                 ${tarefa.descricao}
    //             </p>
    //         </div>
    //         <p>Prioridade:<span>${tarefa.prioridade}</span></p>`;
    //     lista.appendChild(card);
    // }
}