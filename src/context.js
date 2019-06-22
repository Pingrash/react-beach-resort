import React, { Component } from 'react'
//import items from './data';
import Client from './contentful';

/*
  Context API for room data.
  In current state the room data is pulled from data.js and mapped into arrays which are set to the API's state.
  In index.js the entire app is wrapped in <RoomProvider> which allows every component to access the RoomContext's properties and state.
*/

const RoomContext = React.createContext();

class RoomProvider extends Component {

  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };

  // getData
  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: 'beachResortRoom',
        order: 'fields.price'
      });
      // Format the data from Contentful response into room objects
      let rooms = this.formatData(response.items);
      // Filter all rooms that have the featured property set to true
      let featuredRooms = rooms.filter(_room => _room.featured === true);
      // Find the max price and size of the rooms to set to the state
      // Done this way instead of hard coding a price to account for any future rooms that may get added
      let maxPrice = Math.max(...rooms.map(_item => _item.price));
      let maxSize = Math.max(...rooms.map(_item => _item.size));
      // Update the state
      this.setState({
        rooms, 
        featuredRooms, 
        sortedRooms: rooms, 
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize
      })

    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    this.getData()
  }

  formatData(items) {
    let tempItems = items.map(_item => {
      let id = _item.sys.id;
      let images = _item.fields.images.map(_img => _img.fields.file.url);
      let room = {..._item.fields, images, id}

      return room;
    });
    return tempItems;
  }

  // Returns the room based on the slug passed into the function
  // Used on singleroom.js
  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(_room => _room.slug === slug);

    return room;
  }

  // Takes the event target and updates the state based on that value
  // filterRooms is called after the state has been updated
  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = event.target.name;

    this.setState({
      [name]:value
    }, this.filterRooms);
  }

  // Creates an array of the current state room fields then assigns them to a new array called tempRooms
  // This array is then filtered over to match the users search and then is assigned to the sortedRooms state field
  filterRooms = () => {
    let{rooms, type, capacity, price, minSize, maxSize, breakfast, pets} = this.state;

    // All of the rooms
    let tempRooms = [...rooms];
    // Parse values as integers
    // This is necessary as the form inputs return strings instead of integers to the state` 
    capacity = parseInt(capacity);
    price = parseInt(price);
    minSize = parseInt(minSize);
    maxSize = parseInt(maxSize);

    // Filter by type
    if (type !== 'all') {
      tempRooms = tempRooms.filter(room => room.type === type);
    }

    // Filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }

    // Filter by price
    tempRooms = tempRooms.filter(room => room.price <= price);

    // Filter by size
    tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);

    // Filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }

    // Filter by pets
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true);
    }

    this.setState({
      sortedRooms: tempRooms
    });
  }

  render() {
    return (
      <RoomContext.Provider value={{...this.state, getRoom:this.getRoom, handleChange:this.handleChange}}>
        {this.props.children}
      </RoomContext.Provider>
    )
  }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value}/>}
      </RoomConsumer>
    );
  }
}

export { RoomProvider, RoomConsumer, RoomContext };