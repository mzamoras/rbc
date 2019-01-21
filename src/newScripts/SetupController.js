import path from 'path';

export default class SetupController {

    constructor(){
        this._rootPath = null;
    }

    get rootPath(){
        if( this._rootPath ) return this._rootPath;
        this._rootPath = path.resolve(__dirname, '../..');
        return this._rootPath;
    }

    get hostPath(){

    }

    get setUpIsDone(){
        return false;
    }
}