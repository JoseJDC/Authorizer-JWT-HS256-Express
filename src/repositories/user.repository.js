import pool from "../config/db.js";

const createUser = async ({ username, password }) => {
  const query = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [username, password];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const findUserByUsername = async (username) => {
  let user = {};

  const queryUser = "SELECT * FROM users WHERE username = $1;";
  const values = [username];
  const usersResult = await pool.query(queryUser, values);

  if (usersResult.rows.length > 0) {
    user = usersResult.rows[0];
  }

  const queryRoles = `SELECT r.* FROM roles r JOIN users_roles ur ON r.id = ur.role_id WHERE ur.user_id = $1;`;
  const rolesResult = await pool.query(queryRoles, [user.id]);

  if (rolesResult.rows.length > 0) {
    console.log("rolesResult", rolesResult.rows);
    user.roles = rolesResult.rows.map((role) => {
      if (!role.name.startsWith("ROLE_")) {
        role.name = `ROLE_${role.name}`;
      }
      return role.name;
    });
  }

  const queryPermissions = `SELECT p.* FROM permissions p 
  JOIN roles_permissions rp ON p.id = rp.permission_id 
  JOIN roles r ON rp.role_id = r.id
  JOIN users_roles ur ON r.id = ur.role_id
  WHERE ur.user_id = $1;`;
  const permissionsResult = await pool.query(queryPermissions, [user.id]);

  if (permissionsResult.rows.length > 0) {
    console.log("permissionsResult", permissionsResult.rows);
    user.roles = [
      ...user.roles,
      ...permissionsResult.rows.map((perm) => perm.name),
    ];
  }

  return user;
};

export default { createUser, findUserByUsername };
