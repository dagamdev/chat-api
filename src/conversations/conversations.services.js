const conversationsControllers = require("./conversations.controller");

const getAllConversations = (req, res) => {
  conversationsControllers
    .getAllConversations()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json({ message: err.message }));
};

const getConversationById = (req, res) => {
  const id = req.params.id;
  conversationsControllers
    .getConversationById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(404).json({ message: err.message }));
};

const createConversation = (req, res) => {
  const userId = req.user.id;
  const { title, imageUrl } = req.body;
  if (title && imageUrl) {
    conversationsControllers
      .postConversation({
        title,
        imageUrl,
        userId,
      })
      .then((data) => res.status(201).json(data))
      .catch((err) => res.status(400).json(err.message));
  } else {
    res.status(400).json({
      message: "Missing Data",
      fields: {
        title: "string",
        imgUrl: "string",
      },
    });
  }
};

const patchConversation = (req, res) => {
  const id = req.params.id;
  const { title, imageUrl } = req.body;
  conversationsControllers
    .updateConversation(id, { title, imageUrl })
    .then((data) => {
      if (data[0]) {
        res
          .status(200)
          .json({ message: `User with ID: ${id}, edited succesfully!` });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const deleteConversation = (req, res) => {
  const id = req.params.id;
  conversationsControllers
    .deleteConversation(id)
    .then((data) => {
      if (data) {
        res.status(204).json();
      } else {
        res.status(404).json({ message: "Invalid ID" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

module.exports = {
  getAllConversations,
  createConversation,
  getConversationById,
  patchConversation,
  deleteConversation,
};
