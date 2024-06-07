import {useEffect, useRef, useState} from 'react';

export const useTimer = (
  initialTime: number = 10,
  initialStartTime: number = 3,
) => {
  const [time, setTime] = useState<number>(initialTime);
  const [startTime, setStartTime] = useState<number>(initialStartTime);
  const [started, setStarted] = useState<boolean>(false);
  const [ended, setEnded] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (startRef.current) {
        clearInterval(startRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startGame = () => {
    setStarted(true);
    setStartTime(initialStartTime);
    if (!startRef.current) {
      startRef.current = setInterval(() => {
        setStartTime(prevTime => {
          if (prevTime === 0) {
            clearInterval(startRef.current!);
            startRef.current = null;
            startTimer(initialTime);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  const startTimer = (duration: number = 10) => {
    setTime(duration);
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          if (prevTime === 0) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            setStarted(false);
            setEnded(true);
            setEnded;
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  const resetTimer = () => {
    setEnded(false);
    setTime(initialTime);
    intervalRef.current = null;
    setStarted(false);
  };

  return {startTime, time, started, ended, startGame, resetTimer};
};
