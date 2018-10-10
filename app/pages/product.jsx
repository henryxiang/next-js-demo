import fetch from 'isomorphic-unfetch';
import AppLayout from '../components/app-layout';

const url = 'http://localhost:3000/api/product';

const Page = (props) => (
  <AppLayout>
    <h3>{props.product.name}</h3>
    <p>{props.product.description}</p>
  </AppLayout>
);

Page.getInitialProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(`${url}/${id}`);
  const product = await res.json();
  // merged to props
  return { product };
}

export default Page;
