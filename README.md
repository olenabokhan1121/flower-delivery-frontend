🌸Flower Delivery App. Fast, beautiful, and fresh flower delivery. Choose the
perfect bouquet anytime, anywhere.

✨ Features 📍 Flower shop list in the sidebar. Browse flowers by shop or view
all available products. Add/remove items from the shopping cart 📂 Flower
catalog with filtering by price and date. Load more products with pagination.
Smooth scroll to newly loaded items. Responsive layout 🧡 Favorites: users can
save flowers Backend-powered pagination and server-side filtering ✅ Order form
is built using Formik. Client-side validation ensures correct input (email,
phone, address). Prevents submission of invalid data. Provides user-friendly
error messages 📦Persistent global state using Redux and redux-persist 🛠
Technologies: React 19 + Vite Redux Toolkit for global state React Router for
navigation Axios for HTTP requests CSS Modules Redux Persist to store carts in
localStorage Formik

😏Client-Side Identification & Order Flow This project does not implement full
user authentication. Instead, a lightweight client identification approach is
used: A UUID is generated on the first visit and stored in cookies (valid for 1
year) The cookie is automatically included in all backend requests Favorite
flowers are linked to this client ID on the backend

🤝Shopping Cart & Order Submission The shopping cart is stored in localStorage
on the client side. This allows users to keep selected items even after page
reloads. When the user submits the order form, cart data and customer details
are sent to the backend. The backend creates and stores the order with timestamp
and client-related data. After successful submission, the cart is cleared and a
confirmation message is shown.

This approach keeps the UX simple while ensuring data persistence and smooth
order processing. 🔗 View deployed site on Vercel
https://flower-delivery-frontend.vercel.app/

📦 Installation git clone
https://github.com/olenabokhan1121/flower-delivery-frontend cd
flower-delivery-frontend npm install npm run dev

🔐 Built with the MERN stack (MongoDB, Express.js, React.js, and Node.js). This
backend service is deployed and running on
[Render.com](https://flower-delivery-app-gj8q.onrender.com). ⚠️Note: Backend is
hosted on Render free tier, so it may take up to 30–60 seconds to wake up on
first request. In rare cases, POST requests (creating an order) may fail due to
service sleep limitations.

👩‍💻 Author [Olena Bokhan](https://github.com/olenabokhan1121)— Frontend
Developer. Motivated, systematic, and detail-focused. Passionate about blending
functional architecture with elegant design.
