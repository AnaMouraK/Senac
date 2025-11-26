const inputValor = document.querySelector('#valor-produto');
const selectPagamento = document.querySelector('#forma-pagamento');
const btnCalcular = document.querySelector('#btn-calcular');
const divResultado = document.querySelector('#resultado');

function calcularValorFinal() {
    const valorDigitado = parseFloat(inputValor.value);
    const formaPagamento = selectPagamento.value;
    let valorFinal = 0;
    let classeCor = '';
    let textoAdicional = '';

   
    if (isNaN(valorDigitado) || valorDigitado <= 0) {
        divResultado.textContent = 'Por favor, insira um valor válido e positivo para o produto.';
        divResultado.className = ''; 
        return;
    }

    switch (formaPagamento) {
        case 'vista':
            valorFinal = valorDigitado * 0.9;
            classeCor = 'verde-desconto';
            textoAdicional = ' (10% de desconto)';
            break;

        case 'cartao-credito':
            valorFinal = valorDigitado * 1.05;
            classeCor = 'vermelho-acrescimo';
            textoAdicional = ' (5% de acréscimo)';
            break;

        case 'parcelado-2x':
            valorFinal = valorDigitado;
            classeCor = 'laranja-sem-desconto';
            textoAdicional = ' (Sem alteração)';
            break;
            
        case 'parcelado-3x-mais':
            valorFinal = valorDigitado * 1.10;
            classeCor = 'vermelho-acrescimo';
            textoAdicional = ' (10% de acréscimo)';
            break;

        default:
            valorFinal = valorDigitado;
            classeCor = '';
            textoAdicional = ' (Forma de pagamento não reconhecida)';
    }

    const valorFormatado = valorFinal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    divResultado.className = classeCor; 
    divResultado.innerHTML = `
        <p>Valor Original: ${valorDigitado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        <p>Valor Final: <strong>${valorFormatado}</strong>${textoAdicional}</p>
    `;
}

btnCalcular.addEventListener('click', calcularValorFinal);
