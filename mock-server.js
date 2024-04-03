const url =require('url')
const fs =require('fs')
const path =require('path')
const express =require('express')

const app = express();

app.use((req, res, next) => {
    //根据请求的url.pathname路径来请求绝对路径下相对应的资源
    const urlPath = url.parse(req.url).pathname || '';
    const __dirname = path.resolve();
    const apiPath = `${path.join(__dirname, './mock', urlPath)}.json`;
    if (fs.existsSync(apiPath)) {
        // console.log(14,apiPath)
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, token, platformid,userId,sid,authorization '
        );
        res.header('Access-Control-Allow-Credentials', 'true');
        res.end(fs.readFileSync(apiPath));
        return;
    }

    return next();
});


app.listen(6001, () => {
    console.log('6001Server已启动');
});
