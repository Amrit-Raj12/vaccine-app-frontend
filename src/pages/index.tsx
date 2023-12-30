import Image from 'next/image'
import { Inter } from 'next/font/google'
import Calendar from '@/components/Callendar';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const availableDates: Date[] = [
    new Date(2023, 11, 28),
    new Date(2023, 11, 30),
    new Date(2023, 11, 31),
    // Add more available dates as needed
  ];
  
  const events = availableDates.map(date => ({
    title: 'Available',
    start: date,
    end: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
  }));

  return (
    <main
      // className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto">
        <Calendar events={events} />
      </div>
    </div>
    </main>
  )
}
