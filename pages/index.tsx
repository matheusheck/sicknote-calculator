import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

//Day Picker
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { differenceInCalendarDays } from 'date-fns'

const Home: NextPage = () => {

  const [selectedDate1, setSelectedDate1] = useState(new Date());
  const [selectedDate2, setSelectedDate2] = useState(new Date());
  const [selectedDatesDifference, setSelectedDatesDifference] = useState(0);

  const handleDayChange1 = useCallback((day: Date, ) => {
      setSelectedDate1(day);
  }, []);

  const handleDayChange2 = useCallback((day: Date) => {
      setSelectedDate2(day);
  }, []);
  
  const calculateDaysOutSaturday = useCallback(() => {
      if (selectedDate2 < selectedDate1){
        setSelectedDatesDifference(0);
        return
      }
      var days = differenceInCalendarDays(selectedDate2, selectedDate1)  

      var startDay = selectedDate1.getDay();
      var endDay = selectedDate2.getDay(); 


      // Sum 1st day
      days = days + 1

      // Remove end start or day if is Sunday
      if (endDay == 0 || startDay == 0){
        // if begin and end sunday, calculete per week
        if (startDay != 0 || endDay != 0){
          days = days - 1
        }
      }

      // remove if has sunday between
      if (startDay > endDay && endDay != 0){
         days = days - 1
        }

      // Subtract sundays for every week in between
      days = days - Math.floor(days / 7);
  
  
      setSelectedDatesDifference(days)
  }, [selectedDate1, selectedDate2])

  return (
    <div className={styles.container}>
      <Head>
        <title>Sicknote calculator</title>
        <meta name="description" content="German sicknote calculator" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Sicknote calculator
        </h1>

        <p className={styles.description}>
          Select two dates to get days without count Sunday.
        </p>

        <div className={styles.grid}>
        <DayPicker
            selectedDays={selectedDate1}
            onDayClick={handleDayChange1}
          />
          <DayPicker
            selectedDays={selectedDate2}
            onDayClick={handleDayChange2}
          />

          <button onClick={calculateDaysOutSaturday}>
            Total: {selectedDatesDifference}
          </button>

        </div>
      
      </main>

      <footer className={styles.footer}>
        <a
          href="https://houseofcannabis.com"
          target="_blank"
          rel="houseofcannabis"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/hoc_logo.svg" alt="House of Cannabis Logo" width={72} height={42} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
