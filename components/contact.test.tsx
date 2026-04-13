import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ScheduleSection from './contact'

// Mocking Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />
  }
})

// Mock custom hooks
jest.mock('@/hooks/useSound', () => ({
  useNotificationSound: () => ({
    playNotification: jest.fn(),
  }),
}))

// Mock Third party libraries
jest.mock('html2canvas', () => jest.fn())

describe('ScheduleSection Component (Contact)', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    // Mock global fetch to return empty dots or mock doctors
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          {
            id: 'doc-1',
            name: 'Dr. Smith',
            doctorProfile: {
              specialty: 'Cardiology',
              fee: 700,
              availableDays: ['MON'],
              startTime: '10:00',
              endTime: '14:00',
            }
          }
        ]),
      })
    ) as jest.Mock;
  })

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  })

  it('renders the Booking Header successfully', async () => {
    render(<ScheduleSection />)
    
    // Check main title
    expect(screen.getByText(/Online/i)).toBeInTheDocument()
    expect(screen.getByText(/Doctor Booking/i)).toBeInTheDocument()

    // It should load and show Doctor info
    await waitFor(() => {
      expect(screen.getByText('Dr. Smith')).toBeInTheDocument()
      expect(screen.getByText(/Cardiology/i)).toBeInTheDocument()
    })
  })

  it('allows clicking on a doctor to select', async () => {
    render(<ScheduleSection />)

    // Wait until doctors are fetched
    await waitFor(() => {
      expect(screen.getByText('Dr. Smith')).toBeInTheDocument()
    })

    // Click on doctor card
    const doctorCard = screen.getByText('Dr. Smith').closest('div.cursor-pointer')
    fireEvent.click(doctorCard!)

    // Check if SELECT/NEXT steps button is enabled
    const nextButton = screen.getByRole('button', { name: /পরবর্তী ধাপে যান/i })
    expect(nextButton).not.toBeDisabled()

    // Move to next step (Step 2)
    fireEvent.click(nextButton)

    await waitFor(() => {
       // Should show Date Selection in Step 2
       expect(screen.getByText(/অ্যাপয়েন্টমেন্ট তারিখ/i)).toBeInTheDocument()
    })
  })
})
