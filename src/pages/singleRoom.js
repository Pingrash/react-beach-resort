import React, { Component } from 'react';
import defaultBcg from '../images/room-1.jpeg';
import Hero from '../components/hero';
import Banner from '../components/banner';
import { Link } from 'react-router-dom';
import { RoomContext } from '../context';
import StyledHero from '../components/styledhero';

export default class SingleRoom extends Component {

  constructor(props) {
    super(props);
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg
    };
  }

  static contextType = RoomContext;

  //componentDidMount() {}

  render() {

    const { getRoom } = this.context;
    const room = getRoom(this.state.slug);

    // Error handling for instances of the user trying to load a single-room page without that room existing
    if (!room) {
      return <div className='error'>
        <h3>no such room could be found...</h3>
        <Link to='/rooms' className='btn-primary'>back to rooms</Link>
      </div>
    }

    const { name, description, capacity, size, price, extras, breakfast, pets, images } = room;

    // Destructure the images array
    // The first image is assigned to mainImg and the rest of the array is set as a new array called defaultImg
    const [mainImg, ...defaultImg] = images;

    return (
      <>
        <StyledHero img={mainImg}>
          <Banner title={`${name} room`}>
            <Link to='/rooms' className='btn-primary'>
              back to rooms
            </Link>
          </Banner>
        </StyledHero>
        <section className='single-room'>
          <div className='single-room-images'>
            {defaultImg.map((item, name, index) => {
              return <img key={index} src={item} alt={name}/>
            })}
          </div>
          <div className='single-room-info'>
            <article className='desc'>
              <h3>details</h3>
              <p>{description}</p>
            </article>
            <article className='info'>
              <h3>info</h3>
              <h6>price : ${price}</h6>
              <h6>size: ${size} SQFT</h6>
              <h6>
                max capacity : {
                  capacity > 1 ? `${capacity} people` : `${capacity} person`
                }
              </h6>
              <h6>{pets ? 'pets allowed' : 'no pets allowed'}</h6>
              <h6>{breakfast && 'free breakfast included'}</h6>
            </article>
          </div>
        </section>
        <section className='room-extras'>
          <h6>extras</h6>
          <ul className='extras'>
            {extras.map((item, index) => {
              return <li key={index}>- {item}</li> 
            })}
          </ul>
        </section>
      </>
    );
  }
}