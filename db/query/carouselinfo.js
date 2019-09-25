
const carouselinfo ={
    SELECT_FILES : `select count(0) as cnt from userinfo where user_id = ?`,
    INSERT_MAIN_CAROUSEL_IMG : `insert into attatched_files(dir,filename,extension,register,reg_dtm,size) values (?,?,?,?,?,?)`,
    SELECT_FILE_ID : `select file_seq from attatched_files where dir = ?`,
}

module.exports = {carouselinfo}; 