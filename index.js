const { createServer } = require('http')
const { readFileSync } = require('fs')

function log(msg) {
    console.log(msg)
}

const pre = readFileSync('./chunks/pre.html', 'utf-8')
const post = readFileSync('./chunks/post.html', 'utf-8')

function startServer(port) {
    const server = createServer(function(req, res) {
        if (req.url === '/favicon.ico') {
            res.end('');
            return
        }

        log(`${new Date().toISOString()} ${req.method} ${req.url}`)
        res.setHeader('Content-Type', 'text/html');

        // отдаем шапку почти сразу
        setTimeout(()=> {
            log('send pre chunk after 60ms')
            res.write(pre);

        }, 60)

        // опросили все подысточники: рекламу и прочие рекомендации
        setTimeout(function() {
            log('send post chunk after 1000ms')
            res.end(post)
        }, 1000)        
    })
    .listen(port)

    log(`server started at port ${port}`)
}

startServer(9000)