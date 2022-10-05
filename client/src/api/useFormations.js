export const DEF = 'defender'
export const MID = 'midfielder'
export const FWD = 'forward'

export const FORMATIONS = {
  '4-4-3'    : [[DEF, 4], [MID, 3], [FWD, 3]],
  '4-2-3-1'  : [[DEF, 4], [MID, 2], [MID, 3], [FWD, 1]],
  '5-3-2'    : [[DEF, 5], [MID, 3], [FWD, 2]],
  '4-5-1'    : [[DEF, 4], [MID, 5], [FWD, 1]],
  '4-4-2'    : [[DEF, 4], [MID, 4], [FWD, 2]],
  '3-4-3'    : [[DEF, 3], [MID, 4], [FWD, 3]],
  '5-4-1'    : [[DEF, 5], [MID, 4], [FWD, 1]],
  '3-5-2'    : [[DEF, 3], [MID, 5], [FWD, 2]],
  '4-3-2-1'  : [[DEF, 4], [MID, 3], [MID, 2], [FWD, 1]],
  '4-1-2-1-2': [[DEF, 4], [MID, 1], [MID, 2], [MID, 1], [FWD, 2]],
  '3-3-3-1'  : [[DEF, 3], [MID, 3], [MID, 3], [FWD, 1]],
  '3-4-1-2'  : [[DEF, 3], [MID, 4], [MID, 1], [FWD, 2]]
}

export default function useCompetitions() {
  return { 
    formations: FORMATIONS, 
    error: false, 
    isLoading: false 
  }
}
