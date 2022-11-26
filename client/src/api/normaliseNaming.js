// Convert how we describe football positions to how the football-data.org API does so.
export default function normalisePositionNaming(position) { 
  switch (position) {
    case 'forward': return 'Offence'
    case 'defender': return 'Defence'
    case 'midfielder': return 'Midfield'
    case 'goalkeeper': return 'Goalkeeper'
    default: throw Error('Unknown position')
  }
}
