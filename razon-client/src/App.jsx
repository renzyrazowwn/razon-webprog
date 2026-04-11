import './App.css';
import Layout from './components/Layout';
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import HomePage from './pages/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';

const routes = [
  {
    path: '/',
    element: <Layout />, 
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/', // Index/Home
        element: <HomePage />
      },
      {
        path: '/about', // Now it will render inside Layout
        element: <AboutPage />
      },
      {
        path: '/articles', // Now it will render inside Layout
        element: <ArticleListPage />
      },
      {
        path: '/articles/:name', // Now it will render inside Layout
        element: <ArticlePage />
      }
    ]
  }
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;