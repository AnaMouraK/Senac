const form = document.querySelector('#formulario');
const campoTitulo = form.querySelector("#titulo");
const campoDescricao = form.querySelector("#descricao");
const campoPrioridade = form.querySelector("#prioridade");
const campoData = form.querySelector("#dataMeta");
const erroDiv = document.querySelector("#erro");
const listaMetas = document.querySelector("#lista-metas");
const btnAdicionar = document.querySelector("#btn-adicionar");

function adicionarMeta(e) {
    e.preventDefault();

    let tituloMeta = campoTitulo.value.trim();
    let descricaoMeta = campoDescricao.value.trim();
    let prioridadeMeta = campoPrioridade.value;
    let dataMeta = campoData.value;
    let hoje = new Date().toISOString().split('T')[0];

    if(!tituloMeta || !descricaoMeta || !prioridadeMeta || !dataMeta || dataMeta < hoje) {
        erroDiv.innerHTML = "Preencha todos os campos corretamente!";
        return;
     }

    const li = document.createElement("li");
    li.classList.add(prioridadeMeta);
    li.innerHTML = `
        <div class="item-lista">
            <h3>${tituloMeta}</h3>
            <p>${descricaoMeta}</p>
            <p><strong>Prioridade:</strong ${prioridadeMeta.toUpperCase()}</p>
            <p><strong>Data:</strong> ${dataMeta}</p>
    `;

    const btnConcluir = document.createElement('button');
    btnConcluir.innerText = '✓';
    btnConcluir.classList.add('btn', 'btn-concluir');
    btnConcluir.addEventListener('click', function(){
        if(li.classList.contains('concluida')){
            li.classList.remove('concluida');
            btnConcluir.innerText = '✓';
        } else {
            li.classList.add('concluida');
            btnConcluir.innerHTML = '↵';
        }
    });
    const btnRemover = document.createElement('button');
    btnRemover.innerText = '✗';
    btnRemover.classList.add('btn', 'btn-remover');
    btnRemover.addEventListener('click', function(){
        li.remove();
    });
    li.appendChild(btnConcluir);
    li.appendChild(btnRemover);

    listaMetas.appendChild(li);

    form.reset();
        

    erroDiv.innerHTML = "";
    
    // document.getElementById("#data-hoje").textContent = new Date().toLocaleDateString("pt-BR");
} 
btnAdicionar.addEventListener("click", adicionarMeta);