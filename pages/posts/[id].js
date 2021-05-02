import { useRouter } from "next/router";
import { getAllPostIds, getPostData } from "../../lib/posts";

export default function PostData({ post }) {
  const router = useRouter();

  if (router.isFallback || !post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-5 w-full">
      <div className="flex justify-center flex-col items-center mb-5">
        <h1 className="text-3xl mb-3 font-bold">{post.title}</h1>
        <p className="mb-3">{post.created_at}</p>
        <div className="border w-14"></div>
      </div>
      <p className="whitespace-pre-wrap">{post.content}</p>
    </div>
  );
}

// 投稿一覧の ID を取得
export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: true,
  };
}

// 投稿詳細のデータを取得
export async function getStaticProps({ params }) {
  const post = await getPostData(params.id);
  return {
    props: {
      post,
    },
    revalidate: 3,
  };
}
