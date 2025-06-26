import React from 'react'
import './FeedbackCss.scss'
import FeedbackCards from './FeedbackCards'
import user1 from '../../assets/user1.jpg'
import user2 from '../../assets/user2.jpg'
import user3 from '../../assets/user3.jpg'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Feedback = () => {
    const userProfile = [
  {
    image: user1,
    name: "Finzz Miller",
    description:
      "Absolutely fresh veggies every single time! I’ve been ordering for months now and the consistency is unmatched. The taste, texture and overall quality remind me of farm fresh produce."
  },
  {
    image: user2,
    name: "Millie Carey",
    description:
      "I love how clean and vibrant the vegetables look. The packaging is neat, delivery is prompt and every item feels handpicked with care. Definitely a go to for healthy living."
  },
  {
    image: user3,
    name: "Carlos Buze",
    description:
      "Shopping here feels like getting vegetables from my grandma’s backyard. The aroma, freshness and crunch are just perfect. I’ve recommended this to friends and they love it too!"
  }
];


    let settings = {
            dots: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            pauseOnHover: true
          };
  return (
    <section id='reviews'>
    <div className="feedback-container">
        <h4>Look what our customer says</h4>
            <Slider {...settings} className="card-container">
                {userProfile.map((user, index) => (
                    <FeedbackCards
                    key={index}
                    img={user.image}
                    name={user.name}
                    desc={user.description}
                    />
                ))}
            </Slider>
        <hr className='hr-line'/>    
    </div>
    </section>
  )
}

export default Feedback