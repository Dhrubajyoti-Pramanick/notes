import notesSchema from "./schema.js";

export const createNote = async (req, res, next) => {
  try {
    console.log(req.body);
    const { title, content, isImportant } = req.body;
    let createNote = await notesSchema.create({
      title,
      content,
      isImportant
    });

    if (createNote) {
      res.status(200).json({
        success: true,
        message: "Notes created successfully!",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getNotes = async (req, res, next) => {
  try {
    const notes = await notesSchema.find({});
    if (notes) {
      res.status(200).json({
        success: true,
        message: "Notes fetched successfully!",
        data: notes,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { id, title, content } = req.body;
    const note = await notesSchema.findByIdAndUpdate(id, {
      title: title, content: content
    });
    if (note) {
      note.title = title || note.title;
      note.content = content || note.content;
      await note.save();
      res.status(200).json({
        success: true,
        message: "Note Updated successfully!",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async(req, res, next) => {
  try {
    const deleted = await notesSchema.findByIdAndDelete(req.params.id);
    if (deleted) {
      res.status(200).json({
        success: true,
        message: "Note Deleted successfully!",
        deleted
      });``
    }
  } catch (error) {
    next(error);
  }
};
export const getSingleNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await notesSchema.findById(id);

    if (note) {
      res.status(200).json({
        success: true,
        message: "Note fetched successfully!",
        note,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

