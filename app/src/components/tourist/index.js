import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, DollarSign, Ticket } from 'lucide-react';

// Expanded Event Data Model
const initialEvents = [
  {
    id: 1,
    name: "Summer Music Festival",
    description: "An incredible outdoor music experience",
    date: "2024-07-15",
    time: "18:00",
    location: "Central Park, New York",
    capacity: 5000,
    availableTickets: 3500,
    price: 75,
    category: "Music"
  },
  {
    id: 2,
    name: "Tech Innovation Conference",
    description: "Annual gathering of tech leaders and innovators",
    date: "2024-09-22",
    time: "09:00",
    location: "Silicon Valley Convention Center",
    capacity: 2000,
    availableTickets: 1200,
    price: 299,
    category: "Technology"
  },
  {
    id: 3,
    name: "International Food Fair",
    description: "Culinary delights from around the world",
    date: "2024-08-10",
    time: "12:00",
    location: "Downtown Culinary Center",
    capacity: 3000,
    availableTickets: 2500,
    price: 45,
    category: "Food & Drink"
  },
  {
    id: 4,
    name: "Art & Design Expo",
    description: "Showcasing cutting-edge art and design",
    date: "2024-10-05",
    time: "14:00",
    location: "Modern Art Museum",
    capacity: 1500,
    availableTickets: 1000,
    price: 65,
    category: "Art"
  },
  {
    id: 5,
    name: "International Film Festival",
    description: "Celebrating global cinema",
    date: "2024-11-15",
    time: "19:00",
    location: "Grand Cinema Palace",
    capacity: 2500,
    availableTickets: 1800,
    price: 120,
    category: "Entertainment"
  },
  {
    id: 6,
    name: "Wellness & Yoga Retreat",
    description: "Holistic healing and mindfulness workshop",
    date: "2024-08-25",
    time: "07:00",
    location: "Mountain Wellness Resort",
    capacity: 500,
    availableTickets: 350,
    price: 250,
    category: "Health & Wellness"
  },
  {
    id: 7,
    name: "Gaming & eSports Championship",
    description: "Ultimate gaming tournament",
    date: "2024-09-10",
    time: "10:00",
    location: "Global Gaming Arena",
    capacity: 1000,
    availableTickets: 750,
    price: 99,
    category: "Gaming"
  },
  {
    id: 8,
    name: "Science and Space Expo",
    description: "Exploring the frontiers of scientific discovery",
    date: "2024-10-20",
    time: "11:00",
    location: "National Science Center",
    capacity: 2000,
    availableTickets: 1500,
    price: 75,
    category: "Science"
  }
];

// Event Card Component (Unchanged from previous version)
const EventCard = ({ event, onBookTicket }) => {
  return (
    <div className="border rounded-lg p-4 m-2 shadow-md hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">{event.name}</h2>
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
          {event.category}
        </span>
      </div>
      <p className="text-gray-600 mb-3 h-12 overflow-hidden">{event.description}</p>
      
      <div className="flex items-center mb-2">
        <Calendar className="mr-2 text-blue-500" size={20} />
        <span>{event.date}</span>
      </div>
      
      <div className="flex items-center mb-2">
        <Clock className="mr-2 text-green-500" size={20} />
        <span>{event.time}</span>
      </div>
      
      <div className="flex items-center mb-2">
        <MapPin className="mr-2 text-red-500" size={20} />
        <span className="truncate">{event.location}</span>
      </div>
      
      <div className="flex items-center mb-2">
        <Users className="mr-2 text-purple-500" size={20} />
        <span>{event.availableTickets} tickets remaining</span>
      </div>
      
      <div className="flex items-center mb-3">
        <DollarSign className="mr-2 text-green-600" size={20} />
        <span>${event.price} per ticket</span>
      </div>
      
      <button 
        onClick={() => onBookTicket(event)}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition flex items-center justify-center"
        disabled={event.availableTickets === 0}
      >
        <Ticket className="mr-2" size={20} />
        {event.availableTickets === 0 ? 'Sold Out' : 'Book Tickets'}
      </button>
    </div>
  );
};

// Booking Modal Component (Unchanged from previous version)
const BookingModal = ({ event, onClose, onConfirm }) => {
  const [ticketCount, setTicketCount] = useState(1);

  const handleConfirm = () => {
    onConfirm(event, ticketCount);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Book Tickets - {event.name}</h2>
        
        <div className="mb-4">
          <label className="block mb-2">Number of Tickets</label>
          <div className="flex items-center">
            <button 
              onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              -
            </button>
            <span className="mx-4">{ticketCount}</span>
            <button 
              onClick={() => setTicketCount(Math.min(event.availableTickets, ticketCount + 1))}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              +
            </button>
          </div>
        </div>
        
        <div className="mb-4">
          <p>Total Price: ${event.price * ticketCount}</p>
        </div>
        
        <div className="flex justify-between">
          <button 
            onClick={onClose} 
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirm} 
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component with Event Filtering
const EventBookingApp = () => {
  const [events, setEvents] = useState(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filter, setFilter] = useState('All');

  const handleBookTicket = (event) => {
    setSelectedEvent(event);
  };

  const handleConfirmBooking = (event, ticketCount) => {
    setEvents(prevEvents => 
      prevEvents.map(e => 
        e.id === event.id 
          ? { ...e, availableTickets: e.availableTickets - ticketCount }
          : e
      )
    );
    alert(`Successfully booked ${ticketCount} ticket(s) for ${event.name}!`);
  };

  // Get unique categories
  const categories = ['All', ...new Set(initialEvents.map(event => event.category))];

  // Filter events
  const filteredEvents = filter === 'All' 
    ? events 
    : events.filter(event => event.category === filter);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Event Booking Platform</h1>
      
      {/* Category Filter */}
      <div className="flex justify-center mb-6">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`mx-2 px-4 py-2 rounded ${
              filter === category 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Events Grid - 4 per row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredEvents.map(event => (
          <EventCard 
            key={event.id} 
            event={event} 
            onBookTicket={handleBookTicket} 
          />
        ))}
      </div>

      {selectedEvent && (
        <BookingModal 
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
};

export default EventBookingApp;