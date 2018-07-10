import Link from 'next/link';

const TodoItem = (props) => (
  <li>
    <Link href={`/todo?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
)

export default () => (
  <div>
    <h2>Todo List</h2>
    <ul>
      <TodoItem title="Learn JavaScript" />
      <TodoItem title="Learn React.js" />
      <TodoItem title="Learn Next.js" /> 
    </ul>
  </div>
)