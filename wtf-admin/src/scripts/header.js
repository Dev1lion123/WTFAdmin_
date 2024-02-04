function myHeader() {
  var prevScrollPos = window.scrollY;
  window.onscroll = function () {
    let header = document.querySelector(".header");

    var currentScrollPos = window.scrollY;
    if (prevScrollPos > currentScrollPos) {
      header.style.top = "0";
      header.style.boxShadow = " 0 16px 20px rgba(0,0,0,0.2);";
      header.style.transition = "all .7s ease-out";
    } else {
      document.querySelector(".header").style.top = "-70px";
    }
    prevScrollPos = currentScrollPos;
  };
}

export default myHeader;
