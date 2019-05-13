const WebSocket = require('ws')

const wss = new WebSocket.Server({
    port: 8080
})

wss.conexoes = []

const receberMsg = (message, conexaoAtual) => {
    wss.conexoes.forEach(conexao => {
        if (conexaoAtual !== conexao) {
            conexao.send(message)
        }
    })
}

const desconectado = conexao => {
    let index = wss.conexoes.indexOf(conexao)
    wss.conexoes.splice(index, 1)
}

const conectado = conexao => {
    wss.conexoes.push(conexao)
    conexao.on('message', message => receberMsg(message, conexao))
    conexao.on('close', () => desconectado(conexao))
    conexao.send('cê tá conectado meu rei!')
}

wss.on('connection', conectado)