import React, { Component } from 'react';
import { RoomContext } from '../context';
import Loading from './loading';
import Room from './room';
import Title from './title';


export default class FeaturedRooms extends Component {

  static contextType = RoomContext;

  render() {

    // Destructure loading and featureRooms from the RoomContext API state and assugn them to variables
    let { loading, featuredRooms: rooms } = this.context;
    // Map an array of the rooms set as Room components
    rooms = rooms.map(_room => {
      return <Room key={_room.id} room={_room} />
    })

    return (
      <section className='featured-rooms'>
        <Title title='featured rooms' />
        <div className='featured-rooms-center'>
          {loading ? <Loading /> : rooms}
        </div>
      </section>
    )
  }
}
