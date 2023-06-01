'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';
import GptPromptForm from '@components/GptPromptForm';

type Props = {};

const PromptDetails = (props: Props) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [gptResponse, setGptResponse] = useState('');
  const [error, setError] = useState('');
  const [post, setPost] = useState({
    prompt: '',
    promptEdit: '',
    tag: '',
    creator: {
      _id: '',
      username: '',
      image: '',
    },
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();

        setPost({
          prompt: data.prompt,
          promptEdit: data.prompt,
          tag: data.tag,
          creator: data.creator,
        });
      } catch (error) {
        console.log('error: ', error);
      }
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const getGptResponse = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    if (!post?.promptEdit) return alert('Prompt ID not found');

    try {
      const response = await fetch('/api/try-prompt', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.promptEdit,
        }),
      });

      const data = await response.json();

      console.log('data: ', data);

      setGptResponse(data);
    } catch (error: any) {
      console.log(error);
      setError(error);
    } finally {
      setSubmitting(false);
    }
  };

  console.log('gptResponse:', gptResponse);

  return (
    <div className="w-full">
      <GptPromptForm
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={getGptResponse}
        gptResponse={gptResponse}
        error={error}
      />
    </div>
  );
};

export default PromptDetails;
