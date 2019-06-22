import React from 'react';
import Room from './room';

export default function RoomsList({rooms}) {

  if (rooms.length === 0) {
    return (
      <div className='empty-search'>
        <h3>unfortunately no rooms matched your search paramaters</h3>
      </div>
    );
  }

  return (
    <section className='roomslist'>
      <div className='roomslist-center'>
        {
          rooms.map(_item => {
            return <Room key={_item.id} room={_item}/>
          })
        }
      </div>
    </section>
  );
}
