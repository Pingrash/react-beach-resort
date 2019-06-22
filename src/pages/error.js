import React from 'react';
import Hero from '../components/hero';
import { Link } from 'react-router-dom';
import Banner from '../components/banner';

// A custom error 404 page for users to be directed to if they try to load a non-existant page
// Contains a link to return to home page

export default function Error() {
  return(
    <Hero>
      <Banner title='404' subtitle='page not found'>
        <Link to='/' className='btn-primary'>
          return home
        </Link>
      </Banner>
    </Hero>
  );
}