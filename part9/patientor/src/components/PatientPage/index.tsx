import { useParams } from "react-router-dom";
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, Patient } from "../../types";
import patientService from "../../services/patients";
//import diagnosisService from "../../services/diagnoses";
import { useEffect, useState } from "react";

import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Button } from '@mui/material';
import AddEntryForm from "./AddEntryForm";

const HospitalEntryComponent = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div><p>
      {entry.date} <LocalHospitalIcon /><br />
      <i>{entry.description}</i><br />
      diagnosed by: {entry.specialist}
    </p></div>
  );
};

const OccupationalHealthcareEntryComponent = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  console.log(entry);
  return (
    <div><p>
      {entry.date} <WorkIcon /><br />
      <i>{entry.description}</i><br />
      {entry.employerName}
      diagnosed by: {entry.specialist}
    </p></div>
  );
};

const HealthCheckEntryComponent = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <div><p>
      {entry.date} <MedicalServicesIcon /><br />
      <i>{entry.description}</i><br />
      {entry.healthCheckRating}<br />
      diagnosed by: {entry.specialist}</p>
    </div>
  );
};

const assertNever = (entry: never): never => {
  throw new Error('Unexpected object: ' + entry);
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryComponent entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryComponent entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntryComponent entry={entry} />;
    default: return assertNever(entry);
  }
};

const PatientPage = () => {
  const id = String(useParams().id);
  const [patient, setPatient] = useState<Patient>();
  //const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      const p = await patientService.getPatientById(id);
      setPatient(p);

      //const d = await diagnosisService.getAll();
      //setDiagnoses(d);
    };
    void fetchPatient(id);
  }, [id]);


  return (
    <div>
      <h2>{patient?.name}</h2>
      gender: {patient?.gender}<br />
      ssn: {patient?.ssn}<br />
      occupation: {patient?.occupation}
      <h3>Add new entry</h3>
      <AddEntryForm />
      <h3>entries</h3>
      {patient?.entries?.map((e: Entry) =>
        <div key={e.id}>
          {EntryDetails({ entry: e })}
        </div>)}
      <Button variant="contained">Add new entry</Button>
    </div>
  );
};

export default PatientPage;
