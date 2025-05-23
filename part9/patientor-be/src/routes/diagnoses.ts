import express, { Response } from 'express';
import diagnosisData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnosisData);
});

export default router;
