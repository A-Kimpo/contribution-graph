import axios from 'axios';
import routes from './routes';
import { useEffect, useState } from 'react';
import Frame from './components/frame/Frame';

const App = () => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(routes.calendarPath());

      setDates({ ...data });
    };
    getData();
  }, []);

  return (
    <div className="App">
      <Frame dates={dates} />
    </div>
  );
};

export default App;
