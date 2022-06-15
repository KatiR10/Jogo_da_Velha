const celulas = document.querySelectorAll(".celula")
let fimDeJogo = false

const jogadorX = "X"
const jogadorO = "O"
const combinacoes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

document.addEventListener("click", (event) => {
    if (event.target.matches(".celula")) {
        jogar(event.target.id, jogadorX)
        setTimeout(() => bot(), 500)
    } // matches se identificas a classe celula


}) //adiciona um evento

function bot() {
    const posicoesDisponiveis = []
    for (index in celulas) {
        if (!isNaN(index)) {
            if (
                !celulas[index].classList.contains("X") &&
                !celulas[index].classList.contains("O")
            ) {
                posicoesDisponiveis.push(index)
            }
        }

    }
    const posicaoAleatoria = Math.floor( //floor para arrendondar para baixo e formar o número inteiro
        Math.random() * posicoesDisponiveis.length
    )

    if (!fimDeJogo) {
        jogar(posicoesDisponiveis[posicaoAleatoria], jogadorO)
    }


}

function jogar(id, turno) {
    const celula = document.getElementById(id)

    celula.textContent = turno
    celula.classList.add(turno)

    checarVencedor(turno)
}

function checarVencedor(turno) {
    const vencedor = combinacoes.some((comb) => {
        return comb.every((index) => {
            return celulas[index].classList.contains(turno) // se as 3 posições forem do mesmo jogador retorna true e temos um vencedor
        })
    }) //some - se alguma das funções for true, todas viram true


    if (vencedor) {
        encerrarJogo(turno);
    } else if (checarEmpate()) {
        encerrarJogo();
    }



}
//every - todas tem que estar true para retornar true

function checarEmpate() {
    let x = 0
    let o = 0

    for (index in celulas) {
        if (!isNaN(index)) {
            if (celulas[index].classList.contains(jogadorX)) {
                x++
            }

            if (celulas[index].classList.contains(jogadorO)) {
                o++
            }
        }
    }
    return x + o === 9 ? true : false
}

function encerrarJogo(vencedor = null) {

    fimDeJogo = true
    const telaEscura = document.getElementById("telaEscura")
    const h2 = document.createElement("h2")
    const h3 = document.createElement("h3")
    let mensagem = null;

    telaEscura.style.display = "block"
    telaEscura.appendChild(h2)
    telaEscura.appendChild(h3)


    if (vencedor) {
        h2.innerHTML = `O player <span>${vencedor}</span> venceu`
    }
    else {
        h2.innerHTML = `Empatou!`
    }

    let contador = 3
    setInterval(() => {
        h3.innerHTML = `Reiniciando em ${contador--}`
    }, 1000)

    setTimeout(() => location.reload(), 4000)
}