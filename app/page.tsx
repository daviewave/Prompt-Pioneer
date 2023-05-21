import { FC } from 'react';

import Feed from '@components/Feed';

type Props = {};

const Home: FC<Props> = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        <div>Discover & Share</div>
        <br className="max-md:hidden" />
        <div>
          <span className="orange_gradient text-center">
            AI-Powered Prompts
          </span>
        </div>
      </h1>
      <p className="desc text-center">
        Prompt Pioneer is a community-driven platform for discovering and
        sharing AI-generated prompts for your next creative project.
      </p>

      <Feed />
    </section>
  );
};

export default Home;
