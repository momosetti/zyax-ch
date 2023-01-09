# Prerequisites

1.  Javascript Runtime: Nodejs
2.  Package manger: NPM or Yarn (is preferred)

# How to run the app

After cloning the repo. Using your preferred package manager (I use `Yarn`).
To install dependencies:

```
git clone https://github.com/momosetti/zyax-ch
cd zyax-ch
yarn
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

    yarn test

# Tech Stack

3.  SPA library: React.js.
4.  Build tool: [Vite.js 2.4.2](https://vitejs.dev/)
5.  Form mangment: [Formik](https://formik.org/)
6.  Style: Tailwind CSS.
7.  Testing:
    - Test runner: Jest 27
    - Testing utilities: `@testing-library/react`

# Project description

1.  What part did you struggle with? What part was easy?
    The part I did struggle with was the setup of Jest with Vite, due that the Jest integration with Vite 4 was complicated, so I downgrade the Vite version to 2.4 and Jest to 27.
    The easiest part was: creating the form UI and implementing the login API endpoint.
2.  Why were these parts easy/difficult?
    I got some difficulties on the part of installing Jest with Vite due that Jest can be used in projects that use Vite to serve source code over native ESM to provide some frontend tooling, Vite is an opinionated tool and does offer some out-of-the box workflows. Jest is not fully supported by Vite due to how the [plugin system](https://github.com/vitejs/vite/issues/1955#issuecomment-776009094) from Vite works. However, I find the UI and implementing the Login API endpoint easy for me, cause I’m used to working on a similar task like this.
3.  What would you have done differently?
    I’d like to use a different approach with token-based authentication. As we know, storing any sensitive data such as access token or JWT in the local storage or cookies is not secure, may any injected script or a 3rd party library run on the browser can retrieve that data, so I’d like to use httpOnly cookies, it limits the damage that can be done by any injected script or XSS attack.
