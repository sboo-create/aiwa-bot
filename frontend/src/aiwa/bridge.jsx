import React from "react";
import { createRoot } from "react-dom/client";
import { HomeScreen } from "./screens/HomeScreen";
import { FoodScreen } from "./screens/FoodScreen";
import { ActivityScreen } from "./screens/ActivityScreen";
import { ChatScreen } from "./screens/ChatScreen";
import { Navigation } from "./screens/Navigation";
import { read } from "./lib/api";
import { prefetchScreens } from "./lib/screenData";
import { installToast } from "./lib/toast.jsx";

let homeRoot = null;
let homeElement = null;
let homeProps = null;
let homePanel = "";
let profileOpen = false;
let panelRevision = 0;
let navRoot = null;
let navElement = null;
let navActive;
let foodRoot = null;
let foodElement = null;
let foodProps = {};
let foodRevision = 0;
let activityRoot = null;
let activityElement = null;
let activityProps = {};
let activityRevision = 0;
let chatRoot = null;
let chatElement = null;

const renderCurrentHome = () => {
  if (!homeRoot || !homeProps) return;
  homeRoot.render(
    <HomeScreen
      {...homeProps}
      panel={homePanel}
      panelRevision={panelRevision}
      profileOpen={profileOpen}
      onPanelClose={() => bridge.closePanel()}
      onProfileClose={() => bridge.closeProfile()}
    />,
  );
};

export const bridge = {
  renderHome(element, props) {
    if (!element) return;
    if (homeElement !== element) {
      homeRoot?.unmount();
      homeElement = element;
      homeRoot = createRoot(element);
    }
    homeProps = props;
    homePanel = props.panel || homePanel;
    renderCurrentHome();
  },
  patchHome(nextProps) {
    if (!homeRoot || !homeProps) return;
    homeProps = { ...homeProps, ...nextProps };
    renderCurrentHome();
  },
  openPanel(panel) {
    homePanel = panel;
    window.HOME_PANEL = panel;
    panelRevision += 1;
    renderCurrentHome();
  },
  closePanel() {
    homePanel = "";
    window.HOME_PANEL = "";
    renderCurrentHome();
  },
  openProfile() {
    profileOpen = true;
    renderCurrentHome();
  },
  closeProfile() {
    profileOpen = false;
    renderCurrentHome();
  },
  refreshPanel() {
    panelRevision += 1;
    renderCurrentHome();
  },
  unmountHome() {
    homeRoot?.unmount();
    homeRoot = null;
    homeElement = null;
    homeProps = null;
  },
  // Повторный вызов для уже смонтированного экрана = «перечитай данные»:
  // так host сбрасывает loadedFood/loadedTrain после правок профиля.
  renderFood(element, props = {}) {
    if (!element) return;
    if (foodElement !== element) {
      foodRoot?.unmount();
      foodElement = element;
      foodRoot = createRoot(element);
    } else foodRevision += 1;
    foodProps = props;
    foodRoot.render(<FoodScreen {...foodProps} revision={foodRevision} />);
  },
  renderActivity(element, props = {}) {
    if (!element) return;
    if (activityElement !== element) {
      activityRoot?.unmount();
      activityElement = element;
      activityRoot = createRoot(element);
    } else activityRevision += 1;
    activityProps = props;
    activityRoot.render(<ActivityScreen {...activityProps} revision={activityRevision} />);
  },
  renderChat(element, props = {}) {
    if (!element) return;
    if (chatElement !== element) {
      chatRoot?.unmount();
      chatElement = element;
      chatRoot = createRoot(element);
    }
    chatRoot.render(<ChatScreen initialMessages={props.messages || []} />);
  },
  refreshFood() {
    if (!foodElement || !foodRoot) return;
    foodRevision += 1;
    foodRoot.render(<FoodScreen {...foodProps} mode={read("aiwaMode") || foodProps.mode} revision={foodRevision} />);
  },
  /** Прогрев данных «Питания» и «Нагрузки» на старте — чтобы табы открывались сразу. */
  prefetch() {
    prefetchScreens();
  },
  renderNav(element, active) {
    if (!element) return;
    if (navElement !== element) {
      navRoot?.unmount();
      navElement = element;
      navRoot = createRoot(element);
      navActive = undefined;
    }
    // go() зовёт renderNav на каждый переход, включая повторные тапы по тому же
    // табу — без гарда перерисовка ремоунтила TabBar (key) и мигала индикатором.
    if (navActive === active) return;
    navActive = active;
    navRoot.render(<Navigation active={active} />);
  },
};

export function installBridge() {
  window.AiwaDeslop = bridge;
  installToast();
  window.dispatchEvent(new CustomEvent("aiwa:deslop-ready"));
}
