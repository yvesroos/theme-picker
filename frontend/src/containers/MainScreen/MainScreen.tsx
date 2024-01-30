import BackgroundColorSection from "../../components/BackgroundColorSection";
import useQueryParam from "../../hooks/useQueryParam";
import "./MainScreen.css";

const MainScreen = () => {
  const [color] = useQueryParam("theme", "");
  return (
    <BackgroundColorSection bgColor={color}>
      <h2 className="text__welcome">Welcome to the theme picker application</h2>
    </BackgroundColorSection>
  );
};

export default MainScreen;
