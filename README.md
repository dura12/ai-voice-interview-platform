

# CareerSpark - AI Mock Interview Platform
![image](https://github.com/user-attachments/assets/fb39b5f5-f482-44c5-88f3-7885ab851fdf)
<!-- [![Vercel Deployment](https://img.shields.io/vercel/deployment/YOUR_VERCEL_ORG/YOUR_VERCEL_PROJECT/main?label=vercel&style=flat-square)](https://ai-voice-interview-platform.vercel.app/) -->

> CareerSpark is an AI-powered platform designed to help users prepare for job interviews using realistic voice conversations and receive instant feedback. Built with Next.js, Firebase, Vapi, and Google Gemini, it also serves as a practical example for learning AI model integration.

<!-- TODO: Add a compelling screenshot or GIF of the app in action! -->
<!-- ![CareerSpark Screenshot/GIF](docs/images/CareerSpark-demo.gif) -->
<!-- *Caption: Taking an interview and receiving feedback.* -->

<!-- Optional: Link to Live Demo -->
<!-- ## 🌐 Live Demo -->
[recording (8).webm](https://github.com/user-attachments/assets/a6fcb6c7-0fe1-458e-9098-e704956628ae)

---

## ✨ Features
*   🔐 **Authentication:** Secure Sign Up & Sign In using Firebase (Email/Password).
*   🎙️ **AI Interview Creation:** Generate tailored job interviews leveraging Vapi voice agents and Google Gemini's power.
*   💬 **Interactive AI Interviews:** Engage in realistic voice interviews with an AI agent.
*   📊 **Instant Feedback:** Receive constructive feedback and detailed transcripts immediately after your interview.
*   ✨ **Modern UI/UX:** Sleek, intuitive interface built with Tailwind CSS and shadcn/ui.
*   📝 **Interview Dashboard:** Manage, track, and review all your past interviews efficiently.
*   📱 **Responsive Design:** Fully functional and visually appealing across all devices (desktops, tablets, mobiles).
*   🏗️ **Reusable Code Architecture:** Designed with scalability and maintainability in mind.
---

## ⚙️ Tech Stack

*   **Frontend & Backend:** [Next.js](https://nextjs.org/) (React Framework)
*   **Authentication & Database:** [Firebase](https://firebase.google.com/) (Auth, Firestore/Realtime Database)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
*   **AI Voice Agent:** [Vapi AI](https://vapi.ai/)
*   **AI Language Model:** [Google Gemini](https://ai.google.dev/)
*   **Schema Validation:** [Zod](https://zod.dev/)

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally on your machine.

### Prerequisites

Make sure you have the following installed:

*   [Git](https://git-scm.com/)
*   [Node.js](https://nodejs.org/) (LTS version recommended)
*   [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/)

### Cloning the Repository

```
git clone https://github.com/dura12/ai-voice-interview-platform.git
cd ai_mock_interviews
```
Installation
Install the project dependencies:
```
npm install
```
Bash
🔑 Environment Variables
### Vapi AI Credentials
NEXT_PUBLIC_VAPI_WEB_TOKEN=YOUR_VAPI_PUBLIC_TOKEN_HERE
NEXT_PUBLIC_VAPI_WORKFLOW_ID=YOUR_VAPI_ASSISTANT_ID_HERE # Or other Vapi ID if needed

### Google Gemini API Key
GOOGLE_GENERATIVE_AI_API_KEY=YOUR_GOOGLE_GEMINI_API_KEY_HERE

### Base URL for your application (important for API routes, etc.)
NEXT_PUBLIC_BASE_URL=http://localhost:3000 # Change if deploying

### Firebase Configuration (Client-side)
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL=YOUR_FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY=YOUR_FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_INCLUDING_NEWLINES
Use code with caution.
Dotenv
Important: Replace the placeholder values (YOUR_..._HERE) with your actual credentials from Firebase, Vapi, and Google AI Studio.

Security: Never commit your .env.local file containing sensitive keys to version control. The .gitignore file should already include .env.local.

Open http://localhost:3000 (or the specified port) in your browser to see the application running.

🎮 Usage
Once the application is running (either locally or deployed):

Sign Up / Sign In: Create an account or log in using your email and password.

Dashboard: Access your dashboard to view past interviews or start a new one.

Create Interview: Click 'Create New Interview' (or similar button). You might need to specify job role, description, or other parameters for the AI.

Start Interview: Begin the voice interview session with the Vapi AI agent.

Review Feedback: After completing the interview, access the detailed transcript and AI-generated feedback on your performance.

🤝 Contributing
Contributions are welcome! If you'd like to improve CareerSpark, please follow these steps:

Fork the repository on GitHub.

Clone your forked repository locally (git clone https://github.com/YourUsername/ai_mock_interviews.git).

Create a new branch for your feature or bug fix (git checkout -b feature/your-awesome-feature or fix/issue-123).

Make your changes and commit them with clear messages.

Push your changes to your fork (git push origin feature/your-awesome-feature).

Open a Pull Request (PR) against the main branch of the original adrianhajdin/ai_mock_interviews repository.

Clearly describe your changes in the PR.

Please check the Issues tab for existing bugs or feature requests. Feel free to discuss potential changes in an issue before starting work.

<!-- TODO: Consider creating a CONTRIBUTING.md file for more detailed guidelines -->
<!-- See our [Contribution Guidelines](CONTRIBUTING.md) for more details. -->
💬 Community & Support
❓ Need help or found a bug?

Join our active Discord community! With over 50k+ members, it's a great place to ask questions, share ideas, and connect with other developers.

➡️ Join the Discord Server <!-- TODO: Replace with your actual Discord invite link -->

You can also open an issue on the GitHub Issues page.

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

<!-- TODO: Make sure you have a LICENSE file in your repository root -->

<!-- Add any other acknowledgments here -->
**Next Steps for You:**

1.  **Fill in TODOs:** Replace all `<!-- TODO: ... -->` placeholders with actual information (badges, logo path, screenshot path/URL, live demo URL, Discord invite link, confirm license and add LICENSE file).
2.  **Verify Repo URL:** Double-check if `adrianhajdin/ai_mock_interviews` is the correct main repository URL you want contributors to interact with. If it's your fork, update the URLs accordingly.
3.  **Add `CONTRIBUTING.md` (Optional but Recommended):** Create this file for more detailed contribution guidelines (code style, PR process, code of conduct).
4.  **Add `LICENSE` File:** Create a file named `LICENSE` in the root and paste the MIT license text into it.
5.  **Review and Commit:** Read through the generated README.md, ensure it's accurate, save it as `README.md` in your project root, and commit it to your repository.
