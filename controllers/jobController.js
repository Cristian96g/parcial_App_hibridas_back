import Job from '../models/jobModel.js';

const createJob = async (req, res) => {
  try {
    const { title, content, imageUrl, location, phone, email } = req.body;

    const newJob = new Job({
      title,
      content,
      imageUrl,
      location,
      phone,
      email
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getJobs = async (req, res) => {
  try {
    const job = await Job.find();
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const { title, content, imageUrl, location, phone, email } = req.body;

    // Asegúrate de que imageUrl sea válido y no esté vacío
    if (typeof imageUrl !== 'string' || !imageUrl.startsWith('http')) {
      return res.status(400).json({ message: 'Invalid image URL' });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { title, content, imageUrl, location, phone, email },
      { new: true }
    );

    if (!updatedJob) return res.status(404).json({ message: 'Job not found' });
    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createJob, getJobs, getJobById, updateJob, deleteJob };
