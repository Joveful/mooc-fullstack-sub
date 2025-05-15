import express from 'express';
import { v1 as uuid } from 'uuid';
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

router.post('/', (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { name, occupation, dateOfBirth, ssn, gender } = req.body;
  const id = uuid();
  const patient = { id, name, ssn, dateOfBirth, gender, occupation };

  patientsData.push(patient);
  res.send(patient);
});

export default router;
