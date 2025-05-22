import { useParams } from "react-router-dom";
import { Patient } from "../../types";

const PatientPage = ({ patients }: { patients: Patient[] }) => {
  const id = useParams().id;
  const patient = patients.find((p) => p.id === id);

  return (
    <div>
      <h2>{patient?.name}</h2>
      gender: {patient?.gender}<br />
      ssn: {patient?.ssn}<br />
      occupation: {patient?.occupation}
    </div>
  );
};

export default PatientPage;
