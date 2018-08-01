import fetch from 'isomorphic-unfetch';

const url = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&appid=c5d3517047b498ec9acdf96d5a996ab1';

const Page =  (props) => (
  <div>
    <h2>{props.name} Weather</h2>
    <div>Current temperature: {props.temp.temp}F</div>
    <div>Min temperature: {props.temp.temp_min}F</div>
    <div>Max temperature: {props.temp.temp_max}F</div>
    <div>Humidity: {props.temp.humidity}%</div>
  </div>
)

Page.getInitialProps = async (context) => {
  const { city } = context.query
  const res = await fetch(`${url}&q=${city},us`)
  const data = await res.json()
  // merged to props
  return {
    name: data.name,
    temp: data.main
  }
}

export default Page;