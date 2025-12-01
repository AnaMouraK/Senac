document.addEventListener('DOMContentLoaded', () => {
    // --- Estado Global ---
    let carrinho = JSON.parse(localStorage.getItem('carrinhoLoja')) || [];
    let logado = false; 

    // --- Elementos do DOM ---
    const authModal = document.getElementById('auth-modal');
    const carrinhoModal = document.getElementById('carrinho-modal');
    const btnAuthModal = document.getElementById('btn-auth-modal');
    const btnCarrinhoModal = document.getElementById('btn-carrinho-modal');
    const closeBtns = document.querySelectorAll('.close-btn');
    const listaProdutos = document.getElementById('lista-produtos');
    const itensCarrinhoDiv = document.getElementById('itens-carrinho');
    const totalCarrinhoSpan = document.getElementById('total-carrinho');
    const contadorCarrinhoSpan = document.getElementById('contador-carrinho');

    const loginContainer = document.getElementById('login-container');
    const cadastroContainer = document.getElementById('cadastro-container');
    const linkCadastro = document.getElementById('link-cadastro');
    const linkLogin = document.getElementById('link-login');
    const loginForm = document.getElementById('login-form');
    const cadastroForm = document.getElementById('cadastro-form');

    // --- Funções de Utilitários ---
    
    // Calcula o total do carrinho
    function calcularTotalCarrinho() {
        const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
        totalCarrinhoSpan.textContent = total.toFixed(2);
        
        const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
        contadorCarrinhoSpan.textContent = totalItens;
        
        // Salva no LocalStorage para persistir o carrinho
        localStorage.setItem('carrinhoLoja', JSON.stringify(carrinho));
    }

    // Renderiza o conteúdo do carrinho no modal
    function renderizarCarrinho() {
        itensCarrinhoDiv.innerHTML = ''; // Limpa antes de renderizar

        if (carrinho.length === 0) {
            itensCarrinhoDiv.innerHTML = '<p>Seu carrinho está vazio.</p>';
        } else {
            carrinho.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'item-carrinho';
                itemDiv.innerHTML = `
                    <p>${item.nome} (${item.quantidade})</p>
                    <p>R$ ${(item.preco * item.quantidade).toFixed(2)} 
                        <button class="remover-item" data-id="${item.id}">Remover 1</button>
                    </p>
                `;
                itensCarrinhoDiv.appendChild(itemDiv);
            });
        }
        calcularTotalCarrinho();
    }
    
    // --- Lógica do Carrinho ---

    // Adiciona o produto ao carrinho
    listaProdutos.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-carrinho')) {
            const produtoDiv = e.target.closest('.produto');
            const id = produtoDiv.dataset.id;
            const nome = produtoDiv.dataset.nome;
            const preco = parseFloat(produtoDiv.dataset.preco);

            const itemExistente = carrinho.find(item => item.id === id);

            if (itemExistente) {
                itemExistente.quantidade++;
            } else {
                carrinho.push({ id, nome, preco, quantidade: 1 });
            }

            renderizarCarrinho();
            alert(`${nome} adicionado!`);
        }
    });

    // Remove 1 unidade do produto do carrinho
    itensCarrinhoDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('remover-item')) {
            const idRemover = e.target.dataset.id;
            
            const itemExistente = carrinho.find(item => item.id === idRemover);
            
            if (itemExistente) {
                if (itemExistente.quantidade > 1) {
                    itemExistente.quantidade--;
                } else {
                    // Remove o item do array se a quantidade for 1
                    carrinho = carrinho.filter(item => item.id !== idRemover);
                }
            }

            renderizarCarrinho();
        }
    });

    // --- Lógica de Login/Cadastro ---
    
    // Alterna entre formulário de Login e Cadastro
    linkCadastro.addEventListener('click', (e) => {
        e.preventDefault();
        loginContainer.style.display = 'none';
        cadastroContainer.style.display = 'block';
    });

    linkLogin.addEventListener('click', (e) => {
        e.preventDefault();
        cadastroContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    // Simulação de Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Em um projeto real, aqui você faria uma chamada API para validar
        logado = true;
        authModal.style.display = 'none';
        btnAuthModal.innerHTML = '<i class="fas fa-user"></i> Olá!'; // Indica que está logado
        alert('Login realizado com sucesso!');
    });

    // Simulação de Cadastro
    cadastroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Em um projeto real, aqui você faria uma chamada API para registrar o usuário
        alert('Cadastro realizado! Por favor, faça login.');
        cadastroContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    // --- Lógica dos Modais e Navegação ---
    
    // Abre o modal de autenticação (Login/Cadastro)
    btnAuthModal.addEventListener('click', () => {
        authModal.style.display = 'block';
    });

    // Abre o modal do carrinho
    btnCarrinhoModal.addEventListener('click', () => {
        renderizarCarrinho();
        carrinhoModal.style.display = 'block';
    });
    
    // Finalizar compra
    document.getElementById('finalizar-compra').addEventListener('click', () => {
        if (!logado) {
            alert('Você precisa estar logado para finalizar a compra!');
            authModal.style.display = 'block';
            carrinhoModal.style.display = 'none';
        } else if (carrinho.length === 0) {
             alert('Seu carrinho está vazio.');
        } else {
            alert(`Compra finalizada com sucesso! Total: R$ ${totalCarrinhoSpan.textContent}.`);
            carrinho = []; // Esvazia o carrinho
            renderizarCarrinho();
            carrinhoModal.style.display = 'none';
        }
    });

    // Fechar modais ao clicar no 'X' ou fora
    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === authModal) {
            authModal.style.display = 'none';
        }
        if (event.target === carrinhoModal) {
            carrinhoModal.style.display = 'none';
        }
    });
    
    // Toggle Menu Mobile (Lógica de responsividade do menu)
    document.getElementById('btn-toggle-menu').addEventListener('click', () => {
        document.getElementById('nav-links').classList.toggle('active');
    });

    // Inicialização: carrega o carrinho ao carregar a página
    renderizarCarrinho();
});
const botaoModoEscuro = document.getElementById("modoEscuro");
const logoClaro = document.getElementById("logoClaro");
const logoEscuro = document.getElementById("logoEscuro");

if (botaoModoEscuro) {
    botaoModoEscuro.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            botaoModoEscuro.textContent = ' ☀️';

            if (logoClaro && logoEscuro) {
                logoClaro.style.display = "none";
                logoEscuro.style.display = "inline";
            }
        } else {
            botaoModoEscuro.textContent = "🌙";

            if (logoClaro && logoEscuro) {
                logoClaro.style.display = "inline";
                logoEscuro.style.display = "none";
            }
        }
    });
}