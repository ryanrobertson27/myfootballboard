export function useConvertNumberToMinutes (number) {
  const minutes = Math.floor(number / 60);
  const hours = Math.floor(minutes / 60);
  const quarters = Math.floor(minutes / 12);
  const minutesInQuarter = (quarters * 12) - minutes;
  const formattedMinutes = minutesInQuarter < 10 ? `0${minutesInQuarter}` : minutesInQuarter;
  
  if (hours === 0 && minutesInQuarter === 0) {
    return '12:00';
  }
  
  return `${hours}:${formattedMinutes}`;
}