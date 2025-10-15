"use client";  

import { useEffect, useState } from "react";  
import { motion } from "framer-motion";  
import { UsersRound, Award, Mountain, CalendarDays } from "lucide-react";  

export default function StatsStrip() {  
  const [participants, setParticipants] = useState(0);  
  const [awards, setAwards] = useState(0);  
  const [treks, setTreks] = useState(0);  
  const [years, setYears] = useState(0);  

  useEffect(() => {  
    const animateValue = (setter: any, end: number, duration: number) => {  
      let start = 0;  
      const increment = end / (duration / 30);  
      const timer = setInterval(() => {  
        start += increment;  
        setter(Math.min(Math.floor(start), end));  
        if (start >= end) clearInterval(timer);  
      }, 30);  
    };  

    animateValue(setParticipants, 220000, 2000);  
    animateValue(setAwards, 50, 2000);  
    animateValue(setTreks, 120, 2000);  
    animateValue(setYears, 15, 2000);  
  }, []);  

  const itemClass =  
    "flex flex-col sm:flex-row sm:items-center gap-2 text-primary-foreground";  
  const numberClass = "text-xl md:text-2xl font-bold";  
  const labelClass = "text-sm md:text-base opacity-80";  

  // Option A: Transparent background but keep light border if you want  
  return (  
    <div className="relative z-30">  
      <div className="mx-auto max-w-7xl px-6 pb-8 md:px-8">  
        {/* Transparent, no backdrop blur/tint on the container */}  
        <div className="rounded-lg bg-transparent p-4 shadow-md border border-white/10">  
          <p className="mb-3 text-base font-medium text-white md:text-lg">  
            India's Largest Trekking Organization  
          </p>  

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-white">  
            {/* Participants */}  
            <div className={itemClass}>  
              <UsersRound className="h-6 w-6" />  
              <div>  
                <motion.div  
                  key={participants}  
                  className={numberClass}  
                  initial={{ opacity: 0, y: 10 }}  
                  animate={{ opacity: 1, y: 0 }}  
                  transition={{ duration: 0.3 }}  
                >  
                  {participants.toLocaleString()}+  
                </motion.div>  
                <div className={labelClass}>Participants</div>  
              </div>  
            </div>  

            {/* Awards */}  
            <div className={itemClass}>  
              <Award className="h-6 w-6" />  
              <div>  
                <motion.div  
                  key={awards}  
                  className={numberClass}  
                  initial={{ opacity: 0, y: 10 }}  
                  animate={{ opacity: 1, y: 0 }}  
                  transition={{ duration: 0.3 }}  
                >  
                  {awards}+  
                </motion.div>  
                <div className={labelClass}>Awards</div>  
              </div>  
            </div>  

            {/* Treks */}  
            <div className={itemClass}>  
              <Mountain className="h-6 w-6" />  
              <div>  
                <motion.div  
                  key={treks}  
                  className={numberClass}  
                  initial={{ opacity: 0, y: 10 }}  
                  animate={{ opacity: 1, y: 0 }}  
                  transition={{ duration: 0.3 }}  
                >  
                  {treks}+  
                </motion.div>  
                <div className={labelClass}>Treks Organized</div>  
              </div>  
            </div>  

            {/* Years */}  
            <div className={itemClass}>  
              <CalendarDays className="h-6 w-6" />  
              <div>  
                <motion.div  
                  key={years}  
                  className={numberClass}  
                  initial={{ opacity: 0, y: 10 }}  
                  animate={{ opacity: 1, y: 0 }}  
                  transition={{ duration: 1}}  
                >  
                  {years}+  
                </motion.div>

                
                <div className={labelClass}>Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
