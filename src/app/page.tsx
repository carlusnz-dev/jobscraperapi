'use client';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';

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
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [hasNext, setHasNext] = useState<boolean>(false);

  const handleSearch = () => {
    fetch(`http://localhost:5000/vagas/search?page=${page}&query=${searchTerm}`)
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
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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
      <div className="sticky top-0 w-full flex flex-col justify-center items-center py-6 bg-background shadow">
        <h3 className="text-2xl font-bold mb-12">Vagas ({jobs.length})</h3>
        <div className="flex w-1/2 mb-12">
          <input
            type="search"
            name="search"
            value={searchTerm}
            onChange={handleInputChange}
            className="w-full border-2 border-white/25 rounded-lg py-2 px-3 focus:ring-4 ring-white/75 transition-all"
            placeholder="Digite o nome ou empresa"
          />
          <button
            className="ms-2 px-5 py-2 bg-white text-black hover:opacity-50 transition-all"
            type="submit"
            onClick={handleSearch}
          >
            Pesquisar
          </button>
        </div>
      </div>

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
