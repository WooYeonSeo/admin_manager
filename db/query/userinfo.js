
const userinfo ={
    SELECT_USER_ID_CNT : `select count(0) as cnt from userinfo where user_id = ?`,
    SELECT_USER_INFO : `select user_id, user_name, birth, gender, phone email from userinfo where user_id = ?`,
    SELECT_USER_ACCOUNT : `select count(0) as cnt from userinfo where user_id = ? and password = ?`,
    INSERT_USER_INFO : `insert into userinfo(user_id, user_name, password, birth, gender, email, phone) values (?,?,?,?,?,?,?)`,
    INSERT_USER_TAGS : `insert into interest_list(user_id, interest) values (?,?)`,
    SELECT_USER_LIST : `select user_id, user_name, birth, gender, email, phone from userinfo order by user_name asc limit ? offset ?`,
    UPDATE_USER_AUTH_TYPE : `update userinfo set admin = ? where user_id = ?`,
}

module.exports = {userinfo}; 