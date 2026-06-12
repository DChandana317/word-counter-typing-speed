import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const TypingEngine = ({token,triggerHistoryRefresh}) => {
  const paragraphs = [
  "Technology has revolutionized the modern world by transforming the way people communicate, learn, work, and interact with one another. From smartphones and computers to artificial intelligence and cloud computing, technological advancements have made information more accessible than ever before. Businesses rely on digital tools to improve productivity, while students use online platforms to enhance their learning experiences. As technology continues to evolve, it creates new opportunities and challenges that require individuals to adapt and develop new skills.",

  "Learning to type quickly and accurately is an essential skill in today's digital age. Whether someone is a student, software developer, content writer, or office professional, efficient typing can significantly improve productivity and save valuable time. Regular typing practice helps increase speed, reduce errors, and build confidence when working on computers. Developing strong typing skills also improves concentration and allows individuals to focus more on their ideas rather than searching for keys on the keyboard.",

  "Success is rarely achieved overnight and often requires dedication, persistence, and continuous self-improvement. People who accomplish their goals understand the importance of setting clear objectives, maintaining discipline, and learning from their mistakes. Challenges and failures are natural parts of the journey, but they provide valuable lessons that contribute to personal growth. By staying focused, working consistently, and maintaining a positive mindset, individuals can overcome obstacles and achieve meaningful success in both their personal and professional lives.",

  "Reading books regularly is one of the most effective ways to expand knowledge, improve vocabulary, and strengthen critical thinking abilities. Books expose readers to new perspectives, cultures, and ideas while enhancing imagination and creativity. Whether reading fiction, biographies, or educational material, the habit of reading encourages lifelong learning and intellectual development. Spending even a few minutes each day with a good book can have a lasting positive impact on communication skills and overall personal growth.",

  "Physical fitness and a healthy lifestyle play an important role in maintaining overall well-being. Regular exercise improves cardiovascular health, strengthens muscles, and increases energy levels throughout the day. In addition to physical activity, maintaining a balanced diet, staying hydrated, and getting adequate sleep are essential for optimal health. Small healthy habits practiced consistently can lead to significant long-term benefits, helping individuals feel more energetic, productive, and mentally focused."
];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paragraph, setParagraph] = useState(paragraphs[0]);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [isActive, setIsActive] = useState(false);

  const [metrics, setMetrics] = useState({
    wpm: 0,
    accuracy: 100,
    words: 0
  });

  const timerRef = useRef(null);

  const savePerformanceMetrics = async () => {
  try {
    await axios.post(
      "http://localhost:5000/api/scores/save",
      {
        wpm: metrics.wpm,
        accuracy: metrics.accuracy,
        wordsTyped: metrics.words
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (triggerHistoryRefresh) {
      triggerHistoryRefresh();
    }
  } catch (err) {
    console.error("Score save failed", err);
   }
 };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0 && isActive) {
      clearInterval(timerRef.current);
      setIsActive(false);
      savePerformanceMetrics();
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft]);

  const handleTyping = (e) => {
    const value = e.target.value;

    if (!isActive && timeLeft > 0) {
      setIsActive(true);
    }

    setInput(value);

    if (value === paragraph) {
      const nextIndex = (currentIndex + 1) % paragraphs.length;

      setCurrentIndex(nextIndex);
      setParagraph(paragraphs[nextIndex]);
      setInput("");

      return;
    }

    const words = value.trim()
      ? value.trim().split(/\s+/).length
      : 0;

    const elapsedTime = 120 - timeLeft;

    const wpm =
      elapsedTime > 0
        ? Math.round((value.length / 5) / (elapsedTime / 60))
        : 0;

    let correctChars = 0;

    for (let i = 0; i < value.length; i++) {
      if (value[i] === paragraph[i]) {
        correctChars++;
      }
    }

    const accuracy =
      value.length > 0
        ? Math.round((correctChars / value.length) * 100)
        : 100;

    setMetrics({
      wpm,
      accuracy,
      words
    });
  };

  const reset = () => {
    clearInterval(timerRef.current);

    setInput("");
    setTimeLeft(120);
    setIsActive(false);

    setMetrics({
      wpm: 0,
      accuracy: 100,
      words: 0
    });

    setCurrentIndex(0);
    setParagraph(paragraphs[0]);
  };

  return (
    <div className="engine-pane">
      <h2>Typing Speed Test</h2>

      <div className="prompt-display">
        {paragraph.split("").map((char, index) => {
          let colorClass = "";

          if (index < input.length) {
            colorClass =
              input[index] === char
                ? "correct"
                : "incorrect";
          }

          return (
            <span key={index} className={colorClass}>
              {char}
            </span>
          );
        })}
      </div>

      <textarea
        value={input}
        onChange={handleTyping}
        onKeyDown={(e) => {
          if (e.key === "Backspace") {
            e.preventDefault();
          }
        }}
        disabled={timeLeft === 0}
        placeholder="Start typing here..."
      />

      <div className="metrics-dashboard">
        <div>
          <strong>Time:</strong> {timeLeft}s
        </div>

        <div>
          <strong>WPM:</strong> {metrics.wpm}
        </div>

        <div>
          <strong>Accuracy:</strong> {metrics.accuracy}%
        </div>

        <div>
          <strong>Words:</strong> {metrics.words}
        </div>
      </div>

      <button onClick={reset}>
        Reset Test
      </button>
    </div>
  );
};

export default TypingEngine;