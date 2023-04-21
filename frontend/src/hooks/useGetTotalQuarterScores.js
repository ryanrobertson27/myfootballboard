import { useState, useEffect } from 'react';

export function useGetTotalQuarterScores(gameData) {
  const [totalScoreObject, setTotalScoreObject] = useState({
    homeFirstQuarterTotal: 0,
    awayFirstQuarterTotal: 0,
    homeSecondQuarterTotal: 0,
    awaySecondQuarterTotal: 0,
    homeThirdQuarterTotal: 0,
    awayThirdQuarterTotal: 0,
    homeFourthQuarterTotal: 0,
    awayFourthQuarterTotal: 0,
  });

  useEffect(() => {
    if(gameData){
      if (gameData.firstQuarter.homeScore !== null) {
        setTotalScoreObject((prevState) => ({
          ...prevState,
          homeFirstQuarterTotal: gameData?.firstQuarter.homeScore,
          awayFirstQuarterTotal: gameData?.firstQuarter.awayScore,
        }));
      }
      if (gameData.secondQuarter.homeScore !== null) {
        setTotalScoreObject((prevState) => ({
          ...prevState,
          homeSecondQuarterTotal: gameData?.firstQuarter.homeScore + gameData.secondQuarter.homeScore,
          awaySecondQuarterTotal: gameData?.firstQuarter.awayScore + gameData.secondQuarter.awayScore,
        }));
      }
      if (gameData.thirdQuarter.homeScore !== null) {
        setTotalScoreObject((prevState) => ({
          ...prevState,
          homeThirdQuarterTotal: gameData?.firstQuarter.homeScore + gameData.secondQuarter.homeScore + gameData.thirdQuarter.homeScore,
          awayThirdQuarterTotal: gameData?.firstQuarter.awayScore + gameData.secondQuarter.awayScore + gameData.thirdQuarter.awayScore,
        }));
      }
      if (gameData.fourthQuarter.homeScore !== null) {
        setTotalScoreObject((prevState) => ({
          ...prevState,
          homeFourthQuarterTotal: gameData?.firstQuarter.homeScore + gameData.secondQuarter.homeScore + gameData.thirdQuarter.homeScore + gameData.fourthQuarter.homeScore,
          awayFourthQuarterTotal: gameData?.firstQuarter.awayScore + gameData.secondQuarter.awayScore + gameData.thirdQuarter.awayScore + gameData.fourthQuarter.awayScore,
        }));
      }
    }
  }, [gameData]);
  
  return totalScoreObject;
  
}
