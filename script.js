var segundos, minutos, horas, fontes
const strTempo = document.getElementById("tempo")
const botao = document.getElementById("botaoTempo")
const numNotas = 46

document.addEventListener("DOMContentLoaded", () => loadPreset())

function loadPreset() {
    criaNotas()
    criaLinhas()
}

function carregaFontes(json) {
    fontes = json
}

function tempo(milisegundos) {
    segundos = Math.floor((milisegundos / 1000) % 60),
    minutos = Math.floor((milisegundos / (1000 * 60)) % 60),
    horas = Math.floor((milisegundos / (1000 * 60 * 60)));

    strTempo.innerText = (horas + ":" + minutos + ":" + (segundos < 10 ? "0" + segundos : segundos));
}

function criaNotas() {
    const caixa = document.getElementById("caixa")
    for (let i = 0; i < numNotas; i++) {
        const nota = document.createElement("audio")
        nota.classList = "notas"
        nota.id = i + 1
        nota.src = "./notas/caixa-" + (i + 1) + ".wav"
        caixa.appendChild(nota)
    }
}

function criaLinhas() {
    const linhas = document.getElementById("linhas")
    for (let i = 0; i < numNotas; i++) {
        const linha = document.createElement("span")
        linha.classList.add("linha")
        linha.id = "linha" + i
        linhas.appendChild(linha)
    }
}

function criaPonto(num) {
    const linha = document.getElementById("linha" + num)
    const ponto = document.createElement("span")
    ponto.classList.add("ponto")
    ponto.addEventListener("animationend", () => {
        ponto.remove()
    })
    linha.appendChild(ponto)
}


function diminui() {
    if (segundos > 0) {
        segundos--
    }
    else {
        segundos = 59
        if (minutos > 0) {
            minutos--
        } else {
            minutos = 59
            horas--
        }
    }
    strTempo.innerText = (
        (horas < 10 ? "0" + horas : horas) + ":" + (minutos < 10 ? "0" + minutos : minutos) + ":" + (segundos < 10 ? "0" + segundos : segundos));
    
    tocaNota()    
}

botao.addEventListener("click", () => desmuta())

function desmuta() {
    botao.innerText = "👍"
    botao.classList = ("some")
    // botao.addEventListener("animationend", () => botao.style.display = "none")
}

function tocaNota() {
    var nota = Math.floor(numNotas * Math.random())
    nota > 0 ? (document.getElementById(nota).currentTime = 0, document.getElementById(nota).play(), criaPonto(nota)) : null
    try {
        trocaFonte()
    } catch (error) {
        null
    }
}

function trocaFonte() {
    let fonte = Math.floor(numNotas * Math.random())
    strTempo.style.fontFamily = fontes[Math.abs(fonte - 1)] 
}

setInterval(diminui, 1000)

setInterval(() => {
    fetch("https://subathon-api.justdavi.dev/api/time-left")
        .then(response => response.json())
        .then(data => tempo(data.timeLeft))}, 20000)


fetch("https://subathon-api.justdavi.dev/api/time-left")
.then(response => response.json())
.then(data => tempo(data.timeLeft))


fetch("http://127.0.0.1:5500/fontes.json")
.then(response => response.json())
.then(data => carregaFontes(data)
)

try {
    
} catch (error) {
    
}