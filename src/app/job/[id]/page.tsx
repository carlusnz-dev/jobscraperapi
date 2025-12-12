'use client';

import { Job } from '@/app/page';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function JobPage() {
  const params = useParams<{ id: string }>();
  const [job, setJob] = useState<Job>();

  useEffect(() => {
    fetch(`http://localhost:5000/vagas/${params.id}`)
      .then((response) => response.json())
      .then((data) => setJob(data));
  }, [params.id]);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <div className="w-full max-w-1/2 flex flex-col items-center text-center">
        {job?.link.includes('gupy') && (
          <p className="mb-3 px-3 text-lg text-black bg-white">Gupy</p>
        )}

        <h1 className="text-4xl font-bold">{job?.title}</h1>
        <h3 className="text-2xl text-white/40">{job?.company}</h3>
        <p className="text-lg text-white/80">{job?.date}</p>
        <span className="w-1/2 md:w-1/3 my-5 sm:my-8 border border-white/50 rounded-full"></span>
        <ul className="list-decimal">
          {job?.description.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="flex">
          <Link href={`/`} className="text-white">
            <p className="mt-12 px-5 py-2 bg-transparent text-white border-2 border-white hover:bg-white hover:text-black transition-all">
              Voltar
            </p>
          </Link>
          <a
            className="mt-12 px-5 py-2 bg-white text-black hover:opacity-50 transition-all"
            href={job?.link}
            target="_blank"
          >
            Ver mais
          </a>
        </div>
      </div>
    </div>
  );
}
