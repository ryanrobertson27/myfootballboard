export function useConvertNumberToMinutes (seconds) {
  const quarterLength = 15 * 60; // 15 minutes per quarter
  const remainingSeconds = seconds % quarterLength;
  const minutes = Math.floor(remainingSeconds / 60);
  const paddedMinutes = minutes.toString().padStart(2, '0');
  const secondsLeft = remainingSeconds % 60;
  const paddedSecondsLeft = secondsLeft.toString().padStart(2, '0');
  return `${paddedMinutes}:${paddedSecondsLeft}`;
}