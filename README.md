<p align="center">
  <img alt="gitkitlogo" src="https://qcgihxzhaafyybmpwznh.supabase.co/storage/v1/object/public/git-kit/git-kit-banner.png">
</p>




## GitKit is a utility, open source extension for enhancing your Github experience

- Hide those long burning open issues in your favorite repository
- More features in development...


## 📖 Table of Contents

- [Features](#features)
- [Contributing](#contributing)

## 🚀 Features
![ui-demo](https://qcgihxzhaafyybmpwznh.supabase.co/storage/v1/object/public/git-kit/github-toolkit-demo.gif)

### Issues

- **Hidden Issues**: De-clutter your favorite repository's issue board so you can focus on the issues that matter to you most.
- **Issues Visited**: Visual see which issues have been looked at across all pages. No more opening up issues for the 100th time!


## ⚡️ Contributing

Lets build this together! Have a new idea? Found a bug? Head over to our [issue board](https://github.com/JStuve/git-kit/issues) and lets chat!


### Quick Start

1. Clone the repository
```
git clone https://github.com/JStuve/git-kit
cd git-kit
```

2. Create, and checkout to, your own branch following these standards
```
  [nameIdentifier]/[smallDescription]

  Example:

  jstuve/fixed-issue-loading
```

Install packages: `yarn`


3. Make code changes

4. Build extension

```
npm run build
```

5. Install or refresh extension

    a. Open chrome browser

    b. Navigate to `chrome://extensions`
    
    c. Click "Load unpacked"

    d. Select the `git-kit/build` folder

6. Reload webpage

_Live reload guide is not available at this time_


## 💻 Repository Overview

`src/chrome-services`: Injected scripts that load onto a users webpage. For each feature there should be a unique script. 

NOTE: Future update will pull these scripts outside of the `src/` directory.

`src/components`: UI elements for the extensions React application. These should be simple, 'dumb', components. (e.g. Buttons, Tabs, Dropdown, ect.)

`src/models`: All of our interfaces, types, const, enums, will live in this folder.

`src/utilities`: Small static classes used to improved common Typescript logic blocks.

`src/**`: Root of the application contains all the React pages and boiler plate code.

NOTE: Future update will isolate the pages into it's own directory.

