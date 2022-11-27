import { useEffect, useState } from 'react'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Dialog from '@mui/material/Dialog'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import getStartingElevens from './api/getStartingElevens'

function prettifyDate(iso8601String) {
  return new Date(iso8601String).toLocaleString('en-GB', { timeZone: 'UTC' })
}

export default function LoadDialog({
  open,
  onClose,
  userId,
  getAccessTokenSilently,
  onDelete,
  onLoad
}) {
  const [savedStartingElevens, setSavedStartingElevens] = useState([])

  useEffect(() => {
    if (userId) {
      getAccessTokenSilently().then((token) => {
        getStartingElevens(userId, token).then(startingElevens => {
          startingElevens.sort((a, b) => new Date(b.lastEdit) - new Date(a.lastEdit))
          setSavedStartingElevens(startingElevens)
        })
      })
    }
  }, [userId, getAccessTokenSilently])

  function handleDelete(startingElevenId) {
    // Delete on the client.
    setSavedStartingElevens(startingElevens => {
      return startingElevens.filter(startingEleven => startingEleven.id !== startingElevenId)
    })

    // Delete on the server.
    onDelete(startingElevenId)
  }

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Load Starting Eleven</DialogTitle>
      {savedStartingElevens.length === 0 ? (
        <DialogContent
          sx={{
            height: 700,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography>
            You have no saved starting elevens.
          </Typography>
        </DialogContent>
      ) : (
        <Box
          sx={{
            height: 700,
            overflow: 'auto'
          }}>
          <List
            dense
            sx={{
              pt: 0
            }}
          >
            {savedStartingElevens.map(startingEleven => (
              <ListItem
                key={startingEleven.id}
                secondaryAction={
                  <Tooltip title="Delete">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(startingEleven.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>}
              >
                <ListItemButton
                  onClick={() => onLoad(startingEleven)}
                >
                  <ListItemText
                    primary={`${startingEleven.team} (${startingEleven.formation})`}
                    secondary={`${prettifyDate(startingEleven.lastEdit)}`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Dialog>
  )
}
