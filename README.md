## About The Project

![Autocomplete theme picker](screenshot.png)

This project was made from scratch using the following stack:

- Frontend:

  - React
  - Mobx

- Backend:
  - Java
  - Spring boot

The Frontend stack was chosen due the project requirement and Backend was to get used to what has been used on project.
The UI is composed by 3 major screens:

- Main screen
  - It renders a background-color div where the color is according query paramenter `/?theme={HEX_COLOR}` or color picked on other two links and blended using [difference blend mode](https://srmullen.github.io/blend_modes/#difference).
- Set color #1
  - You have a autocomplete input with HTML colors and the selected color set the screen background and it is the first argument to calculate the background color on main screen
- Set color #2
  - You have a autocomplete input with HTML colors and the selected color set the screen background and it is the second argument to calculate the background color on main screen

## Autocomplete theme picker

To get a local copy up and running follow these simple example steps.

### Prerequisites

You should have `docker` installed to run easily or if you prefer run manually you must have `jdk 21` to run backend project and `npm` to run frontend project.

You can find how to run using `docker` in the next section since it is the most recommended.

### Running

1. Clone the repo
   ```sh
   git clone https://github.com/yvesroos/theme-picker.git
   ```
2. Run the following command to create the image and start the docker container

   ```sh
   docker-compose up --build
   ```

3. You will check both services starting and can access the UI on [http://localhost:3000](http://localhost:3000)

## Roadmap

- [ ] Add unit tests on backend
- [ ] Increase code coverage on frontend
- [ ] Add dockerfile for dev environment
- [ ] Configure CI/CD
