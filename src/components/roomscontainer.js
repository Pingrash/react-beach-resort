import React from 'react'
import RoomsFilter from './roomsfilter';
import RoomsList from './roomslist';
import { withRoomConsumer } from '../context';
import Loading from './loading';

function RoomContainer({context}) {
  const {loading, sortedRooms, rooms} = context;
  if (loading) {
    return <Loading/>
  }
  return (
    <>
      <RoomsFilter rooms={rooms}/>
      <RoomsList rooms={sortedRooms}/>
    </>
  );
}

export default withRoomConsumer(RoomContainer);


// import React from 'react'
// import RoomsFilter from './roomsfilter';
// import RoomsList from './roomslist';
// import { RoomConsumer } from '../context';
// import Loading from './loading';

// export default function RoomsContainer() {
//   return (
//     <RoomConsumer>
//       {value => {
//           const { loading, sortedRooms, rooms } = value;
//           if (loading) {
//             return <Loading />;
//           }
//           return (
//             <div>
//               Hello from rooms container
//               <RoomsFilter rooms={rooms}/>
//               <RoomsList rooms={sortedRooms}/>
//             </div>
//           );
//         }
//       }
//     </RoomConsumer>   
//   );
// }
