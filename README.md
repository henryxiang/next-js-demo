Next.js Demo
============

### Getting Started ###
```bash
mkdir ~/next-js-demo
cd ~/next-js-demo
npm init -y
npm install --save react react-dom next
```

### Create and Render the First Page ###
```bash
mkdir pages

cat << EOF > pages/index.jsx
export default () => (
  <p>Hello Next.js</p>
);
EOF

perl -i -pe 's/"test":.+$/"dev": "next"/' package.json

npm run dev
```

### Page Navigation ###
Page navigation with Next.js can be done with 'next/link' built-in component.

#### Create Two More Pages (about.jsx && products.jsx)
```javascript
// pages/about.jsx
export default () => (
  <div>
    <h3>About Us</h3>
  </div>
);
```

```javascript
// pages/products.jsx
export default () => (
  <div>
    <h3>Our Products</h3>
  </div>
);
```

#### Page Navigation (naive way)
```javascript
// pages/index.jsx
const linkStyle = {
  marginRight: 15
};

export default () => (
  <div>
    <a style={linkStyle} href="/">Home</a>
    <a style={linkStyle} href="/products">Products</a>
    <a style={linkStyle} href="/about">About</a>
    <p>Hello Next.js</p>
  </div>
);
```

#### Page Navigation (Next.js way)
```javascript
// pages/index.jsx
import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

export default () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/products">
      <a style={linkStyle}>Products</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
    <p>Hello Next.js</p>
  </div>
);
```

### Using React Components ###
Create a directory to hold component source files and let's name it "components".
```bash
mkdir components
```
* Note: The name of the component directory can be arbitrary but "components" is used by convention.

#### NavBar Component
```javascript
// components/nav-bar.jsx
import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

const NavBar = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/products">
      <a style={linkStyle}>Products</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
  </div>
);

export default NavBar;
```

#### Layout Component
```javascript
// components/app-layout.jsx
import NavBar from './nav-bar';

const appStyle = {
  margin: 20,
  padding: 20,
};

const AppLayout = (props) => (
  <div style={appStyle}>
    <NavBar />
    {props.children}
  </div>
);

export default AppLayout;
```

#### Refactoring Pages to Use AppLayout Component
```javascript
// pages/index.jsx
import AppLayout from '../components/app-layout';

export default () => (
  <AppLayout>
    <div>
      <h3>Welcome</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Commodi quod quasi facere eos distinctio, corporis optio eum eaque eligendi doloremque ea, 
        vel veniam perferendis esse quis assumenda nostrum deleniti quas.
      </p>
    </div>
  </AppLayout>
)
```

```javascript
// pages/about.jsx
import AppLayout from '../components/app-layout';

export default () => (
  <AppLayout>
    <div>
      <h3>About Us</h3>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
        Incidunt nam dolorem at eum? Dolorum adipisci et voluptatem, 
        excepturi expedita dicta quas perferendis, error ipsum sed harum. 
        Non magni corporis dolore.
      </p>
    </div>
  </AppLayout>
);
```

```javascript
// pages/products.jsx
import AppLayout from '../components/app-layout';

export default () => (
  <AppLayout>
    <div>
      <h3>Products</h3>
      <ul>
        <li>Product 1</li>
        <li>Product 2</li>
        <li>Product 3</li>
        <li>Product 4</li>
        <li>Product 5</li>
      </ul>
    </div>
  </AppLayout>
);
```


### Dynamic Pages ###
Pattern: a listing page with links to details of list items

#### Dynamic Page - Listing
```javascript
// pages/products.jsx
import AppLayout from '../components/app-layout';
import Link from 'next/link';

const ListItem = (props) => (
  <li>
    <Link href={`/product?id=${props.id}`}>
      <a>{props.name}</a>
    </Link>
  </li>
);

export default () => (
  <AppLayout>
    <div>
      <p>Products</p>
      <ul>
        <ListItem id="1" name="Product 1"></ListItem>
        <ListItem id="2" name="Product 2"></ListItem>
        <ListItem id="3" name="Product 3"></ListItem>
        <ListItem id="4" name="Product 4"></ListItem>
        <ListItem id="5" name="Product 5"></ListItem>
      </ul>
    </div>
  </AppLayout>
);
```

#### Dynamic Page - Item Detail
```javascript
// pages/product.jsx
import { withRouter } from 'next/router'
import AppLayout from '../components/app-layout';

const Product = withRouter((props) => (
  <AppLayout>
    <p>
      Description of Product {props.router.query.id}:<br />
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere quis quod natus soluta tempora porro, 
      possimus facilis cupiditate culpa ex qui alias ut fugiat consequuntur, laudantium ullam necessitatibus, 
      accusantium beatae!
    </p>
  </AppLayout>
));

export default Product;
```


### Customer Server with Express.js ###
First, install Express.js `npm install --save express nodemon`

Update `dev` script in package.json
```bash
perl -i -pe 's/"dev":.+$/"dev": "nodemon server.js"/' package.json
```

Create `server.js` as following
```javascript
const express = require('express')
const next = require('next')
const faker = require('faker')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const products = [];
let nextId = 1;
for (let i = 0; i < 10; i++) {
  const product = {};
  product.id = nextId++;
  product.name = faker.commerce.productName();
  product.description = faker.lorem.sentences();
  product.price = faker.commerce.price(20, 100);
  products.push(product);
}

app.prepare()
  .then(() => {
    const server = express();

    server.get('/api/products', (req, res) => {
      res.json(products);
    });

    server.get('/api/product/:id', (req, res) => {
      res.json(products.find(p => p.id == req.params.id));
    });

    server.get('*', (req, res) => {
      return handle(req, res)
    });

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    });
  });
```

Start server by running `npm run dev`.


### Data Fetching ###
Install `isomorphic-unfetch`, which is an HTTP client for both server and client side.
```bash
npm install --save isomorphic-unfetch
```

#### Update `pages/products.jsx` and `pages/product.jsx`
```javascript
// pages/products.jsx
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
```

```javascript
// pages/product.jsx
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
```


### CSS modules with next-css Plugin ###
The `next-css` plugin allows to use localized CSS styles (CSS modules) in pages.

#### Install next-css Plugin
```bash
npm install --save @zeit/next-css
```

#### Configure CSS Module in `next.config.js`
```javascript
const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  cssModules: true
});
```

#### Customize `pages/_document.js`
```javascript
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
```

#### Create `css/app.css` File
```css
div.app {
  margin: 20px;
  padding: 20px;
  border: 1px solid #DDD;
}
```

#### Apply CSS styles in `app-layout.jsx`
```javascript
import NavBar from './nav-bar';
import css from '../css/app.css';

const AppLayout = (props) => (
  <div className={css.app}>
    <NavBar />
    {props.children}
  </div>
)

export default AppLayout
```


### Build and Deployment
Update the `scripts` attribute of `package.json` as following
```json
  "scripts": {
    "dev": "nodemon server.js",
    "build": "next build",
    "start": "next start"
  },
```

To build project, run `npm run build`; to run in production mode, `npm start`.
