import express from 'express';
import { createJob, getJobs, getJobById, updateJob, deleteJob } from '../controllers/jobController.js';

const jobRoutes = express.Router();

jobRoutes.post('/', createJob);
jobRoutes.get('/', getJobs);
jobRoutes.get('/:id', getJobById);
jobRoutes.put('/:id', updateJob);
jobRoutes.delete('/:id', deleteJob);

export {jobRoutes};