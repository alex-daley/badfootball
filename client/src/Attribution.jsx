import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

export default function Attribution() {
  return (
    <Box
      sx={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'flex-end' 
      }}
    >
      <Typography variant="caption">
        Football data provided by the {}
          <Link 
            variant="caption" 
            href="https://www.football-data.org/"
          >
            Football-Data.org API
          </Link>
      </Typography>
    </Box>
  )
}
