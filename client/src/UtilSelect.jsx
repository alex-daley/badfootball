import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

function upperCaseFirstCharacter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default function UtilSelect({ value, values, onChange, label }) {
  const labelId = `${label}-select-helper-label`
  const selectId = `${label}-select-helper`

  const handleChange = e => {
    onChange?.(e.target.value)
  }

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>
        {upperCaseFirstCharacter(label)}
      </InputLabel>
      <Select
        size="small"
        variant="outlined"
        labelId={labelId}
        id={selectId}
        label={label}
        value={value}
        onChange={handleChange}
      >
        {values.map(value => {
          return (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
