import { useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog' 
import UserSignIn from './UserSignIn'
import UserSignUp from './UserSignUp'

function DialogContent({ contentId, onChange }) {
  const redirectToSignUp = () => onChange('SIGN_UP')
  const redirectToSignIn = () => onChange('SIGN_IN')

  switch (contentId) {
    case 'SIGN_IN':
      return <UserSignIn onSignUpRequest={redirectToSignUp}/>
    case 'SIGN_UP':
      return <UserSignUp onSignInRequest={redirectToSignIn}/>
    default:
      throw new Error('Unhandled content Id')
  }
}

export default function UserProfileDialog({ open, onClose }) {
  const [contentId, setContentId] = useState('SIGN_IN')

  const handleChange = (contentId) => {
    setContentId(contentId)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Box sx={{ height: '50vh' }}>
        <DialogContent contentId={contentId} onChange={handleChange} />
      </Box>
    </Dialog>
  )
}
