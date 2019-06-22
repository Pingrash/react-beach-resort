import React, { Component } from 'react';
import Title from './title';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa';

export default class Services extends Component {

  state = {
    services: [
      {
        icon: <FaCocktail />,
        title: 'free cocktails',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit, Magni, corporis!'
      },
      {
        icon: <FaHiking />,
        title: 'endless hiking',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit, Magni, corporis!'
      },
      {
        icon: <FaShuttleVan />,
        title: 'free shuttle',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit, Magni, corporis!'
      },
      {
        icon: <FaBeer />,
        title: 'strongest beer',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit, Magni, corporis!'
      }
    ]
  };

  render() {
    return (
      <section className='services'>
        <Title title='services' />
        <div className='services-center'>
          {this.state.services.map((_item, index) => {
            return <article key={index} className='service'>
              <span>{_item.icon}</span>
              <h6>{_item.title}</h6>
              <p>{_item.info}</p>
            </article>
          })}
        </div>
      </section>
    )
  }
}
