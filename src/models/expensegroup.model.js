import { getConnection } from "../config/db.js";

const createExpenseGroup = async (groupName, userId, createdDate, category) => {
  const connection = await getConnection();
  const [group] = await connection.execute(
    "INSERT INTO expensegroup (name, created_by_user_id, created_date) VALUES (?, ?, ?, ?)",
    [groupName, userId, createdDate]
  );
  
console.log("GROUP",group);
  const [result] = await connection.execute(
    "INSERT INTO expenses (user_id, description, amount, category) VALUES (?, ?, ?, ?)",
    [userId, groupName, 0, category]
  );

  // Add user to the group
  // const JoinedDate = new Date();
//   const [groupUser] = await connection.execute(
//     "INSERT INTO expensegroup (user_id, group_id, joinedDate) VALUES (?, ?, ?, ?)",
//     [groupName, userId, JoinedDate]
//   );

//   return getExpenseById(result.insertId);
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
    "SELECT * FROM expenses WHERE id = ?",
    [id]
  );
  return expenses[0];
};

const getExpenseGroupByUser = async (userId) => {
  const connection = await getConnection();
  const [expenses] = await connection.execute(
    "SELECT * FROM expenses WHERE userId = ? ORDER BY date DESC",
    [userId]
  );
  return expenses;
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
  const [result] = await connection.execute(
    "INSERT INTO expense_group_users (user_id, group_id) VALUES (?, ?)",
    [userId, groupId]
  );
  return getExpenseGroupById(result.insertId);
}

export {
  createExpenseGroup,
  getExpenseGroupById,
  getExpenseGroupByUser,
  updateExpenseGroup,
  deleteExpenseGroup,
  addUserIntoExpenseGroup
};
