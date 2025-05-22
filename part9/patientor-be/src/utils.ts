import { EntryType, Gender, HealthCheckRating, NewPatientEntry } from "./types";

import { z } from 'zod';

export const NewEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  type: z.nativeEnum(EntryType),
  diagnosisCodes: z.array(z.string()).optional(),
  discharge: z.object({
    date: z.string(),
    criteria: z.string()
  }).optional(),
  sickLeave: z.object({
    startDate: z.string().date(),
    endDate: z.string().date()
  }).optional(),
  healthCheckRating: z.nativeEnum(HealthCheckRating).optional()
});

export const NewPatientSchema = z.object({
  name: z.string(),
  ssn: z.string().optional(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  dateOfBirth: z.string().date().optional(),
  entries: z.array(NewEntrySchema)
});

export const toNewPatient = (object: unknown): NewPatientEntry => {
  return NewPatientSchema.parse(object);
};
