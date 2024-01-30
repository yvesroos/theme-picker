import ColorSetterScreen from "./containers/ColorSetterScreen";
import MainScreen from "./containers/MainScreen";
import { Route } from "./types";

const routes: Route[] = [
  {
    id: "main",
    component: <MainScreen />,
    title: "Main screen",
    default: true,
  },
  {
    id: "color-1",
    component: <ColorSetterScreen index={0} key="color-screen-1" />,
    title: "Set color #1",
  },
  {
    id: "color-2",
    component: <ColorSetterScreen index={1} key="color-screen-2" />,
    title: "Set color #2",
  },
];

export default routes;
