'use client';

import { FC, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';
import user from '@models/user';

type ProfilePageProps = {};

const profilePageDescription = `Welcome to your personal haven on Prompt Pioneers. This is your space to explore, create, and share an array of AI-powered prompts tailored to your creative process. Here, you can track your productivity, efficiency, and the milestones of your creative journey.`;

const ProfilePage: FC<ProfilePageProps> = ({}) => {
  const router = useRouter();
  const { data: session }: any = useSession();

  const [posts, setPosts] = useState([]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this prompt?'
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        });

        const filteredPosts = posts.filter((p: any) => p._id !== post.id);
        setPosts(filteredPosts);

        window.location.reload();
      } catch (error) {
        console.log('error: ', error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user?.id}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log('error: ', error);
      }
    };
    if (session?.user?.id) fetchPosts();
  }, [session?.user?.id]);

  return (
    <Profile
      name={session?.user?.name}
      desc={profilePageDescription}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
