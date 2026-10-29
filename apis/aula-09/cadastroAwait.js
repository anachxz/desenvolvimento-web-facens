let setores = [
    { id: 1, nome: "Tecnologia da Informação", sigla: "TI" },
    { id: 2, nome: "Recursos Humanos", sigla: "RH" },
    { id: 3, nome: "Financeiro", sigla: "FI" },
    { id: 4, nome: "Marketing e Vendas", sigla: "MK" },
    { id: 5, nome: "Produção e Operações", sigla: "PO" }
];

let cargos = [
    { id: 1, nome: "Analista de Sistemas", salário: "8500" },
    { id: 2, nome: "Assistente Administrativo", salário: "2500" },
    { id: 3, nome: "Secretário", salário: "4300" },
    { id: 4, nome: "Gerente de Vendas", salário: "6500" },
    { id: 5, nome: "Analista de Marketing", salário: "4500" }
];

let convenios = [
    {
        id: 1,
        nome: "UNIMED",
        valor: {
            titular: 1500,
            dependente: 750
        }
    },
    {
        id: 2,
        nome: "Intermédica",
        valor: {
            titular: 1400,
            dependente: 850
        }
    }
];

// Coloque entre as aspas a URL do recurso de funcionários no MockAPI.
const URL_API = "https://6adfed048e42963c8d5e8039.mockapi.io/funcionarios";

let carregar = document.querySelector(".carregar");
let resultado = document.querySelector("#resultado");
let botaoCadastrar = document.querySelector("#botaoCadastrar");

let campoCargo = document.querySelector("#cargo");
let campoSetor = document.querySelector("#setor");
let campoConvenio = document.querySelector("#convenio");

// Formata os valores para exibição em reais.
function formatarMoeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Simula uma consulta assíncrona aos arrays locais.
// Não faz uma requisição HTTP.
function consultarDados(dados) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(dados);
        }, 300);
    });
}

// Carrega cargo, setor e convênio usando Promise.all.
async function pesquisar() {
    carregar.style.visibility = "visible";
    resultado.textContent = "";

    try {
        let [listaSetores, listaCargos, listaConvenios] =
            await Promise.all([
                consultarDados(setores),
                consultarDados(cargos),
                consultarDados(convenios)
            ]);

        listaSetores.forEach(function (setor) {
            let opcao = document.createElement("option");

            opcao.value = setor.id;
            opcao.textContent = setor.sigla;

            campoSetor.appendChild(opcao);
        });

        listaCargos.forEach(function (cargo) {
            let opcao = document.createElement("option");

            opcao.value = cargo.id;
            opcao.textContent = cargo.nome;

            campoCargo.appendChild(opcao);
        });

        listaConvenios.forEach(function (convenio) {
            let opcao = document.createElement("option");

            opcao.value = convenio.id;
            opcao.textContent = convenio.nome;

            campoConvenio.appendChild(opcao);
        });

        campoSetor.disabled = false;
        campoCargo.disabled = false;
        campoConvenio.disabled = false;
        botaoCadastrar.disabled = false;

    } catch (erro) {
        resultado.textContent = "Erro ao carregar os dados.";
        console.error(erro);

    } finally {
        carregar.style.visibility = "hidden";
    }
}

// Preenche o salário quando o cargo é selecionado.
campoCargo.addEventListener("change", function () {
    let cargo = cargos.find(function (item) {
        return item.id === Number(campoCargo.value);
    });

    if (cargo) {
        document.querySelector("#salario").value =
            formatarMoeda(cargo.salário);
    } else {
        document.querySelector("#salario").value = "";
    }
});

// Preenche o nome do setor quando a sigla é selecionada.
campoSetor.addEventListener("change", function () {
    let setor = setores.find(function (item) {
        return item.id === Number(campoSetor.value);
    });

    if (setor) {
        document.querySelector("#nomeSetor").value = setor.nome;
    } else {
        document.querySelector("#nomeSetor").value = "";
    }
});

// Preenche os valores quando o convênio é selecionado.
campoConvenio.addEventListener("change", function () {
    let convenio = convenios.find(function (item) {
        return item.id === Number(campoConvenio.value);
    });

    if (convenio) {
        document.querySelector("#valorTitular").value =
            formatarMoeda(convenio.valor.titular);

        document.querySelector("#valorDependente").value =
            formatarMoeda(convenio.valor.dependente);
    } else {
        document.querySelector("#valorTitular").value = "";
        document.querySelector("#valorDependente").value = "";
    }
});

// Envia os dados do formulário para o MockAPI.
async function cadastrarFuncionario(event) {
    event.preventDefault();

    let formulario = event.currentTarget;

    resultado.textContent = "";

    if (URL_API === "") {
        resultado.textContent =
            "Coloque a URL do MockAPI na constante URL_API.";
        return;
    }

    let cargo = cargos.find(function (item) {
        return item.id === Number(campoCargo.value);
    });

    let setor = setores.find(function (item) {
        return item.id === Number(campoSetor.value);
    });

    let convenio = convenios.find(function (item) {
        return item.id === Number(campoConvenio.value);
    });

    if (!cargo || !setor || !convenio) {
        resultado.textContent = "Selecione cargo, setor e convênio.";
        return;
    }

    let funcionario = {
        nome: document.querySelector("#nome").value.trim(),
        telefone: document.querySelector("#telefone").value.trim(),
        email: document.querySelector("#email").value.trim(),
        cpf: document.querySelector("#cpf").value.trim(),
        rg: document.querySelector("#rg").value.trim(),

        cargo: {
            id: cargo.id,
            nome: cargo.nome,
            salario: Number(cargo.salário)
        },

        setor: {
            id: setor.id,
            sigla: setor.sigla,
            nome: setor.nome
        },

        convenio: {
            id: convenio.id,
            nome: convenio.nome,
            valor: {
                titular: convenio.valor.titular,
                dependente: convenio.valor.dependente
            }
        }
    };

    if (
        !funcionario.nome ||
        !funcionario.telefone ||
        !funcionario.email ||
        !funcionario.cpf ||
        !funcionario.rg
    ) {
        resultado.textContent = "Preencha todos os dados pessoais.";
        return;
    }

    carregar.style.visibility = "visible";
    botaoCadastrar.disabled = true;

    try {
        let resposta = await fetch(URL_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(funcionario)
        });

        if (!resposta.ok) {
            throw new Error("Erro HTTP: " + resposta.status);
        }

        resultado.textContent = "Funcionário cadastrado com sucesso!";

        // Limpa os campos depois do cadastro.
        formulario.reset();

    } catch (erro) {
        resultado.textContent =
            "Não foi possível confirmar o cadastro. Verifique a conexão e a API.";

        console.error(erro);

    } finally {
        carregar.style.visibility = "hidden";
        botaoCadastrar.disabled = false;
    }
}

// Carrega as opções assim que a página abre.
pesquisar();