import { FC, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export const MainLayout: FC<IProps> = ({ children }) => {
  return (
    <main className='container justify-center flex mx-auto px-4'>
      {children}
    </main>
  );
};
