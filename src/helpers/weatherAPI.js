const token = import.meta.env.VITE_TOKEN;

export const searchCities = async (term) => {
  const response = await fetch(
    `http://api.weatherapi.com/v1/search.json?lang=pt&key=${token}&q=${term}`,
  );
  const data = await response.json();

  if (!data.length) window.alert('Nenhuma cidade encontrada');
  return data;
};
export const getWeatherByCity = async (cityURL) => {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?lang=pt&key=${token}&q=${cityURL}`,
  );
  const data = await response.json();
  const obj = {
    name: data.location.name,
    country: data.location.country,
    temp: data.current.temp_c,
    condition: data.current.condition.text,
    icon: data.current.condition.icon,
    url: cityURL,
  };
  return obj;
};

export const seeForecast = async (url) => {
  const days = 7;
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?lang=pt&key=${token}&q=${url}&days=${days}`,
  );
  const data = await response.json();
  const forecast = data.forecast.forecastday;
  const forecastList = forecast.map((day) => {
    return {
      date: day.date,
      maxTemp: day.day.maxtemp_c,
      minTemp: day.day.mintemp_c,
      condition: day.day.condition.text,
      icon: day.day.condition.icon,
    };
  });
  return forecastList;
};
