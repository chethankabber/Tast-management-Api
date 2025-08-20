
import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({ name });
    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCategory = async (req, res) => {
   const { id } = req.params;
    const { name } = req.body;
  
    try {
      const updatedCat = await Task.findByIdAndUpdate(
        id,
        {name}
      );
  
      if (!updatedTask) {
        return res.status(404).json({ error: "name not found" });
      }
  
      res.status(200).json(updatedCat);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCat = await Task.findByIdAndDelete(id);

    if (!deletedCat) {
      return res.status(404).json({ error: "category not found" });
    }

    res.status(200).json({ message: "deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};