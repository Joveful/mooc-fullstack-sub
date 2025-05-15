import express from 'express';
import diagnosisData from '../../data/diagnoses';
//import { Diagnosis } from '../types';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosisData);
});

export default router;
