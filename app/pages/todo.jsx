import { withRouter } from 'next/router'

const Todo = withRouter((props) => (
  <div>{props.router.query.title}</div>
))

export default Todo;