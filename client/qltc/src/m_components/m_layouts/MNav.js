import { useState } from "react";
import { Link } from "react-router-dom";

const MNav = (props) => {
  const [nav, setNav] = useState("Dashboard");

  return (
    <div className="col-2 position-sticky">
      <div className="d-flex justify-content-center flex-wrap ">
        {props.links.map((link, index) => (
          <div
            key={index}
            className={
              "col-10 pt-2 pb-2 mt-2 mb-2 border border-primary rounded position-relative covered-div-a-tag" +
              (nav === link.name ? " bg-primary" : "")
            }
          >
            <Link
              className={
                "ps-4 text-decoration-none " +
                (nav === link.name ? " text-white" : "")
              }
              to={link.link}
              onClick={() => {
                setNav(link.name);
              }}
            >
              {link.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MNav;
