import {
  Table as TableConteiner,
  TableBody,
  TableHead,
  CircularProgress,
  TableCell,
  TableRow,
} from '@mui/material';
import { MainLayout } from 'layout/main';
import { useFetch } from 'hooks/use-fetch';
import { FC } from 'react';

type TData = Array<{
  userId: number;
  id: number;
  title: string;
  body: string;
}>;

const URL_API = 'https://jsonplaceholder.typicode.com/posts/';

export const Table: FC = () => {
  const { data, loading } = useFetch<TData>(URL_API);

  return (
    <MainLayout>
      {loading ? (
        <div className='flex h-screen items-center justify-center'>
          <CircularProgress />
        </div>
      ) : (
        <TableConteiner
          sx={{ maxWidth: 850 }}
          className='rounded-lg border-solid border-2 border-gray-100'
        >
          <TableHead>
            <TableRow className='bg-slate-600'>
              <TableCell className='!text-white'>id</TableCell>
              <TableCell className='!text-white'>Загаловок</TableCell>
              <TableCell className='!text-white'>Текст</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(({ userId, id, title, body }) => (
              <TableRow className='even:bg-slate-100' key={id}>
                <TableCell className='w-1'>{userId}</TableCell>
                <TableCell>{title}</TableCell>
                <TableCell>{body}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableConteiner>
      )}
    </MainLayout>
  );
};
