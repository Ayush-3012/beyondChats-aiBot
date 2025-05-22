import { Bouncy } from "ldrs/react";
import "ldrs/react/Bouncy.css";

const Loader = ({ darkMode }) => {
  return (
    <>
      <div className="flex justify-start">
        <div className="animate-pulse">
          <Bouncy
            size="35"
            speed="1.25"
            color={`${darkMode ? "white" : "black"}`}
          />
        </div>
      </div>
    </>
  );
};

export default Loader;
