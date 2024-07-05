# UI Task

## Project Overview
This project is a UI task built with Next.js and Tailwind CSS. It includes dynamic tables with functionalities such as sorting, filtering, and editing.

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

## Getting Started

### Step 1: Clone the Repository
First, you need to clone the repository to your local machine.

```bash
git clone https://github.com/raofahadkhan/ui-task.git
```

### Step 2: Navigate to the Project Directory
Change your working directory to the project folder.

```bash
cd ui-task
```

### Step 3: Install Dependencies
Install the required npm packages.

```bash
npm install
```

### Step 4: Create the Production Build
Create the Production build by using the below command.

```bash
npm run build
```

### Step 5: Run the Production Server
Start the production server to see the project in action.

```bash
npm run start
```

Open your browser and navigate to http://localhost:3000 to view the application.

Material React Table: http://localhost:3000/

Custom Table: http://localhost:3000/table

## Reflection:

 1. How did you ensure the reusability of your table component?
 Ans: I have made a dynamic component which is not dependant of data.

 2. Can you explain how you implemented drag and drop functionality for columns?
 Ans: Firstly I assigned a draggable attribut to <th> and than I controlled that with onDragStart onDragStart onDragOver onDrop onDragEnd events by swapping the id's of the column with each other.

 3. Describe your implementation of inline editing for table cells.
 Ans: I have added a edit icon on every cell when a user clicks on that edit icon there is a state which gets true and input shows up and when we finish editing the cell data it will also update the state.

 4. Can the functionality of your component be extended easily and reused?
 Ans: Yes we can reuse it where ever we want we just need to pass the data into the component.

 5. If you had more time, what additional features or improvements would you add to the table component?
 Ans: Sorry Victor, I started late but it would be more helpful if you would provide the figma design to me. It helps alot when you are developing something with a design infront of you.