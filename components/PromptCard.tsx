'use client';

import { FC, useState } from 'react';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

import CopyToClipboard from './CopyToClipboard';

type PromptCardProps = {
  post: any;
  handleTagClick: (tag: string) => void;
  handleEdit: any;
  handleDelete: any;
};

const PromptCard: FC<PromptCardProps> = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session }: any = useSession();

  const [copied, setCopied] = useState('');

  const handleCopy = async () => {
    try {
      setCopied(post.prompt);
      await navigator.clipboard.writeText(post.prompt);
      setTimeout(() => {
        setCopied('');
      }, 3000);
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };

  return (
    <div
      className="prompt_card max-w-xl cursor-pointer"
      onClick={() => router.push(`/prompt-details/?id=${post._id}`)}
    >
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // This will prevent parentClickHandler from being called

            router.push(
              `/profile/?id=${post.creator._id}&name=${post.creator.username}`
            );
          }}
        >
          <Image
            src={post?.creator?.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post?.creator?.username}
            </h3>
            <p className="font-inter text-sm text -gray-500">
              {post?.creator?.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <CopyToClipboard text={post.prompt} />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>

      <p
        className="mb-5 font-inter text-sm blue_gradient cursor-pointer"
        onClick={(e) => {
          e.stopPropagation(); // This will prevent parentClickHandler from being called
          handleTagClick && handleTagClick(post.tag);
        }}
      >
        {post.tag}
      </p>

      {session?.user?.id === post?.creator?._id && pathname === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100">
          <p
            className="font-inter text-sm px-4 py-2 w-20 text-center rounded-full border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm px-4 py-2 w-20 text-center rounded-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}

      {pathname === '/' && (
        <button
          className="font-inter text-xs px-2 py-1 text-blue-500 bg-white border-2 border-blue-500 rounded-full hover:bg-blue-500 hover:text-white absolute bottom-2 right-2"
          onClick={() => router.push(`/prompt-details/?id=${post._id}`)}
        >
          Try
        </button>
      )}
    </div>
  );
};

export default PromptCard;
