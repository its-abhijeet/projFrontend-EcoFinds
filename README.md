# 🌍 EcoFind - A Sustainable Second Marketplace

EcoFind is a vibrant and trusted **Next.js-based marketplace** that revolutionizes the way people buy and sell pre-owned goods.  
Our mission is to foster a culture of sustainability by extending the lifecycle of products, reducing waste, and offering a convenient alternative to buying new items.  

✨ **Vision**:  
To become the go-to destination for a conscious community seeking **unique finds** and **responsible consumption**.

***

## 🚀 Features
- 🌱 **Sustainable Marketplace** – Buy and sell second-hand goods easily.
- 🏠 **Product Categories**:
  - Home appliances (small & large)
  - Small electronic appliances
  - Wooden and glass furniture
  - Kitchen utensils
  - Reusable plastic ware
- 🎨 **Modern UI** – Built with Next.js, TailwindCSS, and Framer Motion for smooth animations.
- 📩 **Email Notifications** – Integrated with Nodemailer + Handlebars templates.
- 📊 **Charts & Analytics** – Visual insights powered by Recharts.
- 🔑 **Authentication & Context Management** – Scalable state handling.
- 📱 **Responsive Design** – Optimized for mobile and desktop platforms.

***

## 🛠️ Tech Stack
- **Framework**: [Next.js](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), PostCSS, Autoprefixer
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: Heroicons, Lucide, React Icons
- **Database**: [Prisma ORM](https://www.prisma.io/)
- **Email**: Nodemailer + Handlebars templates
- **Charts**: Recharts
- **Utilities**: ScrollReveal, dotenv

***

## 📂 Project Structure

```
src/
├── app/           # App router pages & layouts
├── components/    # Reusable UI components
├── constants/     # Static values and configs
├── context/       # Global state/context providers
├── fonts/         # Custom/local fonts
└── services/      # API calls and service logic

.eslintrc.mjs         # ESLint configuration
tailwind.config.js    # TailwindCSS configuration
postcss.config.mjs    # PostCSS configuration
tsconfig.json         # TypeScript configuration
package.json          # Dependencies and scripts
```

***

## ⚙️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/its-abhijeet/projFrontend-EcoFinds.git
cd projFrontend-EcoFinds
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables  
Create a `.env.local` file in the root directory and add:

```bash
# Database
DATABASE_URL=your_database_url

# Email (SMTP)
EMAIL_SERVER=smtp.example.com
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_password

# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

👉 You can also refer to `.env.example` for a template.

### 4. Run the development server
```bash
npm run dev
```
App will be available at:  
👉 [http://localhost:3000](http://localhost:3000)

### 5. Build for production
```bash
npm run build
npm start
```

***

## 🧪 Scripts
- `npm run dev` – Start development server  
- `npm run build` – Build production version  
- `npm start` – Run production build  
- `npm run lint` – Run ESLint checks  

***

## 🤝 Contributing
We welcome contributions to make EcoFind better!  

1. Fork the repo 🍴  
2. Create a new branch:  
   ```bash
   git checkout -b feature-branch
   ```
3. Make changes and commit:  
   ```bash
   git commit -m "Added new feature"
   ```
4. Push to your fork:  
   ```bash
   git push origin feature-branch
   ```
5. Open a Pull Request 🚀  

***

## 🐛 Issues
Found a bug or have a feature request?  
Please open an issue here 👉 [Issues Page](https://github.com/its-abhijeet/projFrontend-EcoFinds/issues)

***

## 📜 License
This project is licensed under the **ISC License**.

***

## 🌱 About EcoFind
EcoFind envisions a future where waste transforms into opportunity.  
By promoting reuse, recycling, and conscious consumption, we empower individuals and businesses to be part of the **circular economy revolution**.  

Let’s build a better tomorrow together ♻️  

---  

Would you like me to also create a `.env.example` file template so contributors can easily set up their environment variables?
