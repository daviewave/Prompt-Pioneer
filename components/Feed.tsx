'use client';

import { FC, useState, useEffect, useRef, useCallback } from 'react';
import PromptCard from './PromptCard';
import Spinner from '@components/Spinner';

type PromptCardListProps = {
  data: any[];
  handleTagClick: (tag: string) => void;
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
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<any>(null);
  const [searchResults, setSearchResults] = useState([]);
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
        const response = await fetch(`/api/prompt?page=${page}`);
        const data = await response.json();

        if (data.prompts && data.prompts.length === 0) fetchPosts(); // if no posts, fetch again

        // need to change 135 to the total number in the database
        if (!data.prompts || data.prompts.length < 135) {
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

    // reset the scroll position after the state updates and re-render
    window.setTimeout(() => {
      window.scrollTo(0, currentScrollPosition);
    }, 0);
  };

  return (
    <section className="feed relative">
      <form className="relative w-full flex-center">
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
      ) : posts.length > 0 ? (
        <div className="flex-center flex-col" ref={ref}>
          <PromptCardList data={posts} handleTagClick={handleTagClick} />

          <button
            onClick={loadMore}
            className="flex-center ml-4 p-4 bg-gray-100 rounded-full focus:outline-none border-2 border-orange-500 max-h-14"
          >
            Load More
          </button>
        </div>
      ) : (
        <p>No search results found for "{searchText}"</p>
      )}
    </section>
  );
};

export default Feed;
