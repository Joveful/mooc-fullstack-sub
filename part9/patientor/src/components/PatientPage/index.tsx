import { useParams } from "react-router-dom";
import { Entry, Patient } from "../../types";
import patientService from "../../services/patients";
//import diagnosisService from "../../services/diagnoses";
import { useEffect, useState } from "react";

import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HospitalEntry = ({ entry }: { entry: Entry }) => {
  console.log(entry);
  return (
    <div><p>
      hospital{entry.date} <LocalHospitalIcon /><br />
      <i>{entry.description}</i><br />
      diagnosed by: {entry.specialist}
    </p></div>
  );
};

const OccupationalHealthcareEntry = ({ entry }: { entry: Entry }) => {
  console.log(entry);
  return (
    <div><p>
      occupation{entry.date} <WorkIcon /><br />
      <i>{entry.description}</i><br />
      diagnosed by: {entry.specialist}
    </p></div>
  );
};

const HealthCheckEntry = ({ entry }: { entry: Entry }) => {
  console.log(entry);
  return (
    <div><p>
      health{entry.date} <MedicalServicesIcon /><br />
      <i>{entry.description}</i><br />
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
      return <HospitalEntry entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} />;
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

  //console.log(patient?.entries[0]);

  return (
    <div>
      <h2>{patient?.name}</h2>
      gender: {patient?.gender}<br />
      ssn: {patient?.ssn}<br />
      occupation: {patient?.occupation}
      <h3>entries</h3>
      {patient?.entries?.map((e: Entry) =>
        <div key={e.id}>
          {EntryDetails({ entry: e })}
        </div>)}
    </div>
  );
};

export default PatientPage;
