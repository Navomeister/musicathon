var segundos, minutos, horas, fontes
const strTempo = document.getElementById("tempo")
const notasSessao = ["0"]
const botao = document.getElementById("botaoTempo")
const numNotas = 46

document.addEventListener("DOMContentLoaded", () => criaNotas())

function loadPreset() {
    criaNotas()
    apis()
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
    for (let i = 1; i < 46; i++) {
        const nota = document.createElement("audio")
        nota.classList = "notas"
        nota.id = i
        nota.src = "./notas/caixa-" + i + ".wav"
        caixa.appendChild(nota)
    }
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
    var nota = Math.floor(46 * Math.random())
    nota > 0 ? document.getElementById(nota).play() : null
    strTempo.style.fontFamily = fontes[Math.abs(nota - 1)]    
    notasSessao.push(nota)
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