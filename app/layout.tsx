import { FC, ReactNode } from 'react';

import '@styles/globals.css';

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
        {/* Putting a self closing div tag within another div that has the css for the main component the layout  */}
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
