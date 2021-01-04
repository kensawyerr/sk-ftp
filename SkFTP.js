const Client = require('ftp');
const fs = require('fs');
const randomstring = require("randomstring");
const config = require("./config");
const _ = require("lodash");

class SkFTP {
    constructor(ftpHost, ftpUsername, ftpPassword){
        this.c = new Client();
        this.c.connect({
            host: ftpHost,
            user: ftpUsername,
            password: ftpPassword
        })
    }

    upload(fileObject, remoteLocation){
        let filename = `${randomstring.generate(5)}${fileObject.name}`;

        return new Promise((resolve, reject)=>{
            this.c.on('ready', () => {
                this.c.put(fileObject.data, `${remoteLocation}/${filename}`, (error) => {
                    if (error){
                        reject({error})
                    }
                    this.c.end();
                    resolve({source: `${config.cdn}/${filename}`})
                });
            });
        });
    }

    delete(file, remoteLocation){
        return new Promise((resolve, reject)=>{
            this.c.on('ready', ()=>{
                this.c.delete(`${remoteLocation}/${file}`, ()=>{
                    resolve({deleted: true})
                })
            });
        });
    }

}

module.exports = SkFTP;