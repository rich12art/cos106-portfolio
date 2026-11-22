# Richard Babalola — COS 106 Student Portfolio

A multi-page responsive website made for the **COS 106 – Introduction to Web Technologies** term project at MIVA Open University.

The site is a personal academic portfolio and a small student management tool. It is built with plain HTML, one external CSS file and vanilla JavaScript. There are no frameworks and no build tools.

## How to open the website

You can open `index.html` directly in a browser, or run a simple local server from this folder:

```bash
# Python 3
python3 -m http.server 8080
```

Then visit [http://localhost:8080](http://localhost:8080).

A local server is useful if you want to be sure that every file path and the video load in the same way they will on a hosted site.

## Pages

| File | Page | What it contains |
| --- | --- | --- |
| `index.html` | Home | Name, photograph, welcome message, short biography and a summary of Rich-Edit services |
| `about.html` | About | Education, career aspirations, a skills table, hobbies, and a short introduction video |
| `projects.html` | Projects | Four website projects, each with a screenshot, a description and a link |
| `planner.html` | Academic Planner | Add, complete and delete study tasks. The list is saved in the browser with `localStorage` |
| `contact.html` | Contact | A form with Name, Email, Phone and Message, validated with JavaScript |
| `projects/gnc.html` | Project note | GNC Computers Hub mock-up |
| `projects/estherbakes.html` | Project note | Estherbakes'n'more mock-up |
| `projects/tifa.html` | Project note | Tifa Cakes and More mock-up |
| `projects/richedit.html` | Live sample | Brand homepage for Rich-Edit Creative Services |

## Folder structure

```
cos106-portfolio/
  index.html
  about.html
  projects.html
  planner.html
  contact.html
  README.md
  css/style.css
  js/main.js
  js/planner.js
  js/contact.js
  fonts/                 local Fraunces and Source Sans 3 files
  images/                photograph, project screenshots, video poster, favicon
  media/intro.mp4        short HTML5 introduction video (local file, works offline)
  projects/              project notes and the Rich-Edit sample page
```

## What the JavaScript does

- `js/main.js` — opens and closes the hamburger menu on small screens.
- `js/planner.js` — keeps tasks in an array of objects, updates the page with DOM methods, and saves the array in `localStorage`.
- `js/contact.js` — checks that no field is empty, that the email looks valid, and that the phone number contains digits only. Errors appear under the field. A success message appears when the form is valid.

The contact form does not send a real email. That would need a server, which is outside the scope of this project.

## How to host it later

This folder is ready to be uploaded to GitHub and published with GitHub Pages (or a similar host such as Vercel). The lecturer asked for a live link and a GitHub repository link. Those steps are not part of this copy of the project; they can be done when the site is ready to submit.

## Author

Richard Babalola  
B.Sc. Computer Science, MIVA Open University  
Akoka, Yaba, Lagos, Nigeria
