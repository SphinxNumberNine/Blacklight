Extension Screens:

- Home Screen

  - Information about the app

- Settings / Preferences

  - List of checkboxes where user can select what they care about

- Warnings Page

  - List of warnings when there are some

- Resources tab
  - What people should be aware of regarding privacy
  
 How to test locally:
 
 - run `npm install` from within the extension folder
 - run `npm run build` from within the extension folder. This should create a folder named `build` under the extnesion folder.
 - navigate to `chrome://extensions` from your chrome browser
 - enable developer mode (top right)
 - click `load unpacked`
 - navigate to the `build` folder you just created and select it.
 - click the extension in the top right to test
 - every time you make a change, run `npm run build` in the extension folder, then click the refresh icon on the `chrome://extensions` page
