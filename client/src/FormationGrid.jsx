import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import FootballPlayerAvatar from './FootballPlayerAvatar'

const MAX_GRID_BREAKPOINT = 12

export default function FormationGrid({
  formation,
  startingXI,
  teamEmblem,
  onClick,
  onClear
}) {
  // If we're running on a device with a narrow screen, we need to specify an absolute grid height.
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const rows = []

  let playerIndex = 0

  for (const [position, numPlayers] of formation.layout) {
    for (let rowIndex = 0; rowIndex < numPlayers; rowIndex++) {
        playerIndex++

        const idx = playerIndex

        const width = MAX_GRID_BREAKPOINT / numPlayers
        rows.push(
          <Grid 
            item
            xs={width}
            key={`row-${playerIndex}`}
          >
            <Box 
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <FootballPlayerAvatar
                position={position}
                player={startingXI[idx]}
                emblem={teamEmblem}
                onClick={event => onClick(event, idx)}
                onClear={() => onClear(idx)}
              />
            </Box>
          </Grid>
        )
    }
  }

  return (
    <Grid 
      container
      sx={{
        height: isMobile ? '500px' : '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {rows}
    </Grid>
  )
}
