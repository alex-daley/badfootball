import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Avatar from '@mui/material/Avatar'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

export default function SignUp({ onSignInRequest }) {
  const handleSignInClick = () =>{
    onSignInRequest?.()
  }

  return (
    <Box
      m={4}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <PersonAddIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" mt={1} noValidate>
        <TextField
          required
          fullWidth
          margin="normal"
          color="secondary"
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          required
          fullWidth
          margin="normal"
          color="secondary"
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ my: 3 }}
        >
          Sign up
        </Button>
        <Link 
          href="#" 
          onClick={handleSignInClick}
        >
          Already have an account? Sign in.
        </Link> 
      </Box>
    </Box>
  )
}
