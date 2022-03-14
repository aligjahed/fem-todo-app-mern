import desktopLight from "../assets/images/bg-desktop-light.jpg";
import desktopDark from "../assets/images/bg-desktop-dark.jpg";
import mobileLight from "../assets/images/bg-mobile-light.jpg";
import mobileDark from "../assets/images/bg-mobile-dark.jpg";

const Background = () => {
  return (
    <div className="w-full absolute top-0 z-0">
      <img
        className="hidden md:block dark:hidden w-screen"
        src={desktopLight}
        alt="background"
      />
      <img
        className="hidden dark:md:block w-screen"
        src={desktopDark}
        alt="background"
      />
      <img
        className="md:hidden dark:hidden w-screen"
        src={mobileLight}
        alt="background"
      />
      <img
        className="hidden dark:md:hidden dark:block w-screen"
        src={mobileDark}
        alt="background"
      />
    </div>
  );
};
export default Background;
