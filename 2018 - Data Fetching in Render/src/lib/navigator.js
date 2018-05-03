import createHistory from "history/createHashHistory";

export default function createHistoryNavigator() {
  const history = createHistory();
  const navigator = {
    listen(cb) {
      return history.listen(() => cb(navigator.getCurrentIndex()));
    },
    getCurrentIndex() {
      const pathname = history.location.pathname.slice(1);
      return (pathname && parseInt(pathname, 10) - 1) || 0;
    },
    setIndex(idx) {
      history.push(`/${idx + 1}`);
    },
  };
  return navigator;
}
