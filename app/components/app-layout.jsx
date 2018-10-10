import NavBar from './nav-bar';
import css from '../css/app-layout.css';

// const appStyle = {
//   margin: 20,
//   padding: 20,
//   border: '1px solid #DDD'
// }

const AppLayout = (props) => (
  // <div style={appStyle}>
  <div className={css.app}>
    <NavBar />
    {props.children}
  </div>
)

export default AppLayout