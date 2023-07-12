const host = 'https://dpg.gg';
const apiPath = 'test';
const endPoint = 'calendar.json'

const routes = {
  calendarPath: () => [host, apiPath, endPoint].join('/'),
};

export default routes;
