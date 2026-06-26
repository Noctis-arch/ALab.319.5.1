import express from "express";
import Grade from "../models/Grade.js";

const router = express.Router();

// Create a single grade entry
router.post("/", async (req, res) => {
  try {
    let newDocument = req.body;

    // Backwards compatibility
    if (newDocument.student_id) {
      newDocument.learner_id = newDocument.student_id;
      delete newDocument.student_id;
    }

    const result = await Grade.create(newDocument);

    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get a single grade entry
router.get("/:id", async (req, res) => {
  try {
    const result = await Grade.findById(req.params.id);

    if (!result) {
      return res.status(404).send("Not found");
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add a score
router.patch("/:id/add", async (req, res) => {
  try {
    const result = await Grade.findByIdAndUpdate(
      req.params.id,
      {
        $push: { scores: req.body }
      },
      { new: true }
    );

    if (!result) {
      return res.status(404).send("Not found");
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Remove a score
router.patch("/:id/remove", async (req, res) => {
  try {
    const result = await Grade.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { scores: req.body }
      },
      { new: true }
    );

    if (!result) {
      return res.status(404).send("Not found");
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete one grade entry
router.delete("/:id", async (req, res) => {
  try {
    const result = await Grade.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).send("Not found");
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Backwards compatibility
router.get("/student/:id", (req, res) => {
  res.redirect(`/grades/learner/${req.params.id}`);
});

// Get learner grades
router.get("/learner/:id", async (req, res) => {
  try {
    const query = {
      learner_id: Number(req.params.id)
    };

    if (req.query.class) {
      query.class_id = Number(req.query.class);
    }

    const result = await Grade.find(query);

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete learner grades
router.delete("/learner/:id", async (req, res) => {
  try {
    const result = await Grade.deleteMany({
      learner_id: Number(req.params.id)
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get class grades
router.get("/class/:id", async (req, res) => {
  try {
    const query = {
      class_id: Number(req.params.id)
    };

    if (req.query.learner) {
      query.learner_id = Number(req.query.learner);
    }

    const result = await Grade.find(query);

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update class id
router.patch("/class/:id", async (req, res) => {
  try {
    const result = await Grade.updateMany(
      {
        class_id: Number(req.params.id)
      },
      {
        $set: {
          class_id: req.body.class_id
        }
      }
    );

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete class
router.delete("/class/:id", async (req, res) => {
  try {
    const result = await Grade.deleteMany({
      class_id: Number(req.params.id)
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;