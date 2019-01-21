
import path from 'path';

export function rootPath(){
    return path.resolve(__dirname, '../..');
}

export function hostPath(){

}

export function hostNodeModulesPath(){

}

export function rootParentPath(){
    return path.resolve(rootPath(), '../..');
}

export function hostConfigFilePath(){

}