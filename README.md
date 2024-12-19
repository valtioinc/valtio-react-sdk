<h1 align="center">🛡Valtio React SDK</h1>
<h3 align="center">SDK for embedding Valtio UI elements into React applications.</h3>
<p align="center">
  <a href="https://www.npmjs.com/package/@valtioinc/valtio-react-sdk">
    <img alt="npm latest version" src="https://img.shields.io/npm/v/@valtioinc/valtio-react-sdk/latest.svg">
  </a>
  <a href="https://github.com/valtioinc/valtio-react-sdk/actions/workflows/ci.yml">
    <img alt="Build states" src="https://github.com/valtioinc/valtio-react-sdk/actions/workflows/ci.yml/badge.svg">
  </a>
  <a href="https://github.com/valtioinc/valtio-react-sdk#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/valtioinc/valtio-react-sdk/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/valtioinc/valtio-react-sdk/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/valtioinc/valtio-react-sdk" />
  </a>
</p>

***

<h4 align="center">Securely collect & manage sensitive user data.</h4>

[Valtio](https://valtio.io) is a workflow automation platform that helps end-users design and power task-based digital
workflows for a variety of use cases. Tasks can include things like filling out forms, e-signatures, uploading documents,
identity verification, and many more. Users can assign other users to complete specific workflow steps and the platform
will handle notifying the user of their tasks and guiding them through the successful completion of those tasks.
***

## Highlights

This package provides an SDK for embedding Valtio into your React applications.
* Embed the workflow creator experience to allow application users to create new workflows (coming soon)
* Embed the workflow sender experience to allow application users to initiate workflows and assign other users to tasks
* Embed the workflow participant experience to allow application users to complete their workflow tasks
* Embed the full Valtio platform to allow application users to use all the capabilities of the platform.
***

## Install

```sh
npm install @valtioinc/valtio-react-sdk
```

```sh
yarn add @valtioinc/valtio-react-sdk
```
***

## Usage

#### Example: Show Valtio when user clicks a button

```typescript jsx
import React from "react";
import { ValtioApp } from "@valtioinc/valtio-react-sdk";

function App() {
  const [showValtio, setShowValtio] = React.useState(false)

  const onShow = () => {
    /*
     The user has requested to open the Valtio platform.
     */
    setShowValtio(true)
  }
  
  const onHide = () => {
    /*
      The user has requested to exit the Valtio platform and return to your application.
      Handle this event by either switching screens or removing the ValtioApp component.
     */
    setShowValtio(false)
  }
  
  return (
    <div>
      {!showValtio && (
        <header>
          <p>Valtio React App Reference Implementation</p>
          <button onClick={onShow}>Show Valtio</button>
        </header>
      )}
      {showValtio && (
        <ValtioApp
          appID="75a8c8a8-8763-4590-ab5b-4d5278d41724"
          language="en"
          onExit={onHide}
          user={{
            first_name: "John",
            last_name: "Doe",
            email: "john.doe@example.com"
          }}
        />
      )}
    </div>
  )
}
```
### ValtioApp Component Properties
| Property        | Description                                                                                                                                                                                        | Type         | Required | Default               | 
|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|----------|-----------------------|
| appID           | A unique identifier for your application and your organization. Please contact the Valtio team to request an application ID.                                                                       | string       | Yes      |                       |
| host            | The host that will be used to load the embedded Valtio experience. Defaults to Valtio's production system, but can also be set to Valtio's sandbox environment (https://app-integration.valtio.io) | string       | No       | https://app.valtio.io |
| language        | The language preference of the user that will be interacting with the Valtio platform. Currently only English ('en') and Spanish ('es') are supported.                                             | 'en' \| 'es' | No       |
| debug           | A flag to enable debug logging in the Javascript console.                                                                                                                                          | boolean      | No       | false                 |
| onLoad          | A callback function that will be invoked when the embedded Valtio experience has finished loading.                                                                                                 | function     | No       |                       |
| onExit          | A callback function that will be invoked when the user requests to exit the Valtio experience and return to your application.                                                                      | function     | No       |                       |
| user.first_name | The first name of the user that will be interacting with the Valtio platform. This will be used to autofill fields in the account sign-up flow.                                                    | string       | No       |                       |
| user.last_name  | The last name of the user that will be interacting with the Valtio platform. This will be used to autofill fields in the account sign-up flow.                                                     | string       | No       |                       |
| user.email      | The email of the user that will be interacting with the Valtio platform. This will be used to autofill the email in the account authentication / sign-up flow.                                     | string       | No       |                       | 

***

## Author

👤 **Valtio Inc**

* Website: https://valtio.io
* Github: [@valtioinc](https://github.com/valtioinc)
* LinkedIn: [@https:\/\/www.linkedin.com\/company\/valtio-inc](https://linkedin.com/in/https:\/\/www.linkedin.com\/company\/valtio-inc)
***

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to
check [issues page](https://github.com/valtioinc/valtio-react-sdk/issues).
***

## Show your support

Give a ⭐️ if this project helped you!
***

## 📝 License

Copyright © 2024 [Valtio Inc](https://github.com/valtioinc).<br />
This project is [MIT](https://github.com/valtioinc/valtio-react-sdk/blob/main/LICENSE) licensed.
