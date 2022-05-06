import { FC, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export const MainLayout: FC<IProps> = ({ children }) => {
  return (
    <main className='container flex-col w-2/5 justify-center flex mx-auto px-4'>
      {children}
    </main>
  );
};
