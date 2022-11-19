import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText' 
import Stack from '@mui/material/Stack' 
import SaveAsIcon from '@mui/icons-material/SaveAs'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function SaveDialog({ open, onClose, onCancel, onSave, saveContext }) {
  const [saveName, setSaveName] = useState()

  const handleSaveNameChange = (event) => {
    setSaveName(event.target.value)
  }

  const handleClose = () => {
    onClose?.()
  }

  const handleCancel = () => {
    onCancel?.()
  }

  const handleSave = () => {
    onSave?.(saveName)
  }

  if (!saveContext.team || !saveContext.formation) {
    return <></>
  }

  const { team, formation } = saveContext
  const teamName = team.name
  const formationName = formation.name

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Save Starting Eleven</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <DialogContentText>
            {`Save your ${teamName} ${formationName} starting eleven for later`}
          </DialogContentText>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-end' }}>
            <SaveAsIcon />
            <TextField size="small" variant="standard" label="Save as" value={saveName} onChange={handleSaveNameChange} fullWidth />
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button size="small" onClick={handleCancel}>
          Cancel
        </Button>
        <Button size="small" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
