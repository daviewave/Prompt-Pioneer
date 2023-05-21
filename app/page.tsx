import { FC } from 'react';

type Props = {};

const Home: FC<Props> = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Prompt Pioneer is a community-driven platform for discovering and
        sharing AI-generated prompts for your next creative project.
      </p>

      {/* Feed Component */}
      {/* <Feed /> */}
    </section>
  );
};

export default Home;
