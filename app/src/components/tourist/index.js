import React, { useState } from 'react';

// Event Data Model with additional details
export const initialEvents = [
  {
    id: 1,
    name: "Summer Music Festival",
    description: "An incredible outdoor music experience",
    fullDescription: "Join us for an unforgettable night of music under the stars. Featuring top international artists across multiple stages, local food vendors, and a vibrant atmosphere.",
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
    fullDescription: "Explore cutting-edge technologies, network with industry leaders, and gain insights into the future of innovation from global tech experts.",
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
    fullDescription: "Embark on a global culinary journey, sampling exquisite dishes from renowned chefs representing cuisines from every continent.",
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
    fullDescription: "A comprehensive showcase of innovative art installations, design trends, and creative works from emerging and established artists.",
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
    fullDescription: "A premier event featuring groundbreaking films from around the world, including premieres, director talks, and special screenings.",
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
    fullDescription: "A transformative retreat focusing on mental and physical wellness, featuring yoga sessions, meditation workshops, and holistic healing practices.",
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
    fullDescription: "The most exciting eSports event of the year, featuring top professional gamers, live tournaments, and cutting-edge gaming technology.",
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
    fullDescription: "An immersive experience into the latest scientific breakthroughs, space exploration technologies, and interactive research demonstrations.",
    date: "2024-10-20",
    time: "11:00",
    location: "National Science Center",
    capacity: 2000,
    availableTickets: 1500,
    price: 75,
    category: "Science"
  }
];

// Event Modal Component
const EventModal = ({ event, onClose, onBookTicket }) => {
  const [ticketCount, setTicketCount] = useState(1);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-2xl font-bold">{event.name}</h2>
          <button 
            onClick={onClose} 
            className="text-white hover:text-gray-200"
          >
            ✖
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Event Details */}
            <div>
              <img 
                src={`/api/placeholder/400/250?text=${event.name}`} 
                alt={event.name} 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="mr-2 text-blue-500">📅</span>
                  <span>{event.date} at {event.time}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-red-500">📍</span>
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-green-500">💰</span>
                  <span>${event.price} per ticket</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-purple-500">👥</span>
                  <span>{event.availableTickets} tickets remaining</span>
                </div>
              </div>
            </div>

            {/* Right Column - Booking & Description */}
            <div>
              <h3 className="text-xl font-semibold mb-3">About the Event</h3>
              <p className="text-gray-600 mb-4">{event.fullDescription}</p>

              <div className="mb-4">
                <label className="block mb-2 font-medium">Number of Tickets</label>
                <div className="flex items-center border rounded">
                  <button 
                    onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                    className="px-3 py-2 bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2">{ticketCount}</span>
                  <button 
                    onClick={() => setTicketCount(Math.min(event.availableTickets, ticketCount + 1))}
                    className="px-3 py-2 bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="bg-gray-100 p-3 rounded">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">
                    Total: ${event.price * ticketCount}
                  </span>
                  <button 
                    onClick={() => onBookTicket(event, ticketCount)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    disabled={event.availableTickets === 0}
                  >
                    {event.availableTickets === 0 ? 'Sold Out' : 'Book Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Event Card Component
const EventCard = ({ event, onCardClick }) => {
  return (
    <div 
      onClick={() => onCardClick(event)}
      className="border rounded-lg p-3 m-1 shadow-md hover:shadow-xl transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-base font-bold truncate">{event.name}</h2>
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
          {event.category}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="mr-2 text-blue-500">📅</span>
          <span className="text-sm">{event.date}</span>
        </div>
        
        <div className="flex items-center">
          <span className="mr-2 text-green-500">💰</span>
          <span className="text-sm">${event.price}</span>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const EventBookingApp = () => {
  const [events, setEvents] = useState(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filter, setFilter] = useState('All');

  const handleBookTicket = (event, ticketCount) => {
    setEvents(prevEvents => 
      prevEvents.map(e => 
        e.id === event.id 
          ? { ...e, availableTickets: e.availableTickets - ticketCount }
          : e
      )
    );
    alert(`Successfully booked ${ticketCount} ticket(s) for ${event.name}!`);
    setSelectedEvent(null);
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
      <div className="flex justify-center mb-6 flex-wrap">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`m-1 px-4 py-2 rounded ${
              filter === category 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Events Grid - 6 per row on large screens */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
        {filteredEvents.map(event => (
          <EventCard 
            key={event.id} 
            event={event} 
            onCardClick={setSelectedEvent}
          />
        ))}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal 
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onBookTicket={handleBookTicket}
        />
      )}
    </div>
  );
};

export default EventBookingApp;