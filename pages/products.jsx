import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import AppLayout from '../components/app-layout';

const url = 'http://localhost:3000/api/products';

const ListItem = (props) => (
  <li>
    <Link href={`/product?id=${props.id}`}>
      <a>{props.name}</a>
    </Link>
  </li>
)

const Page = (props) => (
  <AppLayout>
    <h3>Product List</h3>
    <ul>
    {
      props.products.map(p => <ListItem key={p.id} id={p.id} name={p.name} />)
    }
    </ul>
  </AppLayout>
)

Page.getInitialProps = async () => {
  const res = await fetch(url)
  const products = await res.json()
  // merged to props
  return { products }
}

export default Page;