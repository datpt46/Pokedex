'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const Pagination = ({
  next,
  previous,
}: {
  next: boolean;
  previous: boolean;
}) => {
  const params = useSearchParams();
  const page = Number(params.get('page') ?? 1);
  return (
    <div className="flex">
      <Link
        className={`flex items-center justify-center px-3 h-8 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
          previous ? '' : 'pointer-events-none'
        }`}
        href={{
          pathname: '/',
          query: { page: Math.max(1, page - 1) },
        }}
      >
        <svg
          className="w-3.5 h-3.5 mr-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 5H1m0 0 4 4M1 5l4-4"
          />
        </svg>
        Previous
      </Link>
      <Link
        className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
          next ? '' : 'pointer-events-none'
        }`}
        href={{
          pathname: '/',
          query: { page: page + 1 },
        }}
      >
        Next
        <svg
          className="w-3.5 h-3.5 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
    </div>
  );
};

export default Pagination;
