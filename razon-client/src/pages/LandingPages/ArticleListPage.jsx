import { useEffect, useState } from 'react';
import Button from '../../components/Button.jsx';
import ArticleList from '../../components/ArticleList.jsx';
import { fetchArticles } from '../../services/ArticleService';

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const { data } = await fetchArticles();

        const articlesList = data.articles || data;

        setArticles(articlesList.filter((article) => article.isPublished));
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          FITNESS KNOWLEDGE
        </p>

        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Fuel Your Mind, Transform Your Body
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Explore science-backed training tips, nutritional strategies, and lifestyle guides curated by our expert coaches to help you reach your peak performance.
        </p>

        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Fitness Knowledge
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Featured Fitness Insights
          </h2>
        </div>

        {loading ? (
          <p className="text-sm text-zinc-600">Loading articles...</p>
        ) : articles.length > 0 ? (
          <ArticleList articles={articles} />
        ) : (
          <p className="text-sm text-zinc-600">No articles available yet.</p>
        )}
      </section>
    </div>
  );
};

export default ArticleListPage;