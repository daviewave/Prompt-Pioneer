import { FC } from 'react';

import Link from 'next/link';

type Post = {
  prompt: string;
  tag: string;
};
type FormProps = {
  type: string;
  post: Post;
  setPost: any; // not sure what this is supposed to be
  submitting: boolean;
  handleSubmit: any; // need to change this to a function call
};

const Form: FC<FormProps> = (props: FormProps) => {
  const { type, post, setPost, submitting, handleSubmit } = props;

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Prompt</span>
      </h1>
      <p className="desc text-left max-w-md">
        Contribute to the Prompt Pioneer community with prompts that enhance
        your creative journey, amplifying your productivity and efficiency.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag
          </span>

          <textarea
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#web-development, #frontend, #backend, #fullstack, etc..."
            required
            className="form_textarea"
          />
        </label>

        <div className="flex-end mx-3 mb-1 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : `${type}`}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
