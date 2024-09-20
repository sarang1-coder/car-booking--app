import { create } from 'zustand'

const useBookingStore = create((set, get) => ({
  pickup: '',
  drop: '',
  dateTime: '',
  pickupCoords: null,
  dropCoords: null,
  setpickup: (location) => set({ pickup: location }),
  setdrop: (location) => set({ drop: location }),
  setDateTime: (dateTime) => set({ dateTime: dateTime }),
  setPickupCoords: (coords) => set({ pickupCoords: coords }),
  setDropCoords: (coords) => set({ dropCoords: coords }),
  sendBooking: async () => {
    const { pickup, drop, dateTime, pickupCoords, dropCoords } = get()
    console.log(`Sending booking: pickup ${pickup} (${JSON.stringify(pickupCoords)}) drop ${drop} (${JSON.stringify(dropCoords)}) at ${dateTime}`)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    set({ pickup: '', drop: '', dateTime: '', pickupCoords: null, dropCoords: null })
  },
}))

export default useBookingStore