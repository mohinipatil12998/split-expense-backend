import { createExpenseGroup, deleteExpenseGroup, getExpenseGroupByUser, updateExpenseGroup } from '../models/expenseGroup.model.js';

const createExpenseGroupHandler = async (req, res) => {

    res.send("createExpenseGroupHandler");
    
    console.log("createExpenseGroupHandler");
  try {
    const { userId, groupName, members } = req.body;
    console.log(userId, groupName, members);

    const expenseGroup = await createExpenseGroup(
      userId,
      groupName,
      members
    );
    res.status(201).json(expenseGroup);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getExpenseGroupsHandler = async (req, res) => {
  try {
    const expenseGroup = await getExpenseGroupByUser(req.user_id);
    res.json(expenseGroup);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateExpenseGroupHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, category } = req.body;
    const expenseGroup = await updateExpenseGroup(
      id,
      req.user_id,
      description,
      amount,
      category
    );
    res.json(expenseGroup);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteExpenseGroupHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteExpenseGroup(id, req.user.id);
    res.json({ message: "expenseGroup deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export {
  createExpenseGroupHandler,
  getExpenseGroupsHandler,
  updateExpenseGroupHandler,
  deleteExpenseGroupHandler,
};
