<a name="readme-top"></a>

<br />
<div align="center">
  <a href="https://github.com/the-collab-lab/tcl-56-smart-shopping-list">
  </a>

<h3 align="center">Smart Shopping List</h3>

  <p align="center">
    An accessible and mobile friendly smart shopping list that learns your buying habits and helps you remember what you’ll likely to need to buy on your next trip to the store.
    <br />
    <a href="https://github.com/the-collab-lab/tcl-56-smart-shopping-list"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    ·
    <a href="https://github.com/the-collab-lab/tcl-56-smart-shopping-list/issues">Report Bug</a>
    ·
    <a href="https://github.com/the-collab-lab/tcl-56-smart-shopping-list/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#optimizations">Optimizations</a></li>
    <li><a href="#lessons-learned">Lessons Learned</a></li>
     <li><a href="#contributing">Contributing</a></li>
    
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
<div align="center">
  <img src="https://user-images.githubusercontent.com/102399239/241094621-ce38ef45-ce4b-4b12-98ff-657eb51057bb.png" alt="a shopping list application with vegetable food items on it" width="400px"/>
</div>

<br>
The goal of this project is to create a “smart” shopping list app that learns your buying habits and helps you remember what you’re likely to need to buy on your next trip to the store.
As a user, you will enter items (e.g., “Greek yogurt” or “Paper towels”) into your list. Each time you buy the item, you mark it as purchased in the list. Over time, the app comes to understand the intervals at which you buy different items. If an item is likely to be due to be bought soon, it rises to the top of the shopping list.



### Built With

![Vite](https://shields.io/badge/vite-black?logo=vite&style=for-the-badge) 
![React](https://shields.io/badge/react-black?logo=react&style=for-the-badge)
![TailwindCSS](https://shields.io/badge/tailwindcss-black?logo=tailwindcss&style=for-the-badge) 
![Firebase](https://shields.io/badge/firebase-black?logo=firebase&style=for-the-badge) 


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

:bulb: **Note:** This project requires the latest Long Term Support (LTS) version of Node. If you have an earlier version of Node, now would be a great time to upgrade!

### Prerequisites

![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)

`npm` is distributed with Node.js, which means that when you download Node.js, you automatically get `npm` installed on your computer. You can install Node by [downloading it from the Node.js website](https://nodejs.org/en/) or using a Node version manager like [nvm](https://github.com/nvm-sh/nvm) on a macOS or Linux device or [nvm-windows](https://github.com/coreybutler/nvm-windows) on a Windows device.


### Installation

1. Click the green "Code" button to reveal a "Clone" popup.
3. The "HTTPS" tab should be automatically selected. If not, click "HTTPS."
4. From your terminal, `cd` into the directory where you want this project to live.
5. Once you’re in the directory, type `git clone` followed by the web URL you just copied to your clipboard from GitHub. Then `cd` into the directory that is created.

### Install the project’s dependencies

Once you’ve cloned the project locally and you’re in the project directory, you’ll want to install the project’s dependencies. To do so, type the following into your terminal: `npm ci`


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Access the project in your browser

After you’ve cloned the project locally and updated the dependencies, run the project by typing the following into your terminal: `npm start`. You should be able to see the project at `localhost:3000`.

<!-- USAGE EXAMPLES -->
## Usage

 - Create a new list or join an existing list.
    - You can find the name of your list in Chippy's dialog box. Share your list with anyone! 
 - Add items to your shopping list based on how frequent you typically purchase these items.
 - See a label (Soon, Kinda Soon, Not Soon, Inactive) for each item.
    - Soon: 7 days or fewer until the next purchase
    - Kinda Soon: between 7 & 30 days until the next purchase
    - Not Soon: 30 days or more until the next purchase
    - Inactive: 60 days have passed since the last purchase
 - Label is assigned based on the smart shopping algorithm prediction of when the item will need to be purchased again. This is calculcated based on three factors:
      -  total purchases
      -  date last purchased
      -  date next purchase prediction
 - Shop for your items and mark them as purchased by clicking the square input box.
 - Filter through your list of items using the search bar.
 - Delete items that are no longer in your rotation or have become inactive(over 60 days since last purchased).



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] [Added react-router-dom navlinks component #16](https://github.com/the-collab-lab/tcl-56-smart-shopping-list/pull/16)
- [x] [Render names of list #17](https://github.com/the-collab-lab/tcl-56-smart-shopping-list/pull/17)
- [x] [Generate list token for create new list button #18](https://github.com/the-collab-lab/tcl-56-smart-shopping-list/pull/18)
- [x] [Add item to list #19](https://github.com/the-collab-lab/tcl-56-smart-shopping-list/pull/19)
- [x] [Create join list feature](https://github.com/the-collab-lab/tcl-56-smart-shopping-list/pull/20)
- [x] [Filter List view](https://github.com/the-collab-lab/tcl-56-smart-shopping-list/pull/21)
- [x] [Create an update list items feature](https://github.com/the-collab-lab/tcl-56-smart-shopping-list/pull/22)
- [x] [Welcome prompt](https://github.com/the-collab-lab/tcl-56-smart-shopping-list/pull/23)
- [x] [Calculate next purchase feature for items](https://github.com/the-collab-lab/tcl-56-smart-shopping-list/pull/24)
- [x] [Added check for duplicate item list](https://github.com/the-collab-lab/tcl-56-smart-shopping-list/pull/25)
- [x] [Delete item feature](https://github.com/the-collab-lab/tcl-56-smart-shopping-list/pull/26)
- [x] [Sort list by purchase urgency and alphabetical order](https://github.com/the-collab-lab/tcl-56-smart-shopping-list/pull/27)
- [x] [Create input to allow users to name their list](https://github.com/the-collab-lab/tcl-56-smart-shopping-list/pull/32)
- [x] [Add unit tests to important date calculating and converting functions](https://github.com/the-collab-lab/tcl-56-smart-shopping-list/pull/32)
- [x] [onChange now clears submit message](https://github.com/the-collab-lab/tcl-56-smart-shopping-list/pull/34)
- [x] [Update font style and color](https://github.com/the-collab-lab/tcl-56-smart-shopping-list/pull/36)
- [x] [Make Chippy a component](https://github.com/the-collab-lab/tcl-56-smart-shopping-list/pull/38)
- [x] [Comprehensive refactor of functions dealing with dates and tests refinement](https://github.com/the-collab-lab/tcl-56-smart-shopping-list/pull/40)
- [x] [Fix: address conditional logic to render inactive items](https://github.com/the-collab-lab/tcl-56-smart-shopping-list/pull/41)
- [x] [Color contract accessibility fix](https://github.com/the-collab-lab/tcl-56-smart-shopping-list/pull/43)


See the [open issues](https://github.com/the-collab-lab/tcl-56-smart-shopping-list/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Optimizations
 
As the application grows with users it will need to scale. Future optimizations will implement user authentication to allow users to login to see available shopping lists. Update feature will be improved to be toggable or inherit similar UI behavior as delete function, which prompts the user before commiting to update the item(which triggers the smart shopping list algorithm and sets a new date prediction)

## Lessons Learned

Challenges and lessons learned were documented throughout the creation of this application. Please see the <a href="https://github.com/the-collab-lab/tcl-56-smart-shopping-list/pulls?q=is%3Apr+is%3Aclosed">pull requests</a> for detailed documentation about the process, tools, and lessons learned throughout the course of development. 
<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- CONTACT -->
## Questions? Contact the contributors 

- Annemarie Luceroni - [@alucernoni](https://github.com/alucernoni)
- Ashley Valentine - [@fakehouseplant](https://github.com/fakehouseplant)
- Drake Nguyen - [@draknguyen4000](https://github.com/drakenguyen4000)
- Yire Morlans - [@yiremorlans](https://github.com/yiremorlans)

### Special thanks to our mentors @[Collab Lab](https://the-collab-lab.codes/)

- Aditya Dalal 
- Nicole Schnurr 
- Michaela Rochon



<p align="right">(<a href="#readme-top">back to top</a>)</p>




