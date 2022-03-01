const fs = require('fs')
const http = require('http')
const path = require('path/posix')
const url = require('url')

const replaceTemplate = require('./modules/replaceTemplate')

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//SERVER



//reading file only once(sychronously)
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

//reading and parsing json data
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

let server = http.createServer((req, res) => {
    //const pathName = req.url;

    const { query, pathname } = url.parse(req.url, true)
    //FOR OVERVIEW
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        //loop
        const cardshtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardshtml)
        res.end(output)
        // console.log(output)
        //console.log(cardshtml)
        //res.end(tempOverview)
    }
    //FOR PRODUCT
    else if (pathname === '/product') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        const product = dataObj[query.id]
        const output = replaceTemplate(tempProduct, product)
        res.end(output)
    }
    //FOR API
    else if (pathname === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(data)
    }
    //PAGE NOT FOUND
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello world'
        })
        res.end('<h1>page not found</h1>')
    }

})

//server listening
server.listen(8000, '127.0.0.1', () => {
    console.log('server started')
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//FILES practice

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