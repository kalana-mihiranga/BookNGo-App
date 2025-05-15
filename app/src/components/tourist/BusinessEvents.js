import React, { useState, useEffect } from 'react';

const BusinessEvents = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async (page) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Adjust based on your auth setup
      const response = await fetch(`http://localhost:5000/api/business/getPaginatedEvents?page=${page}&limit=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.status) {
        setEvents(data.events);
        setTotalPages(data.totalPages);
      } else {
        console.error('Failed to fetch events:', data.message);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage]);

  return (
    <div>
      <h2>Business Events</h2>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <>
          <ul>
            {events.map((event) => (
              <li key={event.eventId}>
                <h3>{event.name}</h3>
                <p>Category: {event.category}</p>
                <p>Location: {event.location}</p>
                <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                <p>Price: ${event.price}</p>
                <p>Bookings: {event.currentBookingCount}</p>
              </li>
            ))}
          </ul>
          <div>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BusinessEvents;
