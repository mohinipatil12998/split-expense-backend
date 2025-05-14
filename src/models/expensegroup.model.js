import { getConnection } from "../config/db.js";

const createExpenseGroup = async (groupName, members, userId) => {
  const connection = await getConnection();
  const [group] = await connection.execute(
    "INSERT INTO expense_group (name, created_by_user_id, created_date) VALUES (?, ?, ? )",
    [groupName, userId, new Date()]
  );

  const groupId = group.insertId;
  const [result] = await connection.execute(
    "INSERT INTO expense_group_users (user_id, group_id, joined_date) VALUES (?, ?, ?)",
    [userId, groupId, new Date()]
  );
  return getExpenseGroupById(result.insertId);
};

/**
 * `group_user_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  `joined_date`
 */
/**
 * 
 * `group_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
 /* `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by_user_id`} id 
 * @returns 
 */

const getExpenseGroupById = async (id) => {
  const connection = await getConnection();
  const [expenses] = await connection.execute(
    "SELECT * FROM expense_group WHERE created_by_user_id  = ?",
    [id]
  );
  return expenses;
};

const getExpenseGroupByUser = async (userId) => {
  const connection = await getConnection();
  const [expenses] = await connection.execute(
    "SELECT * FROM expense_group WHERE user_id = ? ORDER BY date DESC",
    [userId]
  );
  return expenses;
};
const getGroupUsersWithDetails = async (userId) => {
   const connection = await getConnection();
  const [rows] = await connection.execute(`
    SELECT 
      eg.group_id,
      eg.name AS group_name,
      u.user_id,
      u.name AS user_name,
      u.email,
      egu.joined_date
    FROM 
      expense_group_users egu
    JOIN 
      expense_group eg ON eg.group_id = egu.group_id
    JOIN 
      users u ON u.user_id = egu.user_id
    WHERE 
      u.user_id = ?
  `, [userId]);

  return rows;
};

const getExpenseGroupUsersByGroupId = async (groupId) => {
  const connection = await getConnection();
  const [users] = await connection.execute(
    `SELECT 
      egu.group_user_id,
      egu.group_id,
      u.user_id,
      u.name AS user_name,
      u.email
    FROM 
      expense_group_users AS egu
    JOIN 
      expense_group AS eg ON egu.group_id = eg.group_id
    JOIN 
      users AS u ON egu.user_id = u.user_id
    WHERE 
      egu.group_id = ?;`,
    [groupId]
  );
  return users;
};

const updateExpenseGroup = async (
  id,
  userId,
  description,
  amount,
  category
) => {
  const connection = await getConnection();
  await connection.execute(
    "UPDATE expenses SET description = ?, amount = ?, category = ? WHERE id = ? AND userId = ?",
    [description, amount, category, id, userId]
  );
  return getExpenseGroupById(id);
};

const deleteExpenseGroup = async (id, userId) => {
  const connection = await getConnection();
  await connection.execute("DELETE FROM expenses WHERE id = ? AND userId = ?", [
    id,
    userId,
  ]);
};

const addUserIntoExpenseGroup = async (userId, groupId) => {
  const connection = await getConnection();

  const [rows] = await connection.execute(
    "SELECT 1 FROM expense_group_users WHERE user_id = ? AND group_id = ? LIMIT 1",
    [userId, groupId]
  );

  if (rows.length > 0) {
    throw new Error("User already in group.");
  }

  const [result] = await connection.execute(
    "INSERT INTO expense_group_users (user_id, group_id) VALUES (?, ?)",
    [userId, groupId]
  );
  return getExpenseGroupById(result.insertId);
};

export {
  createExpenseGroup,
  getExpenseGroupById,
  getExpenseGroupByUser,
  updateExpenseGroup,
  deleteExpenseGroup,
  addUserIntoExpenseGroup,
  getExpenseGroupUsersByGroupId,
  getGroupUsersWithDetails,
};
