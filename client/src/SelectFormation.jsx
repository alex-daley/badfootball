import UtilSelect from './UtilSelect'

export default function SelectFormation({ 
  formationSelected,
  formations,
  onChange
}) {
  const formationNames = formations.map(formation => formation.name)

  function handleFormationSelect(formationName) {
    const formationSelected = formations.find(formation => formation.name === formationName)
    onChange(formationSelected)
  }

  return (
    <UtilSelect
      label="formation" 
      value={formationSelected.name} 
      values={formationNames} 
      onChange={handleFormationSelect} 
    />
  )
}
