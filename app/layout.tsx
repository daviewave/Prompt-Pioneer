import { FC, ReactNode } from 'react';

import '@styles/globals.css';

import Nav from '@components/Nav';
import Provider from '@components/Provider';

interface Metadata {
  title: string;
  description: string;
}

export const metadata: Metadata = {
  title: 'Prompt Pioneer',
  description:
    'Discpver & share AI-generated prompts for your next creative project.',
};

type Props = {
  children: ReactNode;
};

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {/* not quite sure what 'session' is supposed to be as it is not discussed in the course */}
        <Provider session={undefined}>
          {/* Putting a self closing div tag within another div that has the css for the main component the layout  */}
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
