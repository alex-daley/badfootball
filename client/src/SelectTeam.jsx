import UtilSelect from './UtilSelect'

export default function SelectTeam({ 
  teams, 
  teamSelected,
  onChange
}) {
  const teamNames = teams.map(team => team.name)

  function handleTeamSelect(teamName) {
    const teamSelected = teams.find(team => team.name === teamName)
    onChange(teamSelected)
  }

  return (
    <UtilSelect
      label="team" 
      value={teamSelected.name} 
      values={teamNames} 
      onChange={handleTeamSelect} 
    />
  )
}
