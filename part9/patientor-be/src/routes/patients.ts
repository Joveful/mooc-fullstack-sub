import express from 'express';
import { Response } from 'express';
import patientsData from '../../data/patients';
import { NonSensitivePatients } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatients[]>) => {
  const patientsToReturn: NonSensitivePatients[] = patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
  res.send(patientsToReturn);
});

export default router;
