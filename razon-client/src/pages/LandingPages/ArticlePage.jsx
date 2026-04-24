import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import articles from '../../assets/article-content';  
import NotFoundPage from '../NotFoundPage';


function ArticlePage() {
  const { name } = useParams();
  const article = articles.find(article => article.name === name);

  if (!article) {
    return <NotFoundPage />; 
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-8 lg:px-8">
        <div className="max-w-3xl">
          <Button to="/articles" className="mb-4">Back to Articles</Button>
          <h1 className="text-4xl font-bold text-zinc-900">{article.title}</h1>
        </div>
      </section>

      <section className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <img src={article.imageUrl} alt={article.title} className="mb-8 w-full rounded-2xl border-2 border-zinc-900" />
          <div className="space-y-4 text-lg text-zinc-700">
            {article.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;