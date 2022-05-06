import {
  Table as TableConteiner,
  TableBody,
  TableHead,
  CircularProgress,
  TableCell,
  TableRow,
  TablePagination,
} from '@mui/material';
import { MainLayout } from 'layout/main';
import { useFetch } from 'hooks/use-fetch';
import { FC, useState } from 'react';

type TData = Array<{
  userId: number;
  id: number;
  title: string;
  body: string;
}>;

const URL_API = 'https://jsonplaceholder.typicode.com/posts/';

export const Table: FC = () => {
  const { data, loading } = useFetch<TData>(URL_API);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  console.log('page', page);
  console.log('rowsPerPage', rowsPerPage);

  const handleChangePage = (event: unknown, page: number) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+target.value);
  };

  return (
    <MainLayout>
      {loading ? (
        <div className='flex h-screen items-center justify-center'>
          <CircularProgress />
        </div>
      ) : (
        <>
          <TableConteiner className='rounded-lg border-solid border-2 border-gray-100'>
            <TableHead>
              <TableRow className='bg-slate-600'>
                <TableCell className='!text-white'>id</TableCell>
                <TableCell className='!text-white'>Загаловок</TableCell>
                <TableCell className='!text-white'>Текст</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(({ userId, id, title, body }) => (
                  <TableRow className='even:bg-slate-100' key={id}>
                    <TableCell className='w-1'>{userId}</TableCell>
                    <TableCell>{title}</TableCell>
                    <TableCell>{body}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </TableConteiner>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            colSpan={3}
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </MainLayout>
  );
};
