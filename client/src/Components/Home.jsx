/** @format */
import React, { useState, useRef, useEffect } from 'react';
import "./home.css";

import img1 from "./images/classroom.jpg"; 
import img2 from "./images/girl.png"; 

  
export default function Home() {

	const [currentSlide, setCurrentSlide] = useState(0);
	const slideRef = useRef(null);
  
	const nextSlide = () => {
	  setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
	};
  
	const prevSlide = () => {
	  setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
	};
  
	useEffect(() => {
	  if (slideRef.current) {
		slideRef.current.style.transform = `translate(-${currentSlide * 50}%)`;
	  }
	}, [currentSlide]);
  
	const slides = [
	  {
		image: img1,
		text: "News Article 1: [Insert brief news summary]",
	  },
	  {
		image: img2,
		text: "News Article 2: [Insert brief news summary]",
	  },
	  // Add more slides here
	];

	return (

		<div className="home-page">

           <div className="above">
		   <h1>Welcome to Schoolpaddy</h1> 

			<div className='nav'>
      {/*<img src={img} alt="School Logo" className='img' /> */ } 
					<div id="links">
						<ul>
							<li><a href="#Home">Home</a></li>
							<li><a href="#About">About</a></li>
							<li><a href="#Service">Service</a></li>
							<li>
								<a href="Contact.html">Contact</a>
							</li>
						</ul>
						</div>
			</div>
			</div> 

    
		{	/* <div className="image">
				<img className="img" src={img2} alt="" />
			</div> */
          }
			
				<div className="second">

        <div className="featured-section"><br />

          <h1>Featured News</h1> <br />

           <div className="news-slider">

         <div className="slider-container" ref={slideRef}>
            {slides.map((slide, index) => (

                <div className="slide" key={index}>
                  <p>{slide.text}</p>
                </div>
              )
			)}
            </div>

            <button className="prev" onClick={prevSlide}>&#10094;</button>
            <button className="next" onClick={nextSlide}>&#10096;</button>
          </div>

        </div>

				</div>
      
				<div className="grid">
					<div className="box">

					<a href="/students">Student Portal</a>

					</div>
					<div className="box">
					<a href="/teachers">Teacher Portal</a>
					</div>
					<div className="box">
					<a href="/admin">Admin Portal</a>
					</div>
				</div>
           

				</div>
			
		

	);
}
