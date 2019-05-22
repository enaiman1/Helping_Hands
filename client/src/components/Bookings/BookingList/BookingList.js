import React from 'react';

import './BookingList.css';

const bookingList = props => (
  <ul className="bookings__list">
    {props.bookings.map(booking => {
      return (
        <React.Fragment>
        <div >
          <h1 className="bookingTitle">Booked Events</h1>
          <p className="bookingContent"> Here is your list of events you have registared for</p>
        </div>
        <li key={booking._id} className="bookings__item">
          <div className="bookings__item-data">
            {booking.event.title} -{' '}
            {new Date(booking.createdAt).toLocaleDateString()}
          </div>
          <div className="bookings__item-actions">
            <button className="btn" onClick={props.onDelete.bind(this, booking._id)}>Cancel</button>
          </div>
        </li>
        </React.Fragment>
      );
    })}
  </ul>
);

export default bookingList;
