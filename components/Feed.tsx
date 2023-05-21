'use client';

import { FC, useState, useEffect } from 'react';

import PromptCard from './PromptCard';

type PromptCardListProps = {
  data: any[];
  handleTagClick: (tag: string) => void;
};

const PromptCardList: FC<PromptCardListProps> = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
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
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/prompt');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log('error: ', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search Prompts by Tag or Username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
