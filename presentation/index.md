## Next.js

React Applications Made Simple

---

### Why Next.js

* Server-rendered by default
* Automatic code splitting for faster page loads
* Simple client-side routing (page based)
* Webpack-based dev environment which supports Hot Module Replacement (HMR)
* Able to implement with Express or any other Node.js HTTP server
* Customizable with your own Babel and Webpack configurations

---

### Topics

* Next.js project setup           <!-- .element: class="fragment" -->
* Create a simple page            <!-- .element: class="fragment" -->
* Page navigation                 <!-- .element: class="fragment" -->
* Shared components               <!-- .element: class="fragment" -->
* Dynamic page                    <!-- .element: class="fragment" -->
* Custom server with Express.js   <!-- .element: class="fragment" -->
* Data fetching                   <!-- .element: class="fragment" -->
* Component styling               <!-- .element: class="fragment" -->
* Building & Deployment           <!-- .element: class="fragment" -->

---

### Source Code

https://github.com/henryxiang/next-js-demo

---

### Getting Started

```bash
mkdir ~/next-js-demo
cd ~/next-js-demo
npm init -y
npm install --save react react-dom next
```

---

### Create the First Page

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

---
