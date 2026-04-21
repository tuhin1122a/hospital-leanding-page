import ScheduleSection from '@/components/contact';

export const metadata = {
  title: 'Online Doctor Booking',
  description: 'Book your doctor appointment online easily without registration.',
};

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-white pt-[60px] md:pt-[80px]">
      <ScheduleSection />
    </main>
  );
}
