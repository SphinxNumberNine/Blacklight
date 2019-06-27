AI Legal Project

- Please put all code in its proper folder
  - Processing is for any python / ML code for the actual processing of text, etc
  - Extension is for all chrome extension related code (I will create a dummy chrome extension here in a bit)
  - Server is for all server side code

Information on git for noobs:

- to clone the repository (get the repository and its code on your computer)

  - for people using github desktop:
    - File -> Clone Repository -> URL -> Paste in the URL found on the main repository page (should end in .git)
  - for people using git command line interface:
    - run `git clone <url>` in your projects directory, where `<url>` is the URL found on the main repository page

- to push changes back to github

  - Once changes have been made, verify that ONLY the files you have changed are the ones listed when you run `git status` in the terminal, from within the project folder
  - If there are files you don't want changed listed there (this means you accidentally changed something), run `git checkout <file>`, where `<file>` is the file name of the desired file. This will revert any changes on the specified file to the state it is on github.
  - To stage files for commit (adding specific files to be committed), use `git add <file>`, where `<file>` is the changed file. If every changed file is to be added to a single commit, `git add .` adds them all.
  - To commit staged files, use `git commit -m "<message>"`, where `<message>` is a descriptive yet concise message about what the commit has changed. Keep messages to a sentence or two max.
    - Try to keep commits clean. A commit should have a singular purpose, and so if you made 2 or 3 changes, stage the files for each change separately and make separate commits detailing the changes.
  - To push commits to github, use `git push origin master`. This will push any commits you've made to github and update the repository for everyone.

- Ideally we want to use _branches_ to make sure we don't push breaking changes, but I can go over that another time, once we have a basic version of this working.
