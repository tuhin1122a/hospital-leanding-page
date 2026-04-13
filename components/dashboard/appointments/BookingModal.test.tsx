import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import BookingModal from './BookingModal'
import { useLanguage } from '@/contexts/LanguageContext'

// Mock the dependencies
jest.mock('@/contexts/LanguageContext', () => ({
  useLanguage: jest.fn(),
}))

const mockPatients = [
  { id: 'p1', name: 'John Doe', patientId: 'P-1001' },
  { id: 'p2', name: 'Jane Smith', patientId: 'P-1002' },
]

const mockDoctors = [
  {
    id: 'd1',
    name: 'Dr. Strange',
    email: 'magic@hospital.com',
    doctorProfile: {
      specialty: 'Neurology',
      department: 'Neuro',
      fee: 1000,
      availableDays: ['MON', 'WED'],
      startTime: '09:00',
      endTime: '17:00',
      slotDuration: 30,
      isActive: true,
    },
  },
]

describe('BookingModal Component', () => {
  const mockOnClose = jest.fn()
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useLanguage as jest.Mock).mockReturnValue({
      t: (key: string) => key, // Return the key itself for translation
    })
    
    // Mock global fetch since the component fetches slots
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          slots: ['09:00', '09:30', '10:00'],
          booked: [],
          fee: 1000,
        }),
      })
    ) as jest.Mock
  })

  it('does not render when show is false', () => {
    const { container } = render(
      <BookingModal
        show={false}
        onClose={mockOnClose}
        patients={mockPatients}
        doctors={mockDoctors}
        onSubmit={mockOnSubmit}
        isSubmitting={false}
        role="ADMIN"
      />
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders correctly when show is true', () => {
    render(
      <BookingModal
        show={true}
        onClose={mockOnClose}
        patients={mockPatients}
        doctors={mockDoctors}
        onSubmit={mockOnSubmit}
        isSubmitting={false}
        role="ADMIN"
      />
    )
    
    // Check if the header is rendered
    expect(screen.getByText('Book Appointment')).toBeInTheDocument()
    
    // Check if the doctor is rendered in the list
    expect(screen.getByText('Dr. Strange')).toBeInTheDocument()
    expect(screen.getByText('Neurology · Neuro')).toBeInTheDocument()
  })

  it('allows selecting a doctor and moving to next step', async () => {
    render(
      <BookingModal
        show={true}
        onClose={mockOnClose}
        patients={mockPatients}
        doctors={mockDoctors}
        onSubmit={mockOnSubmit}
        isSubmitting={false}
        role="ADMIN"
      />
    )

    // Select doctor
    const doctorButton = screen.getByText('Dr. Strange').closest('button')
    fireEvent.click(doctorButton!)

    // Click Next Steps
    const nextButton = screen.getByText(/Next Steps/i).closest('button')
    expect(nextButton).not.toBeDisabled()
    fireEvent.click(nextButton!)

    // Wait for step 2 to appear (Date & Time)
    await waitFor(() => {
      expect(screen.getByText('Select Date')).toBeInTheDocument()
      expect(screen.getByText('Select Time Slot')).toBeInTheDocument()
    })
  })
})
