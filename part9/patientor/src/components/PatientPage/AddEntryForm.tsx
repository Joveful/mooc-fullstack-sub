import { TextField, Button } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { EntryWithoutId, HealthCheckRating } from "../../types";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
}

const AddEntryForm = ({ onSubmit }: Props) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosisCode, setDiagnosisCode] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(1);


  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
      type: "HealthCheck",
      healthCheckRating: rating,
      diagnosisCodes
    });
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Date"
          fullWidth
          placeholder="YYYY-MM-DD"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />
        <TextField
          label="Healthcheck rating"
          fullWidth
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <TextField
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCode}
          onChange={(e) => setDiagnosisCode(e.target.value)}
        />
        <Button variant="contained">Add</Button>
      </form>
    </div>
  );
};

export default AddEntryForm;
