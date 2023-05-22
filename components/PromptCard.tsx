'use client';

import { FC, useState } from 'react';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

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
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post?.creator?.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text -gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            alt="copy_icon"
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user?.id === post.creator._id && pathname === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
