import { forwardRef } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import FootballIcon from '@mui/icons-material/SportsSoccer'
import AccountIcon from '@mui/icons-material/AccountCircle'

const AppTopBar = forwardRef(({
  isAuthenticated,
  onAccountClick,
  user
}, accountButtonRef) => {
  const accountText = isAuthenticated ? 'Logout' : 'Login'

  const accountButton = (
    <Button
      ref={accountButtonRef}
      size="large"
      edge="start"
      color="inherit"
      endIcon={<AccountIcon />}
      onClick={onAccountClick}
    >
      {accountText}
    </Button>
  )

  return (
    <AppBar 
      position="relative" 
    >
      <Toolbar
        variant="dense"
        sx={{
          width: '100%',
          maxWidth: 'lg',
          mx: 'auto'
        }}
      >
        <FootballIcon sx={{ mr: 2 }} />
        <Typography
          variant="h6"
          component="h1"
          color="inherit"
          sx={{
            flexGrow: 1
          }}
          noWrap
        >
          Badfootball
        </Typography>
        {isAuthenticated ? (
          <Tooltip title={`Signed in as ${user.name}`}>
            {accountButton}
          </Tooltip>
        ) : accountButton}
      </Toolbar>
    </AppBar>
  )
})

export default AppTopBar
