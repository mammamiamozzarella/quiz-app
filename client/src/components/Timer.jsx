import { useEffect, useState } from "react";

function Timer({ isStarted, onElapsedTimeChange, isStopped }) {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;

    if (isStarted && !isStopped) {
      const initialStartTime = Date.now();
      setStartTime(initialStartTime);

      interval = setInterval(() => {
        const time = Math.floor((Date.now() - initialStartTime) / 1000);
        setElapsedTime(time);
        onElapsedTimeChange(time);
      }, 1000);
    } else if (isStopped) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isStarted, onElapsedTimeChange, isStopped]);

  const hours = Math.floor(elapsedTime / 3600);
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  const seconds = elapsedTime % 60;

  return (
    <div style={styles.container}>
      <div style={styles.timer}>
        <span style={styles.digit}>{String(hours).padStart(2, "0")}</span>:
        <span style={styles.digit}>{String(minutes).padStart(2, "0")}</span>:
        <span style={styles.digit}>{String(seconds).padStart(2, "0")}</span>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  timer: {
    fontSize: "60px",
    fontWeight: "bold",
    background: "#222",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "10px",
    display: "inline-block",
  },
  digit: {
    margin: "0 5px",
  },
};

export default Timer;
