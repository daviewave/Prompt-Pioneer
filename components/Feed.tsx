'use client';

import { FC, useState, useEffect, useRef, useCallback } from 'react';
import PromptCard from './PromptCard';
import Spinner from '@components/Spinner';

type PromptCardListProps = {
  data: any[];
  handleTagClick: (tag: string) => void;
};

type Post = {
  _id: string;
  creator: {
    username: string;
  };
  prompt: string;
  tag: string;
};

const PromptCardList: FC<PromptCardListProps> = ({ data, handleTagClick }) => {
  return (
    <div className="mt-4 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      ))}
    </div>
  );
};
type FeedProps = {};

const Feed: FC<FeedProps> = (props: FeedProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<any>([]);
  const [loading, setLoading] = useState(true); // starts as true
  const [firstLoad, setFirstLoad] = useState(true); // new state
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer: any = useRef();

  const lastPostElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      if (hasMore) {
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            setPage((prevPageNumber) => prevPageNumber + 1);
          }
        });
        if (node) observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  const getFilteredPosts = (searchText) => {
    const regex = new RegExp(searchText, 'i');
    return posts.filter(
      (post: any) =>
        regex.test(post.creator.username) ||
        regex.test(post.prompt) ||
        regex.test(post.tag)
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = getFilteredPosts(e.target.value);
        setSearchResults(searchResult);
      }, 300)
    );
  };

  const handleTagClick = (tag: string) => {
    clearTimeout(searchTimeout);
    setSearchText(tag);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = getFilteredPosts(tag);
        setSearchResults(searchResult);
      }, 100)
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      if (firstLoad) setLoading(true);
      try {
        console.log('page: ', page);
        const response = await fetch(`/api/prompt/?limit=9&page=${page}`);
        const data = await response.json();

        console.log('data: ', data);

        if (data.prompts && data.prompts.length === 0) fetchPosts(); // if no posts, fetch again

        // need to change 135 to the total number in the database
        if (data.prompts && data.prompts.length > data.totalCount - 9) {
          setHasMore(false);
        }

        if (data.prompts && data.prompts.length < 9) {
          setHasMore(false);
        }

        if (data.prompts && data.prompts.length > 0) {
          setPosts((prevPosts: any) => [...prevPosts, ...data.prompts]);
          if (firstLoad) setFirstLoad(false); // set firstLoad to false after first load finishes
        }
      } catch (error) {
        console.log('error: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [page]);

  const ref: any = useRef(null);

  const loadMore = () => {
    // capture current scroll position
    const currentScrollPosition = window.pageYOffset;
    setPage((prevPageNumber) => prevPageNumber + 1);
    window.setTimeout(() => {
      window.scrollTo(0, currentScrollPosition);
    }, 0);
  };

  const removeDuplicates = (arr) => {
    return arr.filter((obj, index) => {
      const _obj = JSON.stringify(obj);
      return (
        index ===
        arr.findIndex((obj) => {
          return JSON.stringify(obj) === _obj;
        })
      );
    });
  };

  return (
    <section className="feed relative">
      <form className="relative w-full flex-center sticky top-0 z-10 ">
        <input
          type="text"
          placeholder="Search Prompts by Keyword, Tag, or Username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {loading ? (
        <div className="mt-5">
          <Spinner message="Loading feed..." />
        </div>
      ) : searchResults && searchResults.length > 0 ? (
        <div className="flex-center flex-col" ref={ref}>
          <PromptCardList
            data={removeDuplicates(searchResults)}
            handleTagClick={handleTagClick}
          />
        </div>
      ) : (
        posts.length > 0 && (
          <div className="flex-center flex-col" ref={ref}>
            <PromptCardList
              data={removeDuplicates(posts)}
              handleTagClick={handleTagClick}
            />
          </div>
        )
      )}

      {!loading && (
        <button
          onClick={loadMore}
          className="flex-center ml-4 p-4 px-8 bg-gray-100 rounded-full focus:outline-none border-2 border-orange-500 max-h-12 my-4"
        >
          Load More
        </button>
      )}
    </section>
  );
};

export default Feed;
