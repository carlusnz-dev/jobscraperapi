'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export interface Job {
  id: number;
  title: string;
  company: string;
  link: string;
  description: [];
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/vagas/read')
      .then((response) => response.json())
      .then((data) => setJobs(data));
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center py-16">
      <h3 className="text-2xl font-bold mb-12">Vagas (0)</h3>
      <ul>
        {jobs.map((job) => (
          <li key={job.id} className="py-3 mb-3 border-b-2 border-white/50">
            <Link href={`/job/${job.id}`}>
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-lg text-white/50">{job.company}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
