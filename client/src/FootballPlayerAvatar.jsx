import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/HighlightOff'

export default function FootbalPlayerAvatar({
  position,
  player,
  emblem,
  onClick,
  onClear
}) {
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
          <IconButton
            aria-label="clear"
            size="small"
            onClick={onClear}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
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
