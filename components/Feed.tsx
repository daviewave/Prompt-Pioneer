'use client';

import { FC, useState, useEffect } from 'react';

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

  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      try {
        const response = await fetch('/api/prompt');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log('error: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
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
      ) : searchText.length > 0 ? (
        searchResults.length > 0 ? (
          <PromptCardList
            data={searchResults}
            handleTagClick={handleTagClick}
          />
        ) : (
          <p>No search results found for "{searchText}"</p>
        )
      ) : (
        posts.length > 0 && (
          <PromptCardList data={posts} handleTagClick={handleTagClick} />
        )
      )}

      {searchText.length > 0 ? (
        searchResults.length > 0 ? (
          <PromptCardList
            data={searchResults}
            handleTagClick={handleTagClick}
          />
        ) : (
          <p>No search results found for "{searchText}"</p>
        )
      ) : (
        posts.length > 0 && (
          <PromptCardList data={posts} handleTagClick={handleTagClick} />
        )
      )}
    </section>
  );
};

export default Feed;
