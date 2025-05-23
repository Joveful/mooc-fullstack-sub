import { useParams } from "react-router-dom";
import { Entry, Patient, Diagnosis } from "../../types";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import { useEffect, useState } from "react";

const PatientPage = () => {
  const id = String(useParams().id);
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      const p = await patientService.getPatientById(id);
      setPatient(p);

      const d = await diagnosisService.getAll();
      setDiagnoses(d);
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
          {e.date} <i>{e.description}</i>
          <ul>
            {e.diagnosisCodes?.map((c: string) =>
              <li key={c}>{c} {diagnoses?.find((d) => d.code === c)?.name}</li>)}
          </ul>
        </div>)}
    </div>
  );
};

export default PatientPage;
