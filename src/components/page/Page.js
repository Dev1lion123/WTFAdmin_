import React, { useEffect } from "react";
import Contacts from "../Contacts/Contacts";


const Page = () => {
  useEffect(() => {
    function myVisibility() {
      function onEntry(entry) {
        entry.forEach((change) => {
          if (change.isIntersecting) {
            change.target.classList.add("element-show");
          }
        });
      }

      let options = {
        threshold: [0.5],
      };
      let observer = new IntersectionObserver(onEntry, options);
      let elements = document.querySelectorAll(".element-animation");

      for (let elm of elements) {
        observer.observe(elm);
      }
    }

    myVisibility();
  }, []);

  return (
    <div>
      <div className="page">
        <Contacts />
      </div>
    </div>
  );
};

export default Page;
