import { useTheme } from '@mui/material'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/HighlightOff'
import normalisePositionNaming from './api/normaliseNaming'

export default function FootbalPlayerAvatar({
  position,
  player,
  emblem,
  onClick,
  onClear
}) { 
  const theme = useTheme()

  return (
    <Stack
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 50
      }}
    >
      {player && (
        <Tooltip
          arrow
          title="Clear position"
          placement="right"
        >
          {normalisePositionNaming(position) === player.position
            ? (
              <IconButton
                aria-label="clear"
                size="small"
                onClick={onClear}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
            ) : (
              <Stack 
                direction="row"
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography 
                  variant="caption"
                  sx={{ 
                    color: theme.palette.error.main
                  }}
                >
                  Invalid Position
                </Typography>
                <IconButton
                  aria-label="clear"
                  size="small"
                  onClick={onClear}
                  sx={{ 
                    color: theme.palette.error.main
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
              </Stack>
            )}
        </Tooltip>
      )}
      <IconButton onClick={onClick}>
        {emblem && player
          ? (<Avatar src={emblem} />)
          : (
            <Tooltip title={`Add a ${position}`} arrow>
              <Avatar>
                <AddIcon />
              </Avatar>
            </Tooltip>)}
      </IconButton>
      <Typography
        variant="body1"
        component="div"
        sx={{
          textAlign: 'center'
        }}
      >
        {player?.name ?? ' '}
      </Typography>
    </Stack>
  )
}
