const path =require('path');
const rootPath = require('../util/path');
const fs = require('fs');

const getProductFromFile = cb =>{
    const p = path.join(rootPath , 'data', 'product.json');
        fs.readFile(p , (err,data)=>{
            if(err){
                cb([]);
            }else{
                cb(JSON.parse(data));
            }
        })
}

module.exports = class Product{
    constructor(title){
        this.title = title ;
    }

    save(){
        getProductFromFile((products)=>{
            products.push(this);
            const p = path.join(rootPath , 'data', 'product.json');
            fs.writeFile(p , JSON.stringify(products) , (err)=>{
                console.log(err);
            })
        })
    }

    static fetchAll(cb){
        getProductFromFile(cb);
    }
}

