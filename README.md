## Task Tracker

Roadmap project link: https://roadmap.sh/projects/task-tracker-js/solutions?u=

Roadmap project: https://roadmap.sh/projects/task-tracker-js

Github link: https://github.com/axlwolf/TaskTracker

Github pages link: https://axlwolf.github.io/TaskTracker/

You are required to create a task tracker that lets users add new tasks, mark them as complete, or delete them. Completed tasks will be moved to the end of the list and will have strikethrough, and users can unmark tasks to return them to the pending list.

Here is the mockup of the task tracker:

[![Task Tracker](https://assets.roadmap.sh/guest/task-tracker-2diba.png)](https://assets.roadmap.sh/guest/task-tracker-2diba.png)

## Hint

Store your tasks in an array of objects, where each object represents a task with properties like description and status (completed or not). Whenever a new task is added, updated, deleted, or marked as complete/uncomplete, update the tasks array. Write a function `renderTasks` which will remove all tasks from the DOM and re-render them based on the updated tasks array.

This project will help you practice array manipulation, event handling, and dynamic DOM updates using JavaScript.

### Get started

```
  git clone https://github.com/axlwolf/TaskTracker.git my_project
  cd my_project
  npm i
  npm start
```

### Put your files into /src folder.

Don't forget add to index.html this line:
```
  <script type="text/javascript" src="../build/app.js"></script>
```

### For build

```
  npm run build
```

### Features

- Lightweight, fast opened.
- Webpack livereload separated config
- Html5/Css3/JS(es6/vanilla)/images(png, jpg, gif, svg) optimization/minify.
- Include 5 pure css media queries points and best normalize css practices.
- Include all you needed html meta tags.
- ES6 and browserify syntax support. (require, arrow func, let const etc...).

### 2020 updates

- SASS support (thanks @patrikniebur)
