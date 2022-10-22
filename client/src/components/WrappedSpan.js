import { useTheme } from '@mui/material/styles';

export default function WrappedSpan({ text, secondary }) {
  const theme = useTheme()  
  const primaryBackground = theme.palette.primary.main
  const secondaryBackground = theme.palette.secondary.main

  return (
    <span 
      style={{ 
        padding: 4, 
        borderRadius: 5, 
        background: secondary ? secondaryBackground : primaryBackground,
        color: 'white'
      }}
    >
      {text}
    </span>
  )
}
