# Prompt Pioneers

Prompt Pioneers is a unique social media platform that allows you to share and test various AI prompts. By utilizing AI technology, users can create, share, test, and edit prompts directly within the application.

## How It Works

1. **Viewing Prompts**: Upon entering the app, you're taken to the feed page, displaying a collection of prompts from various users. With a pagination feature implemented, users are shown nine prompts at a time, with the option to load more at the click of a button.
2. **Authentication**: To provide a personalized experience, users can sign in at the top of the page using Google OAuth. Currently, only Google accounts are supported.
3. **User Profile**: After signing in, users can view their own profiles, which include a display of their created prompts. Here, users also have the option to edit or delete any of their created prompts.
4. **Trying out Prompts**: On the feed page, if a user finds a prompt they like, they can select it. This action takes the user to the 'Try Prompt' page, where they can actually experiment with the selected prompt.
5. **Prompt Testing**: The selected prompt is sent to the ChatGPT completions endpoint to demonstrate its real functionality. Users can also edit the prompt at this stage to fine-tune their test.

## Tech Stack

- **Frontend**: ReactJS + TailwindCSS
- **Backend**: MongoDB + Node.js
- **Framework**: Next.js

Apart from these, the project uses a combination of a bash script and a Python script to generate fake data for the MongoDB database. This not only aids in development but also helps visualize the app's potential with a larger dataset.

When querying the ChatGPT completions endpoint, Langchain API is used to facilitate the process.

## Getting Started

More instructions on how to use and contribute to the project will be provided soon. Stay tuned!

---

Please feel free to contribute and raise issues to this project. Any feedback or suggestions are always welcome!

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

---
