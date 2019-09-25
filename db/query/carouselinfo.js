
const carouselinfo ={
    INSERT_MAIN_CAROUSEL_CONTENT : `insert into main_carousel(file_seq,title,head,body,link,register,reg_dtm,group_id) values (?,?,?,?,?,?,?,?)`,
    INSERT_MAIN_CAROUSEL_IMG : `insert into attatched_files(dir,filename,extension,register,reg_dtm,size) values (?,?,?,?,?,?)`,
    SELECT_FILE_ID : `select file_seq from attatched_files where dir = ?`,
}

module.exports = {carouselinfo}; 