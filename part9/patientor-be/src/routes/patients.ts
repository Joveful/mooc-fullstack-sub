import express, { Request, Response, NextFunction } from 'express';
import { v1 as uuid } from 'uuid';
import { z } from 'zod';
import patientsData from '../../data/patients';
import { NewPatientEntry, NonSensitivePatients, Patient } from '../types';
import { NewPatientSchema } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatients[]>) => {
  const patientsToReturn: NonSensitivePatients[] = patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
  res.send(patientsToReturn);
});

router.get('/:id', (req, res: Response<Patient>) => {
  const id = req.params.id;
  const patientToReturn = patientsData.find((p) => String(p.id) === id);
  res.send(patientToReturn);
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
  const id = uuid();
  const patient = {
    id: id,
    entries: [],
    ...(req.body)
  };

  patientsData.push(patient);
  res.send(patient);
});

router.use(errorMiddleware);

export default router;
