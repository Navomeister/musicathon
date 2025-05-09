var segundos, minutos, horas, fontes
const strTempo = document.getElementById("tempo")
const botao = document.getElementById("botaoTempo")
const numNotas = 46
// intervalo pra diminuir o tempo do timer e tocar uma nota.
var intSegundos = setInterval(diminui, 1000)
// intervalo pra chamar a API do timer
var intApi = setInterval(() => {
    fetch("https://subathon-api.justdavi.dev/api/time-left")
        .then(response => response.json())
        .then(data => tempo(data.timeLeft))}, 20000
)

// carrega os presets quando a página carregar
document.addEventListener("DOMContentLoaded", () => loadPreset())

// função para carregar os presets, sendo os audios e as linhas p/ notas subirem
function loadPreset() {
    criaNotas()
    criaLinhas()
}

// função p/ armazenar as fontes engraçadas em uma variável
function carregaFontes(json) {
    fontes = json
}

function checkInicial(dadosApi) {
    if (!isNaN(dadosApi) && dadosApi > 0) {
        trocaFonte()
        tempo(dadosApi)
        }
    else{
        clearInterval(intSegundos)
        clearInterval(intApi)
        strTempo.innerText = "A Subathon acabou! Até mais Meiaum o/"
        strTempo.style.textAlign = "center"
        botao.remove()
    }
}

// função p/ colocar o tempo da subathon quando carregar o site
function tempo(milisegundos) {
    segundos = Math.floor((milisegundos / 1000) % 60),
    minutos = Math.floor((milisegundos / (1000 * 60)) % 60),
    horas = Math.floor((milisegundos / (1000 * 60 * 60)));

    strTempo.innerText = ((horas < 10 ? "0" + horas : horas) + ":" + (minutos < 10 ? "0" + minutos : minutos) + ":" + (segundos < 10 ? "0" + segundos : segundos));
}

// função que cria todas as notas dentro da "caixa de música", colocando ID em cada uma delas p/ poderem ser chamadas depois
// podia ser só um queryselector pra chamar mas pensei assim primeiro entao ficou assim :thumbs_up:
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

// função que cria as "linhas" onde as notas vão subir. novamente adiciona ID com número p/ usar a mesma lógica das notas
function criaLinhas() {
    const linhas = document.getElementById("linhas")
    for (let i = 0; i < numNotas; i++) {
        const linha = document.createElement("span")
        linha.classList.add("linha")
        linha.id = "linha" + i
        linhas.appendChild(linha)
    }
}

// função que cria cada ponto que simboliza uma nota. ele tem a animação atribuída direto na classe no css, quando ela acaba a nota viaja pra smtown
function criaPonto(num) {
    const linha = document.getElementById("linha" + num)
    const ponto = document.createElement("span")
    ponto.classList.add("ponto")
    ponto.addEventListener("animationend", () => {
        ponto.remove()
    })
    linha.appendChild(ponto)
}

// função pra diminuir o tempo pra não sobrecarregar a API do davi tmj man satisfação
function diminui() {
    if (segundos <= 0 && minutos <= 0 && horas <= 0) {
        clearInterval(intSegundos)
        clearInterval(intApi)
        strTempo.innerText = "A Subathon acabou! Até mais Meiaum o/"
        strTempo.style.textAlign = "center"
        strTempo.fontFamily = fontes[16]
        botao.remove()
        
    }
    else{
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
        strTempo.innerText = ((horas < 10 ? "0" + horas : horas) + ":" + (minutos < 10 ? "0" + minutos : minutos) + ":" + (segundos < 10 ? "0" + segundos : segundos));
        // chance de tocar duas notas ao mesmo tempo. 
        const zerinhoouum = Math.random()
        zerinhoouum < .75 ? tocaNota() :  (tocaNota(), tocaNota())
    }
    
}

// botão só pra interação com o site, pra caso esteja mutado automático pelo navegador
botao.addEventListener("click", () => desmuta())

// função pro botão sumir. só isso.
function desmuta() {
    botao.innerText = "👍"
    botao.classList = ("some")
}

// função que toca uma nota aleatória e chama pra mudar a fonte. reinicia o tempo do áudio pra 0 pra caso venha 2 vezes seguidas. 
function tocaNota() {
    var nota = Math.floor(numNotas * Math.random())
    nota > 0 ? (document.getElementById(nota).currentTime = 0, document.getElementById(nota).play(), criaPonto(nota)) : null
    try {
        trocaFonte()
    } catch (error) {
        null
    }
}

// função pra trocar pra uma fonte aleatória. separada da de nota pra não ficar necessariamente uma fonte atribuída pra cada nota
function trocaFonte() {
    let fonte = Math.floor(numNotas * Math.random())
    strTempo.style.fontFamily = fontes[Math.abs(fonte - 1)] 
}

// fetch inicial p/ colocar o timer na tela
fetch("https://subathon-api.justdavi.dev/api/time-left")
.then(response => response.json())
.then(data => checkInicial(data.timeLeft))

// fetch das fontes p/ armazenar na variável
fetch("./fontes.json")
.then(response => response.json())
.then(data => carregaFontes(data)
)
