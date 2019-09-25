const util ={
    enterParser(str){
        str =  str.trim();
        return str.replace(/(?:\r\n|\r|\n)/g, '<br/>');
    }
}
module.exports =  {
    util
}