import React from 'react'
import {Link} from "react-router-dom";

const Landing = () => {
    return (
        <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 style={{color: "#3aafa9",letterSpacing: "2px"}} className="x-large">Dev&#45;Corner</h1>
          <p className="lead" style={{color: "#feffff" }}>
            Join us for an exciting journey in the world of technology.
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
          </div>
        </div>
      </div>
    </section>
    )
}

export default Landing;
