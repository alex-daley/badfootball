import { Fragment } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import useStartingElevens from '../api/useStartingElevens'

export default function LoadDialog({ open, onClose }) {
  const { startingElevens, isLoading } = useStartingElevens()

  if (isLoading || !startingElevens) {
    return <></>
  }

  const handleCancel = () => {
    onClose?.()
  }

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Load Starting Eleven</DialogTitle>
      <DialogContent>
        <Paper variant="outlined">
          <List dense sx={{ p: 0 }}>
            {startingElevens.map(({ saveName, lastEdit, id, formation, team, players }) => (
              <Fragment>
                <ListItem key={`save-${id}`} disablePadding>
                  <ListItemButton>
                    <ListItemText
                      primary={saveName}
                      secondary={`${team} - (${formation})`}
                    />
                  </ListItemButton>
                </ListItem>
                <Divider/>
              </Fragment>
            ))}
          </List>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button size="small" onClick={handleCancel}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

