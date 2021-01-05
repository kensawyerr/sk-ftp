const Client = require('ftp');
const randomstring = require("randomstring");
const _ = require("lodash");

class SkFTP {
    constructor(ftpHost, ftpUsername, ftpPassword){
        this.ftpHost = ftpHost;
        this.ftpUser = ftpUsername;
        this.ftpPassword = ftpPassword;
    }

    _init(){
        const c = new Client();
        c.connect({
            host: this.ftpHost, user: this.ftpUser, password: this.ftpPassword
        });
        return c;
    }

    upload(fileObject, remoteLocation = "/"){
        const c = this._init();

        let filename = `${randomstring.generate(5)}${fileObject.name}`;

        return new Promise((resolve, reject)=>{
            c.on('ready', () => {
                c.put(fileObject.data, `${remoteLocation}/${filename}`, (error) => {
                    if (error){
                        resolve({error})
                    }
                    c.end();
                    resolve({uploaded: true, filename})
                });
            });
        });
    }

    delete(fileName, remoteLocation="/"){
        const c = this._init();

        return new Promise((resolve, reject)=>{
            c.on('ready', (error)=>{
                c.delete(`${remoteLocation}/${fileName}`, ()=>{
                    if (error){
                        resolve({error})
                    }
                    resolve({deleted: true})
                })
            });
        });
    }

}

module.exports = SkFTP;