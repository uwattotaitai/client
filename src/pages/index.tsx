import Head from 'next/head'
import useSWR from 'swr';

import PostCard from '../components/PostCard';
import { Post } from '../types';
import { Sub } from '../types';
import Image from 'next/image';
import Link from 'next/link';


export default function Home() {
  const { data: posts } = useSWR('/posts');
  const { data: topSubs } = useSWR('/misc/top-subs');

  // const [posts, setPosts] = useState<Post[]>([]);

  // useEffect(() => {
  //   Axios.get('/posts')
  //   .then(res => setPosts(res.data))
  //   .catch(err => console.log(err));
  // }, [])

  return (
    <>
      <Head>
        <title>reddit: the fron page of the internet</title>
      </Head>
      <div className="container flex pt-4">
        {/* posts feed */}
        <div className="w-160">
          {posts?.map((post: Post) => (
              <PostCard post={post} key={post.identifier} />
          ))}
        </div>
        {/*  sidebar */}
        <div className="ml-6 w-80">
          <div className="bg-white rounded">
            <div className="p-4 border-b-2">
              <p className="text-lg text-center font-demibold">
                  Top communities
              </p>
            </div>
            <div>
              {topSubs?.map((sub: Sub) => (
                <div key={sub.name} className="flex items-center px-4 py-2 text-xs border-b" >
                  <Link href={`/r/${sub.name}`}>
                    <Image
                      src={sub.imageUrl}
                      alt="Sub"
                      className="rounded-full cursor-pointer"
                      width={6 * 16 /4}
                      height={6 * 16 /4}
                    />
                  </Link>
                  <Link href={`/r/${sub.name}`}>
                    <a className="ml-2 font-bold hover:cursor-pointer">
                      /r/{sub.name}
                    </a>
                  </Link>
                  <p className="ml-auto font-medium">
                    {sub.postCount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ↓ SSRをしたい時はデータの取得を下記のようにやると良い
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const res = await Axios.get('/posts')

//     return { props: { posts: res.data }}
//   } catch (err) {
//     return { props: { error: 'エラーが発生しました！'}}
//   }
// }
