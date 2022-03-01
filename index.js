const fs = require('fs')
const http = require('http')
const url = require('url')

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

let server = http.createServer((req, res) => {
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview') {
        res.end('this is the overview')
    }
    else if (pathName === '/product') {
        res.end('this is the product')
    }
    else if (pathName === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(data)
    }
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello world'
        })
        res.end('<h1>page not found</h1>')
    }

})
server.listen(8000, '127.0.0.1', () => {
    console.log('server started')
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//FILES

//blocking or synchronous way
/*let text= fs.readFileSync('./txt/input.txt','utf-8')
console.log(text)

let textout = `this is what we know about the avocado ${text}.\n Created on ${Date.now()}`
fs.writeFileSync('./txt/output.txt',textout);
*/

//non-blocking or assynchronous way
/*fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    if(err) return console.log('ERROR!!!')
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2)
        fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            console.log(data3)
            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
                console.log('data written successfully')
            })
        })
    })
})
console.log('Reading File...')*/