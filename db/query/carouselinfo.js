
const carouselinfo ={
    INSERT_MAIN_CAROUSEL_CONTENT : `insert into main_carousel(file_seq,title,head,body,link,register,reg_dtm,group_id) values (?,?,?,?,?,?,?,?)`,
    INSERT_MAIN_CAROUSEL_IMG : `insert into attatched_files(dir,filename,extension,register,reg_dtm,size) values (?,?,?,?,?,?)`,
    SELECT_FILE_ID : `select file_seq from attatched_files where dir = ?`,
    SELECT_CAROUSEL_LIST : `select a.file_seq, a.title, a.head, a.body, a.link, b.dir, b.filename
                            from main_carousel a, attatched_files b
                            where a.file_seq = b.file_seq;`,
}

module.exports = {carouselinfo}; 