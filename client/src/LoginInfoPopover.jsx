import Popover from '@mui/material/Popover'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'

export default function LoginInfoPopover({
  open,
  anchorEl,
  onClose,
  onClick
}) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ m: 2 }}
    >
      <Stack
        spacing={2}
        p={2}
        sx={{ 
          minHeight: 200, 
          maxWidth: 400 
        }}
      >
        <Button
          startIcon={<AccountCircleIcon />}
          variant="outlined"
          onClick={onClick}
        >
          Login or Sign-up
        </Button>
        <Typography
          component="div"
          variant="caption"
        >
          Authentication powered by { }
          <Link
            href="https://auth0.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Auth0
          </Link>.
        </Typography>
        <Divider />
        <Typography component="div">
          An optional free badfootball account allows you to save and load team formations from the cloud.
        </Typography>
      </Stack>
    </Popover>
  )
}
