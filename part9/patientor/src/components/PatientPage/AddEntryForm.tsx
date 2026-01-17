import { TextField, Button, Select, MenuItem, InputLabel, SelectChangeEvent, FormControl, Grid } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { Diagnosis, EntryWithoutId } from "../../types";
import diagnosesService from "../../services/diagnoses";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  setShow: (show: boolean) => void;
}

const AddEntryForm = ({ onSubmit, setShow }: Props) => {
  const [entryType, setEntryType] = useState<string>('HealthCheck');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('a');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosis, setDiagnosis] = useState<Array<Diagnosis>>([]);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [employerName, setEmployerName] = useState<string>('');
  const [sickLeaveStart, setSickLeaveStart] = useState<string>('a');
  const [sickLeaveEnd, setSickLeaveEnd] = useState<string>('a');
  const [rating, setRating] = useState<number>(0);
  const [dischargeDate, setDischargeDate] = useState<string>('a');
  const [criteria, setCriteria] = useState<string>('');

  useEffect(() => {
    const fetchDiagnosesList = async () => {
      const data = await diagnosesService.getAll();
      setDiagnosis(data);
    };
    void fetchDiagnosesList();
  },[]);

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    // For some reason 'type: entryType' can't be shared through this object
    const shared = {
      description,
      date,
      specialist,
      diagnosisCodes
    };

    switch (entryType) {
      case "HealthCheck":
        onSubmit({
          ...shared,
          type: entryType,
          healthCheckRating: rating,
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          ...shared,
          type: entryType,
          employerName,
          sickLeave: {
            startDate: sickLeaveStart,
            endDate: sickLeaveEnd
          }
        });
        break;
      case "Hospital":
        onSubmit({
          ...shared,
          type: entryType,
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
          type="date"
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
        <FormControl fullWidth >
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

        {entryType === "HealthCheck" ? 
        <>
        <InputLabel id="rating-id">Rating</InputLabel>
        <Select
          labelId="rating-id"
          fullWidth
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}

        >
          <MenuItem value={0}>Healthy</MenuItem>
          <MenuItem value={1}>Low risk</MenuItem>
          <MenuItem value={2}>High risk</MenuItem>
          <MenuItem value={3}>Critical risk</MenuItem>
        </Select>
        </> : null}

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

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              type="button"
              style={{ float: "left" }}
              onClick={()=> setShow(false)}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button 
              type="submit" 
              variant="contained"
              style={{ float: "right" }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;