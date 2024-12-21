import React from 'react';

const Testimonial = ({ quote, author }) => (
  <div className="testimonial">
    <p>"{quote}"</p>
    <p className="author">- {author}</p>
  </div>
);

const Testimonials = ({ testimonials }) => (
  <section className="testimonials">
    <h2>Testimonials</h2>
    {testimonials.map((testimonial, index) => (
      <Testimonial key={index} {...testimonial} />
    ))}
  </section>
);

export default Testimonials;

