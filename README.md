# STI-My-Frontend

This template provides a minimal setup how to install and run the project on your workspace.

This repository is a copy of the original repo only for a backup.


### Install npm dependencies

```
npm install
```


## Global HTTP URL

Base url is on folder /src/api/axiosConfig.ts
change this:  axios.defaults.baseURL = 'http://localhost:3000/api';


## Resources

```
Images and others resources are on root folder "public"
```

## ✨ Features  
✅ Ready-to-use Axios base configuration  
✅ Clean public folder for static assets  
✅ Quick start setup  
✅ MVC arquitecture
✅ Moder libraries and patterns 

---

## 🛠 Setup  

### Prerequisites  
- [Node.js](https://nodejs.org/) (v22 or higher)  
- npm (comes with Node.js)  


### Project Architecture ( MVC )

```

sti-my-frontend/
src/
├── app/ # Feature modules (MVC pattern)
│ └── [module]/ # Example: student/, admin/
│   ├── controller/ # Business logic, redirection & validation
│   ├── model/ # Data types, redux slices and API connection
│   └── view/ # UI components
│
├── common/ # Reusable UI components ( Buttons, Cards, etc.)
│
├── routes/ # Routing system and protection
│
├── shared/ # Global utilities
│ ├── constants/ # Application constants
│ ├── interfaces/ # Global type definitions
│ ├── fuctions/ # Helper functions
│
└── store/ # State management
├── package.json
└── Readme.md

```


### Licence

MIT License with Attribution Requirement

Copyright (c) [2025] [Emanuel Arévalo Martínez]


Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, subject to the following conditions:

1. The above copyright notice AND THIS ENTIRE PERMISSION NOTICE 
   shall be included in all copies or substantial portions of the Software.
   
2. Any use of the Software in distributed or modified form must 
   prominently feature the original author's name ("Emanuel Arévalo Martínez") 
   in:
   - The application's "About" section or equivalent
   - Documentation (if any exists)
   - Project metadata (for software libraries)

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


