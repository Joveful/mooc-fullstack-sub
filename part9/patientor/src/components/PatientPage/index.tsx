import { useParams } from "react-router-dom";
import { Entry, Patient } from "../../types";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";

const PatientPage = () => {
  const id = String(useParams().id);
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      const p = await patientService.getPatientById(id);
      setPatient(p);
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
            {e.diagnosisCodes?.map((c: string) => <li key={c}>{c}</li>)}
          </ul>
        </div>)}
    </div>
  );
};

export default PatientPage;
