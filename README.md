To see a live demo click [Here](https://zyax-ch.netlify.app)

# Prerequisites

1. Javascript Runtime: Nodejs

2. Package manger: NPM or Yarn (is preferred)

# How to run the app

After cloning the repo. Using your preferred package manager (I use `Yarn`).

```
git clone https://github.com/momosetti/zyax-ch

cd zyax-ch

yarn | npm install
```

For starting the dev server:

```
yarn dev
```

For building:

```
yarn build
```

For serving static files (after build the project):

```
yarn perview
```

For run test suites:

```
yarn test
```

# Tech Stack

3. SPA library: React.js 18

4. Build tool: [Vite.js 2.4.2](https://vitejs.dev/)

5. Form management: [Formik](https://formik.org/)

6. Style: Tailwind CSS.

7. Testing:

   - Test runner: Jest 27

   - Testing utilities: `@testing-library/react`

# Project description

1. What part did you struggle with? What part was easy?
   The part I did struggle with was the setup of Jest with Vite, due that the Jest integration with Vite 4 was complicated
   The easiest part was: creating the form UI and implementing the login API endpoint.

2. Why were these parts easy/difficult?
   I got some difficulties on the part of installing Jest beside Vite, and the reason is that Jest is not fully supported by Vite due to how the [plugin system](https://github.com/vitejs/vite/issues/1955#issuecomment-776009094) from Vite works, so I downgraded the Vite version to `2.4` and Jest to `27`. However, I find the UI and implementing the Login API endpoint easy parts for me, cause I’m used to working on a similar task like this.

3. What would you have done differently?
   I’d like to use a different approach with token-based authentication. As we know, storing any sensitive data such as access token or JWT in the local storage or cookies is not secure, may any injected script or a 3rd party library run on the browser can retrieve that data, so I’d like to use `httpOnly` cookies, it limits the damage that can be done by any injected script or XSS attack.
