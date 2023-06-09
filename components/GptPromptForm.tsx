import { FC } from 'react';
import Link from 'next/link';

import PromptCard from './PromptCard';
import Spinner from './Spinner';

type Post = {
  prompt: string;
  tag: string;
};
type FormProps = {
  post: any;
  setPost: any; // not sure what this is supposed to be
  submitting: boolean;
  handleSubmit: any; // need to change this to a function call
  gptResponse: string;
};

const GptPromptForm: FC<FormProps> = (props: FormProps) => {
  const { post, setPost, submitting, handleSubmit, gptResponse } = props;

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Try Prompt</span>
      </h1>
      <p className="desc text-left max-w-md">
        Experiment with the prompt as provided, or tailor it to your specific
        requirements for a personalized engagement.
      </p>

      {/* Only display this on large devices */}
      <div
        className="hidden lg:flex flex-row justify-evenly items-center w-full gap-7 mt-6"
        // style={{ height: '50vh' }}
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl flex flex-col sm:flex-row gap-7 items-center justify-between glassmorphism"
        >
          {/* 
            THIS IS THE '.form_prompt css class
            .form_prompt {
              @apply w-full rounded-lg mt-2 p-3 text-sm text-gray-500 outline-0;
            }          
          */}
          <textarea
            value={post.promptEdit}
            onChange={(e) => setPost({ ...post, promptEdit: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_prompt w-full sm:w-full h-full sm:h-300"
          />

          {submitting ? (
            <Spinner message="" />
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-sm bg-primary-orange rounded-full text-white w-full sm:w-auto"
              aria-disabled={submitting}
            >
              {submitting ? 'Generating response...' : 'Generate'}
            </button>
          )}
        </form>

        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={() => {}}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      </div>

      {/* Only display this on medium and small devices */}
      <div
        className="lg:hidden flex flex-col justify-evenly items-center w-full gap-7 mt-6"
        style={{ height: '50vh' }}
      >
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={() => {}}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl flex flex-col sm:flex-row gap-7 items-center justify-between glassmorphism"
        >
          {/* <div style={{ display: 'flex', height: 'auto' }}> */}
          <textarea
            value={post.promptEdit}
            onChange={(e) => setPost({ ...post, promptEdit: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_prompt w-auto sm:w-full"
          />

          {submitting ? (
            <Spinner message="" />
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-sm bg-primary-orange rounded-full text-white w-full sm:w-auto"
              aria-disabled={submitting}
            >
              {submitting ? 'Generating response...' : 'Generate'}
            </button>
          )}
          {/* </div> */}
        </form>
      </div>

      <div className="mt-10 w-full glassmorphism p-5">
        <h2 className="text-xl">ChatGPT Response:</h2>

        {submitting ? (
          <div className="mt-4 bg-white p-5 rounded shadow">
            <Spinner message="" />
          </div>
        ) : (
          <div className="mt-4 bg-white p-5 rounded shadow">
            {gptResponse || 'No response yet...'}
          </div>
        )}
      </div>
    </section>
  );
};

export default GptPromptForm;
