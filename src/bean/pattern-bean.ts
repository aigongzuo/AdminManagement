export interface PatternBean {
  id: number;
  patternName: string;
  patternImg: string;
  patternDesc: string;
  patternType: number;
  patternPrice: number;
}

export function getPatternLabel(value: number) {
  console.log(value)
  for (const type of patternTypes) {
    if (type.value === value) {
      return type.label;
    }
  }
  return '111';
}


export const patternTypes = [
  {
    value: 0,
    label: 'UnKnow',
  },
  {
    value: 1,
    label: 'Type1',
  },
  {
    value: 2,
    label: 'Type2',
  },
  {
    value: 3,
    label: 'Type3',
  },
  {
    value: 4,
    label: 'Type4',
  },
  {
    value: 5,
    label: 'Type5',
  },
]
