import NavBar from './nav-bar'

const appStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const App = (props) => (
  <div style={appStyle}>
    <NavBar />
    {props.children}
  </div>
)

export default App