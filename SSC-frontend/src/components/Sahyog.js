import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTeam, fetchEvents } from '../reducers/sahyogReducer';
import sstyles from './sahyog.module.css'
import sahyog from '../images/sahyog_logo.jpg'
import Type from './Typesahyog'
import { AiFillInstagram, AiFillLinkedin, AiFillMail } from "react-icons/ai";
const Sahyog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { team, events, loading, error } = useSelector((state) => state.sahyogReducer);

  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    dispatch(fetchTeam());
    dispatch(fetchEvents());
    fetchCarouselImages();
  }, [dispatch]);

  const fetchCarouselImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sliderImages/sahyog');
      setCarouselImages(response.data); // Assuming response.data is an array of image URLs
    } catch (error) {
      console.error('Error fetching carousel images:', error);
    }
  };
  const handleJoinClick = () => {
    window.location.href = 'https://chat.whatsapp.com/DVChQ1r0P70AbOzvFrGWDg';
  };

  const handleRegisterClick = (club, event) => {
    navigate(`/register/${club}/${event}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
 

  return (
    <>
      <div className={`${sstyles.carousel_container} `}>
        <div
          id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            {carouselImages && carouselImages.length > 0 ? (
              carouselImages.map((carouselimage, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <img src={`http://localhost:5000/${carouselimage.imageUrl.replace(/\\/g, '/')}`} alt="" />
                </div>
              ))
            ) : (
              <p>No carousel images found.</p>
            )}
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className={sstyles.club_header}>
        <h2 className={sstyles.club_name}>Sahyog</h2>
        <div className={sstyles.type}>
          {" "}<Type />{" "}
        </div>
      </div>


      <div className={`${sstyles.about} ${sstyles.container}`}>
        <img src={sahyog} alt="" />
        <div className={sstyles.aboutContent}>
          <h3>About Us</h3>
          <p className={sstyles.dis}>
            The Sahyog Club, a fundamental component of the Social Service
            Council at IIT (BHU) Varanasi, is dedicated in extending support to
            the marginalized and underprivileged segments of our community. Our
            primary objective is to uplift these sections by fostering knowledge
            and mutual empowerment, thus brightening the lives that have long
            been shrouded in darkness.
          </p>
          <button onClick={handleJoinClick} className={`${sstyles.btn} ${sstyles.btnSecondary}`}>
            Join Us
          </button>
        </div>
      </div>

      <div className={sstyles.eventsBack}></div>
      <div className={`${sstyles.events} ${sstyles.container}`}>

        <h2>Events & Activities</h2>

        {events.map((event, index) => (
          <div className={sstyles.event} key={index}>
            <div className={sstyles.eventContent}>
              <h3>{event.title}</h3>
              <p>{event.desc}</p>
              <div className="home-btn">
                <button onClick={() => handleRegisterClick('sahyog', event.title)} className="home-getStartBtn" style={{ color: '#fff' }}>
                  Register Now
                </button>
              </div>
            </div>
            <img className={sstyles.img_ani} src={`http://localhost:5000/${event.image.replace(/\\/g, '/')}`} alt="" />
            <div className={sstyles.date}></div>
          </div>
        ))}
      </div>

      <div className={sstyles.home_container}>
        <h1 className={sstyles.heading}> Meet Our Team </h1>

        <div className={sstyles.row}>
          {team.map((member, index) => (
            <div className={sstyles.profile_card} key={index}>
              <div className={sstyles.img}>
                <img src={`http://localhost:5000/${member.image.replace(/\\/g, '/')}`} alt="" />
              </div>
              <div className={sstyles.caption}>
                <h3>{member.name}</h3>
                <p>{member.post}</p>
                <div className={sstyles.homePage_icons}>
                  <div className={sstyles.social_icons}>
                    <a href={member.instaLink}>
                      <AiFillInstagram />
                    </a>
                  </div>
                  <div className={sstyles.social_icons}>
                    <a href={member.facebookLink}>
                      <AiFillMail />
                    </a>
                  </div>
                  <div className={sstyles.social_icons}>
                    <a href={member.linkdinLink}>
                      <AiFillLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
export default Sahyog

