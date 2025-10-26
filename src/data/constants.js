export const CSAT_EMOJIS = [
  { value: 1, emoji: '😢', label: 'Very Dissatisfied' },
  { value: 2, emoji: '😞', label: 'Dissatisfied' },
  { value: 3, emoji: '😐', label: 'Neutral' },
  { value: 4, emoji: '😊', label: 'Satisfied' },
  { value: 5, emoji: '😄', label: 'Very Satisfied' },
];

export const CSAT_EMOJI_MAP = CSAT_EMOJIS.reduce((map, item) => {
  map[item.value] = item.emoji;
  return map;
}, {});
