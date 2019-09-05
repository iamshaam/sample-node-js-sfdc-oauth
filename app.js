var http = require('http');
var fs = require('fs');

http.createServer(function(request,response){

var url = request.url;
//alert('url'+url);
switch(url){
    case '/':
            fs.readFile('home.html',function(error,data){
                if(error)
                {
                    response.writeHead(500,{'Content-Type':'text/plain'});
                    response.end('Error Occured'+JSON.stringify(error));
                }
                if(data)
                {
                    response.writeHead(200,{'Content-Type':'text/html'});
                    response.end(data);
                    console.log('html file loaded');
                }
            });
            break;
    case '/public/script.js' :
            fs.readFile('public/script.js',function(error,data){
                if(error)
                {
                    response.writeHead(500,{'Content-Type':'text/plain'});
                    response.end('Error Occured');
                }
                if(data)
                {
                    response.writeHead(200,{'Content-Type':'text/javascript'});
                    response.end(data);
                    console.log('script file loaded');
                }
            });
            break;
    case '/public/stylesheet.css' :        
        fs.readFile('public/stylesheet.css',function(error,data){
            if(error)
            {
                response.writeHead(500,{'Content-Type':'text/plain'});
                response.end('Error Occured');
            }
            if(data)
            {
                response.writeHead(200,{'Content-Type':'text/css'});
                response.end(data);
                console.log('css file loaded');
            }
        });
        break;
    default :
        if(url.startsWith("/callback.html?"))
        {
            fs.readFile('callback.html',function(error,data){
                if(error)
                {
                    response.writeHead(500,{'Content-Type':'text/plain'});
                    response.end('Error Occured');
                }
                if(data)
                {
                    response.writeHead(200,{'Content-Type':'text/html'});
                    response.end(data);
                    console.log('css file loaded');
                }
            });            
        }
        else
        {
            response.writeHead(400,{'Content-Type':'text/plain'});
            response.end('Page Not found'+url);
        }
}    
}).listen(5244);
