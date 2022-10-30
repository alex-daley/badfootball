import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar' 
import CloseIcon from '@mui/icons-material/Close'

const AUTOHIDE_MS = 3000

export default function WrappedAlert({ open, onClose, message }) {
  const handleClose = (_, reason) => {
    if (reason !== 'clickaway') {
      onClose?.()
    }
  }

  const action = (
    <Button size="small" aria-label="close" color="inherit" onClick={handleClose} endIcon={<CloseIcon fontSize="small" />} >
      Dismiss
    </Button>
  )

  return (
    <Snackbar 
      open={open} 
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      autoHideDuration={AUTOHIDE_MS} 
      onClose={handleClose} 
      message={message} 
      action={action} 
    />
  )
}
