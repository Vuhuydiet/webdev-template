

class UserAccountModel {
  constructor() {

  }
  
  createUser = async (username, password, role, fullname) => {
    const { rows } = await pool.query(
      'SELECT * FROM create_user($1, $2, $3, $4)',
      [username, password, role, fullname],
    );
    return rows[0].create_user;
  }
  
  getUserById = async (id) => {
    const { rows } = await pool.query(
      'SELECT * FROM get_user_by_id($1)', [
      id,
    ]);
    return rows[0];
  }
  
  getUserByUsername = async (username) => {
    const { rows } = await pool.query(
      'SELECT * FROM get_user_by_username($1)',
      [username],
    );
    return rows[0];
  }
  
  getAllUsers = async () => {
    const { rows } = await pool.query('SELECT * FROM get_all_users()');
    return rows;
  }
}