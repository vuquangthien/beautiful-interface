import routes from '../routes';

export const useRouteName = () => {
  let name = '';
  routes.forEach(route => {
    if (window.location.href.indexOf(route.layout + route.path) !== -1) {
      // eslint-disable-next-line prefer-destructuring
      name = route.name;
    }
  });
  return name;
};
