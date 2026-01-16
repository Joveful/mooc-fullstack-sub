import { TextField, Button, Select, MenuItem, InputLabel, OutlinedInput, SelectChangeEvent, FormControl } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { Diagnosis, EntryWithoutId, HealthCheckRating } from "../../types";
import diagnosesService from "../../services/diagnoses";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
}

const AddEntryForm = ({ onSubmit }: Props) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosis, setDiagnosis] = useState<Array<Diagnosis>>([]);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(1);

  //const [entryType, setEntryType] = useState<string>('');

  useEffect(() => {
    const fetchDiagnosesList = async () => {
      const data = await diagnosesService.getAll();
      setDiagnosis(data);
    };
    void fetchDiagnosesList();
  },[]);

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

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const value = event.target.value;
    setDiagnosisCodes(typeof value === "string" ? value.split(',') : value);
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
        <FormControl fullWidth>
          <InputLabel id="diag-select-id">Diagnoses</InputLabel> 
          <Select
            labelId="diag-select-id"
            id="diagnoses"
            multiple
            value={diagnosisCodes}
            onChange={handleChange}
          >
            {diagnosis.map(d => (
              <MenuItem
                key={d['code']}
                value={d['code']}
              >{d['code']}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained">Add</Button>
      </form>
    </div>
  );
};

export default AddEntryForm;
