import Box from '@mui/material/Box'
import Link from '@mui/material/Link'

export default function Footer() {
  return (
    <footer style={{ position: "fixed", bottom: 0  }}>
      <Box p={1} sx={{ display: 'flex', justifyContent: 'center', background: 'rgba(0, 0, 0, 1)', width: '100vw' }}>
        <Link 
          href="https://www.football-data.org/" 
          variant="caption" 
          sx={{ color: 'white' }} 
          underline="hover" 
        >
          Football data provided by the Football-Data.org API
        </Link>
      </Box>
    </footer>
  )
}
