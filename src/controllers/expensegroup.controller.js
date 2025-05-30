import {
  createExpenseGroup,
  deleteExpenseGroup,
  getExpenseGroupById,
  getExpenseGroupByUser,
  updateExpenseGroup,
  getExpenseGroupUsersByGroupId,
  addUserIntoExpenseGroup,
  getGroupUsersWithDetails,
} from "../models/expensegroup.model.js";

const createExpenseGroupHandler = async (req, res) => {
  try {
    const { userId, groupName, members } = req.body;
    console.log(userId, groupName, members);

    const expenseGroup = await createExpenseGroup(groupName, members, userId);
    res.status(201).json(expenseGroup);
  } catch (err) {
    console.error("Error creating expense group:", err);
    res.status(400).json({ message: err });
  }
};

const getExpenseGroupsHandler = async (req, res) => {
  console.log('req.params.user_id', req.params);
  
  try {
    const expenseGroup = await getExpenseGroupById(req.params.user_id);
    res.json(expenseGroup);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getExpenseGroupUserHandler = async (req, res) => {
  try {
    const expenseGroupUsers = await getExpenseGroupUsersByGroupId(req.params.group_id);
    res.json(expenseGroupUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const getGroupUsersWithDetailsHanlder = async (req,res)=>{
  try {
     const r = await getGroupUsersWithDetails(req.params.user_id);
      res.json(r);
  } catch (error) {
     res.status(500).json({ message: error.message });
  }
}




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

const addIntoExpenseGroupHandler = async (req, res) => {
  try {
    const { user_id, group_id } = req.body;
    await addUserIntoExpenseGroup(user_id, group_id);
    res.json({ message: "expenseGroup member add successfully" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export {
  createExpenseGroupHandler,
  getExpenseGroupsHandler,
  updateExpenseGroupHandler,
  deleteExpenseGroupHandler,
  getExpenseGroupUserHandler,
  addIntoExpenseGroupHandler,
  getGroupUsersWithDetailsHanlder
};
