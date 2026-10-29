
async function pesquisar(event) {
    event.preventDefault();

    let cidade = document.querySelector('#cidade').value.trim();

    if (cidade.length === 0) {
        alert('Digite o nome da cidade');
        return;
    }

    let carregar = document.querySelector('.carregar');
    let resultado = document.querySelector('#resultado');

    carregar.style.visibility = 'visible';
    resultado.textContent = '';

    try {
        let dados = await consultarClima(cidade);
        resultado.textContent = dados;
    } catch (erro) {
        resultado.textContent = 'Não foi possível consultar o clima. Tente novamente.';
        console.error(erro);
    } finally {
        carregar.style.visibility = 'hidden';
    }
}

async function consultarClima(cidade) {
    let url = `https://wttr.in/${encodeURIComponent(cidade)}?format=3`;

    let response = await fetch(url);

    if (!response.ok) {
        throw new Error('Erro na consulta: ' + response.status);
    }

    let dados = await response.text();

    return dados;
}
