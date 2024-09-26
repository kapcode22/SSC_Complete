// Navbar.js

import React, { useState, useEffect } from 'react';
import NavBar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from 'react-router-dom';
import SSC from "../images/ssclogo-removebg-preview.png";
import "./Home.css";
import { AiOutlineUser } from "react-icons/ai";

const Navbar = () => {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function scrollHandler() {
      if (window.scrollY >= 20) {
        updateNavbar(true);
      } else {
        updateNavbar(false);
      }
    }
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <NavBar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky navbar" : "navbar"}
    >
      <Container style={{ paddingTop: '10px' }}>
        <NavBar.Brand as={Link} to="/" className="d-flex">
          <img src={SSC} className="img-fluid logo" alt="brand" />
        </NavBar.Brand>
        <NavBar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </NavBar.Toggle>
        <NavBar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="home">
            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                Home
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={Link} to="/about" onClick={() => updateExpanded(false)}>
                About US
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={Link} to="/team" onClick={() => updateExpanded(false)}>
                Team
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={Link} to="/updates" onClick={() => updateExpanded(false)}>
                Updates
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={Link} to="/donate" onClick={() => updateExpanded(false)}>
                Donate Us
              </Nav.Link>
            </Nav.Item>

            <Dropdown>
              <Dropdown.Toggle as={Nav.Link} id="dropdown-custom-components">
                 Club
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/spc" onClick={() => updateExpanded(false)} className="dropdown-item">
                  SPC
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/ku" onClick={() => updateExpanded(false)} className="dropdown-item">
                  KU
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/hhc" onClick={() => updateExpanded(false)} className="dropdown-item">
                  HHC
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/sahyog" onClick={() => updateExpanded(false)} className="dropdown-item">
                  Sahyog
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
            
            {localStorage.getItem('token') && (
             <Dropdown>
             <Dropdown.Toggle as={Nav.Link} id="dropdown-custom-components">
               Admin Access
             </Dropdown.Toggle>

             <Dropdown.Menu>
             <Dropdown.Item as={Link} to="/admin/add"  onClick={() => updateExpanded(false)} className="dropdown-item">
               Add Admin
               </Dropdown.Item>
               <Dropdown.Item as={Link} to="/admin/updates"  onClick={() => updateExpanded(false)} className="dropdown-item">
               Add Updates
               </Dropdown.Item>
               <Dropdown.Item as={Link} to="/admin/addPH" onClick={() => updateExpanded(false)} className="dropdown-item">
               Add PostHolders
               </Dropdown.Item>
               <Dropdown.Item as={Link} to="/admin/list" onClick={() => updateExpanded(false)} className="dropdown-item">
               List Admin
               </Dropdown.Item>
               <Dropdown.Item as={Link} to="/admin/addSI" onClick={() => updateExpanded(false)} className="dropdown-item">
                Add SliderImages
               </Dropdown.Item>
               <Dropdown.Item as={Link} to="/admin/addevents" onClick={() => updateExpanded(false)} className="dropdown-item">
                Add Events
               </Dropdown.Item>
             </Dropdown.Menu>
           </Dropdown>
            )}
           

            {localStorage.getItem('token') ? (
              <Nav.Item>
                <button className="navbar-button" onClick={() => { localStorage.clear(); navigate('/') }}>Logout</button>
              </Nav.Item>
            ) : (
              <Nav.Item>
                <button className="navbar-button" onClick={() => { navigate('/admin/login') }}>Login</button>
              </Nav.Item>
            )}
          </Nav>
        </NavBar.Collapse>
      </Container>
    </NavBar>
  );
};

export default Navbar;
