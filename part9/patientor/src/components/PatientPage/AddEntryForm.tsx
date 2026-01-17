import { TextField, Button, Select, MenuItem, InputLabel, SelectChangeEvent, FormControl } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { Diagnosis, EntryWithoutId } from "../../types";
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
  const [employerName, setEmployerName] = useState<string>('');
  const [sickLeaveStart, setSickLeaveStart] = useState<string>('a');
  const [sickLeaveEnd, setSickLeaveEnd] = useState<string>('');
  const [rating, setRating] = useState<number>(1);
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [criteria, setCriteria] = useState<string>('');

  const [entryType, setEntryType] = useState<string>('HealthCheck');

  useEffect(() => {
    const fetchDiagnosesList = async () => {
      const data = await diagnosesService.getAll();
      setDiagnosis(data);
    };
    void fetchDiagnosesList();
  },[]);

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    switch (entryType) {
      case "HealthCheck":
        onSubmit({
          description,
          date,
          specialist,
          type: "HealthCheck",
          healthCheckRating: rating,
          diagnosisCodes,
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          description,
          date,
          specialist,
          type: "OccupationalHealthcare",
          employerName,
          diagnosisCodes,
          sickLeave: {
            startDate: sickLeaveStart,
            endDate: sickLeaveEnd
          }
        });
        break;
      case "Hospital":
        onSubmit({
          description,
          date,
          specialist,
          type: "Hospital",
          diagnosisCodes,
          discharge: {
            date: dischargeDate,
            criteria: criteria
          }
        });
        break;
    }
  };

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const value = event.target.value;
    setDiagnosisCodes(typeof value === "string" ? value.split(',') : value);
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel id="entry-type-id">Entry type</InputLabel>
        <Select
          labelId="entry-type-id"
          id="entries"
          value={entryType}
          onChange={(e) => setEntryType(e.target.value)}
        >
          <MenuItem value={"HealthCheck"}>Health Check</MenuItem>
          <MenuItem value={"OccupationalHealthcare"}>Occupational Healthcare</MenuItem>
          <MenuItem value={"Hospital"}>Hospital</MenuItem>
        </Select>
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
        {entryType === "HealthCheck" ? <TextField
          label="Healthcheck rating"
          fullWidth
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        /> : null}

        {entryType === "OccupationalHealthcare" ? 
        <>
        <TextField
          label="Employer name"
          fullWidth
          value={employerName}
          onChange={(e) => setEmployerName(e.target.value)}
        />
        <InputLabel>Sick leave</InputLabel>
        <TextField
          label="start"
          type="date"
          value={sickLeaveStart}
          onChange={(e) => setSickLeaveStart(e.target.value)}
        />
        <TextField
          label="end"
          type="date"
          value={sickLeaveEnd}
          onChange={(e) => setSickLeaveEnd(e.target.value)}
        /> 
        </> : null}
        
        {entryType === "Hospital" ?
        <>
        <TextField
          label="Discharge date"
          type="date"
          value={dischargeDate}
          onChange={(e) => setDischargeDate(e.target.value)}
        />
        <TextField
          label="Criteria"
          value={criteria}
          onChange={(e) => setCriteria(e.target.value)}
        />
        </> : null}
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