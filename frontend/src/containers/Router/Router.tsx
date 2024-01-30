import routeStore from "../../stores/NavigationStore";
import { Route } from "../../types";
import { observer } from "mobx-react-lite";
import "./Router.css";
import { reaction } from "mobx";
import ColorBlenderStore from "../../stores/ColorBlenderStore";
import { useEffect } from "react";
import useQueryParam from "../../hooks/useQueryParam";

const Router = observer(({ routes }: { routes: Route[] }) => {
  const [, updateUrl] = useQueryParam("theme", "");
  const activeRoute =
    routes.find((route) => route.id === routeStore.currentRoute) ||
    routes.find((route) => route.default);

  useEffect(() => {
    reaction(
      () => ColorBlenderStore.colorBlended,
      (color) => {
        if (color) {
          updateUrl(color);
        }
      }
    );
  }, []);

  return (
    <main>
      <nav className="nav">
        <ul className="nav__list">
          {routes.map((route) => (
            <li
              key={route.id}
              className={`nav__listitem ${
                activeRoute?.id === route.id ? "nav__listitem--active" : ""
              }`}
              onClick={() => routeStore.navigateTo(route.id)}
            >
              {route.title}
            </li>
          ))}
        </ul>
      </nav>
      {activeRoute?.component ?? null}
    </main>
  );
});

export default Router;
