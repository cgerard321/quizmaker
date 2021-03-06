## QUIZMAKER PROJECT 

Sponsored by Champlain College - St. Lambert

## Installation Instructions

1. Install node.js from https://nodejs.org/en/download/
   
   Tutorial: https://phoenixnap.com/kb/install-node-js-npm-on-windows
2. Follow the [Github setup instructions](#github-setup) below to prepare your local repository.
3. Install the dependencies in the package.json file by running the following command: 
```
npm install
```
4. Test out your installation by starting the application. 
```
npm run start
```

## Naming Conventions

### Branch Naming

- Branches will be named according to the following convention: type/JiraID_Description
  I like to break it down into 4 'folders' or types:
    - feat/
    - bug/
    - doc/
    - conf/
- After the slash, add the JIRA id (it will be something like QM-4).

- The full branch name would look like this `feat/QM-4_Add_Multiple_Choice_Question` and would be created and navigated to by executing the following command:

```
git checkout -b feat/QM-4_Add_Multiple_Choice_Question
```

### Pull Requests (PR) Naming

- To make it so we can easily search and find pull requests we will adhere to the following standard:

```
feat(JiraID): short description
```

- In that example, you would replace JIRA-TICKET-ID with the id from Jira.
- Keep the parentheses.
- Do not include any capital letters or punctuation in the description

### Pull Request Commit Naming

- This is pretty much the exact same as the Pull Request Naming except that at the end there will be an auto-generated number in parentheses. Please don't delete it. Simply add your stuff before it.

```
feat(JiraID): short description (#420)
```

### Github Setup

- First create an account on GitHub
- Download git https://git-scm.com/downloads
- Go to the official/ main repo https://github.com/cgerard321/quizmaker
- Click the green button 'Code', and copy the given URL
- On your file explorer, navigate to where you want the project, right-click, and select 'git bash here'
- In the terminal window, type 'git clone' and then paste the copied url. (Do not ctrl + v to paste in the git bash terminal, it does not use standard windows encoding and will add extra invisible chars to the command causing it to error out.) It will look like this:

```
git clone https://github.com/cgerard321/quizmaker
```

- The repo on your computer is known as the "local"
- The repo on GitHub is known as the "remote origin" or simply "origin"
- cd into the quizmaker folder on your computer

```
cd quizmaker/
```
To see that the remote origin has been correctly set up, type:
```
git remote add upstream https://github.com/cgerard321/quizmaker.git
```
- If we type `git remote -v` we should see 4 different connections, push and fetch for our upstream and for our origin
- Now that you have setup your clone, move on to the 'story workflow section'

## Story Workflow

- So you've setup your clone of the repo and started your first story. Now what?
- We will first navigate to our project in the file explorer, right-click, and select 'git bash here'
- In the current command line, you should see in parentheses, the branch you are currently on. We want to start this 'new story process' from our origin's main branch.
```
Christine@DESKTOP-2VF5PQD MINGW64 /e/quizmaker (main)
```
- If it says main, great. Skip this next line. If not, type:
```
git checkout main
```

- This will simply transfer us to our origin's main branch
- Next, we will want to update our local project with any code our fellow devs have pushed while we were gone. To do this we must first 'download' the code using the following command:

```
git fetch origin main
```

- We are telling git to download the latest stuff from the main branch on our remote remote
- Then we want to actually start our story fresh with that code, so we will reset our local environment with that newly fetched code:

```
git reset --hard origin/main
```

- It is also important to note this will reset any uncommited changes you've made, so keep that in mind. If you are following along and not starting a story from scratch, you might want to rebase instead. More info on rebasing can be found in the 'useful git commands' section

- Now we will want to make a new branch to start working on our feature or bug fix. Simply type:

```
git checkout -b YOUR-BRANCH-NAME
```

- This command is broken down into 2 parts, `checkout` will move you to a given branch the `-b` modifier will create the branch
- You have now created your new branch and are on it. Check the 'structure' section for what you should write in place of YOUR-BRANCH-NAME
- Now it's time to actually write some code. So go start implementing a new feature using TDD. Then come back after you're done.
- So now you have hopefully something done or at least the start to it and want to commit it
- First, we have to stage all edits, additions, and removals

```
git add .
```

- We can also stage specific files with a relative path

```
git add /path/to/file
```

- Next we will commit the code

```
git commit -m "A short description of what work was done in the commit"
```

- After that you might repeat the `git add .` and `git commit` a couple times before your masterpiece is done

- When you are ready to show it to everyone else or if you want to be able to access it on another computer, we have to push it with this command: (it might ask you for login creds)

```
git push
```

- Again this is the same this as saying `git push origin YOUR-BRANCH-NAME` the `origin` and `YOUR-BRANCH-NAME` are implicitly applied
- If git gives you and error here telling you that you need to set the remote as upstream, simply copy/paste the command it gives you. Next time you push on this branch, you won't get this error.


### Pull Requests

- Imagine at this point that everything in the story is done, and you are ready to get your code reviewed by the other devs. We need to make a pull request to do that.
- Before embarking on this new challenge, we want to make sure the code is as "clean" as possible. To do this we'll run ESLint which is hooked up to Prettier. It will attempt to fix any issues it finds. You will need to handle any issues that it cannot automatically fix. 
- Note: this is a very important step. ESLint is part of the CI pipeline, which means your PR will fail if you have linting errors.
```
npm run lint:fix
```

- Now, if everything is okay, go to your origin's github page (or project repo) and make a new pull request. At the top, verify that the branch (thing you want to compare) and base are all coming from and going to the correct place. "Compare" should be YOUR-BRANCH-NAME and "base" should be main.
- Add a title as per the instructions in the [Pull Requests (PR) Naming](#pull-requests-pr-naming) section, and make sure to add the label on the side bar, indicating which team you are on
- In order to merge this Pull Request (PR), we need one other person to review and approve it. You can get other peoples attention by 'requesting a review' on the side bar or by sending them a DM in slack
- Once you've pleased everyone, your code is in prime condition, and you have no merge conflicts (see the [Merge Conflicts / Updating your Branch](#merge-conflicts--updating-your-branch) section if you encounter issues), you can finally hit the 'squash and merge' button and set another title. Follow the naming conventions in the [Pull Request Commit Naming](#pull-request-commit-naming) section.
- Your PR is now merged and everyone can fetch and rebase or pull to see the work you've done
- Congrats. Just repeat this process until the semester is over.

## Merge Conflicts / Updating your Branch

The commands are pretty much the same whether you are updating a branch, or you are trying to fix a merge conflict, except if you are updating you will skip the `git add .` and the `git rebase --continue` because you don't have anything to fix. You will still have to `git push -f`

Here's the scenario: Oh no, you have a merge conflict! This happens when you and another dev are working on the same file and edit the same line or git can't automatically figure out how to add your code and the main code together.

Once you see this error on your pull request, or if you happen to run into it outside of a PR, just follow these easy steps:

- First download the origin main data

```
git fetch origin main
```

- Next we will use the rebase command

```
git rebase origin/main
```

- Git will now replay the commits of your branch on top of the origin main. If you have a merge conflict, the prompt will pause and tell you which files were affected. From there, just navigate to your file and update the code accordingly.

- Once you have fixed all the merge conflicts go back to your terminal and type:

```
git add .
```

- Then

```
git rebase --continue
```

- This command is telling git "ok I've fixed this conflict now move on to the next commit"

- If you have more conflicts, repeat the last couple of steps, until the rebase is complete

- Generally, you can tell the rebase is complete when you look at the branch name in your terminal, and it is the correct branch name i.e. without any extra text or random symbols

- After that, the rebase has made a new local commit with all your changes, only one step left which is to force push:

```
git push -f
```

- This is just shorthand for `git push --force`

- If you don't force push you'll get a bunch of red and yellow text, which looks like you messed up, but it's fine. It didn't actually do anything just redo the command but with the `-f`

- At this point, if you go back to your pull request, you should be able to automatically merge the branch.

## Useful Git Commands

This command lets you see any edited, added, or removed files:

```
git status
```

This will show you the differences between last commit (HEAD is main) and your local repo. Press q when you want to leave:

```
git diff HEAD .
```

This will list all your remotes:

```
git remote -v
```

This will list all your branches and there will be a star next to the branch you are currently on:

```
git branch
```

Reset your current branch to the upstream main:

```
git fetch origin main
git reset --hard origin/main
```

If you want to rebase the upstream main on top of your working branch:

```
git fetch origin main
git rebase origin/main
```

Switch to a branch:

```
git checkout BRANCH-NAME
```

Creating and switching to a branch:

```
git checkout -b BRANCH-NAME
```

Add all files ot be staged:

```
git add .
```

Remove all files from staging area:

```
git reset HEAD .
```

Commit all staged files:

```
git commit -m "My message"
```

Push code to remote repo:

```
git push
```

Push code to remote repo after rebase, use this one carefully:

```
git push --force
```

Select a specific commit and replay in onto a branch, don't include angled brackets:

```
git cherry-pick <commitId>
```

To save the stuff you have been working on if you need to quickly change branches but don't want to commit or want to transfer work from one branch to another, the basic is with git stash and there are a variety of variation you can look up but for general uses, this first command will store the data:

```
git stash
```

The next command will re-apply the data:

```
git stash pop
```

---



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
