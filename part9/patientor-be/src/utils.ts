import { Gender, NewPatientEntry } from "./types";
import { z } from 'zod';

export const NewPatientSchema = z.object({
  name: z.string(),
  ssn: z.string().optional(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  dateOfBirth: z.string().date().optional()
});

export const toNewPatient = (object: unknown): NewPatientEntry => {
  return NewPatientSchema.parse(object);
};
