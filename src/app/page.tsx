'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export interface Job {
  id: number;
  title: string;
  company: string;
  link: string;
  date: string;
  description: [];
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasNext, setHasNext] = useState<boolean>(false);

  useEffect(() => {
    fetch(`http://localhost:5000/vagas/read?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        if (page == 1) {
          setJobs(data.jobs);
        } else {
          setJobs((prevJobs) => {
            return [...prevJobs, ...data.jobs];
          });
        }
        setHasNext(data.has_next);
      });
  }, [page]);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center py-16">
      <h3 className="text-2xl font-bold mb-12">Vagas ({jobs.length})</h3>
      <ul>
        {jobs.map((job) => (
          <li key={job.id} className="py-3 mb-3 border-b-2 border-white/50">
            <Link href={`/job/${job.id}`}>
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-lg text-white/50">{job.company}</p>
              <p className="text-sm text-white/30">{job.date}</p>
            </Link>
          </li>
        ))}
      </ul>

      {hasNext && (
        <button
          onClick={() => setPage(page + 1)}
          className="mt-3 cursor-pointer"
        >
          Ver mais
        </button>
      )}
    </div>
  );
}
