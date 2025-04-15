import TopBlogsSection from '../components/blog/TopBlogsSection';
import LatestBlogsSection from '../components/blog/LatestBlogsSection';

export default function BlogPage() {
  return (
    <main className="bg-gray-50">
      <TopBlogsSection />
      <LatestBlogsSection />
    </main>
  );
}
