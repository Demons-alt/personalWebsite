import { useState, useEffect } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

import RotatingText from "~/components/rotatingText";
import TimeAnimate from "~/components/timeAnimate";
import ThreeScene from "~/3D/sample";

dayjs.extend(duration);

const targetDate = dayjs().add(7, "month"); // Set target 7 hari dari sekarang

export function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const now = dayjs();
    const diff = dayjs.duration(targetDate.diff(now));
    return {
      month: diff.months(),
      days: diff.days(),
      hours: diff.hours(),
      minutes: diff.minutes(),
      seconds: diff.seconds(),
    };
  }

  const animate = (time: number) => {
    return (
      <TimeAnimate
        value={time}
        places={[10, 1]}
        fontSize={80}
        padding={5}
        gap={10}
        textColor="#E2E2B6"
        fontWeight={900}
      />
    );
  };

  return (
    <div className="flex items-center justify-center h-screen text-white text-center">
      <div className="flex flex-col pb-[5rem] items-center">
        <h1 className="text-[6rem] gap-10 font-bold mb-4 whitespace-nowrap flex items-center gap-2">
          <RotatingText
            texts={["Something", "cool", "will", "coming", "soon!"]}
            mainClassName="bg-[#03346E] px-2 sm:px-2 md:px-3 w-[40rem] text-[#E2E2B6] overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-[2vw]"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </h1>
        <div className=" inline-flex text-[#E2E2B6] text-6xl pt-[25rem]">
          {animate(timeLeft.month)}
          <p className="pt-[9px] font-bold text-7xl">:</p>
          {animate(timeLeft.days)}
          <p className="pt-[9px] font-bold text-7xl">:</p>
          {animate(timeLeft.hours)}
          <p className="pt-[9px] font-bold text-7xl">:</p>
          {animate(timeLeft.minutes)}
          <p className="pt-[9px] font-bold text-7xl">:</p>
          {animate(timeLeft.seconds)}
        </div>
      </div>
      <ThreeScene />
    </div>
  );
}
