import express from 'express';
import { v1 as uuid } from 'uuid';
import { Response } from 'express';
import patientsData from '../../data/patients';
import { NonSensitivePatients } from '../types';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatients[]>) => {
  const patientsToReturn: NonSensitivePatients[] = patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
  res.send(patientsToReturn);
});

router.post('/', (req, res) => {
  try {

    //const { name, occupation, dateOfBirth, ssn, gender } = req.body;
    const newPatientEntry = toNewPatient(req.body);
    const id = uuid();
    //const patient = { id, name, ssn, dateOfBirth, gender, occupation };
    const patient = {
      id: id,
      ...newPatientEntry
    };

    patientsData.push(patient);
    res.send(patient);
  } catch (error) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + errorMessage;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
