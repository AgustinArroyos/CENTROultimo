import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaRegCalendarAlt } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const API_BASE = 'https://centroformacion.hopto.org';

const formatDate = (value) => {
  if (!value) return '';
  return new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short' }).format(new Date(value));
};

const imageUrl = (post) => {
  const url = post?.attributes?.Portada?.data?.attributes?.url;
  return url ? `${API_BASE}${url}` : '';
};

const Prueba = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/posts?populate=*`);
        const data = await response.json();
        setPosts(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error('Error al obtener los posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const orderedPosts = useMemo(() => {
    return [...posts].sort((a, b) => new Date(b.attributes?.publishedAt || 0) - new Date(a.attributes?.publishedAt || 0));
  }, [posts]);

  const featuredPost = orderedPosts[0];
  const secondaryPosts = orderedPosts.slice(1, 5);

  useEffect(() => {
    if (!sectionRef.current || isLoading) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        '.news-heading',
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        }
      );

      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' },
        }
      );
    }, sectionRef);

    return () => context.revert();
  }, [isLoading, orderedPosts.length]);

  return (
    <section ref={sectionRef} className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="news-heading mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.22em] text-sky-700">Actualidad</span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">Noticias</h1>
          </div>
          <Link to="/posts" className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800">
            Ver todas
            <FaArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {isLoading && (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-600">Cargando noticias...</div>
        )}

        {!isLoading && !featuredPost && (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-600">No hay noticias disponibles por el momento.</div>
        )}

        {!isLoading && featuredPost && (
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <Link
              ref={(element) => { cardsRef.current[0] = element; }}
              to={`/posts/${featuredPost.id}`}
              className="group grid overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 shadow-xl shadow-slate-950/10 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-950/15 md:grid-cols-[0.92fr_1.08fr]"
            >
              <div className="relative min-h-[280px] overflow-hidden md:min-h-[430px]">
                {imageUrl(featuredPost) ? (
                  <img src={imageUrl(featuredPost)} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" alt={featuredPost.attributes?.Titulo || 'Noticia destacada'} />
                ) : (
                  <div className="h-full w-full bg-slate-800" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 to-transparent" />
              </div>
              <div className="flex flex-col justify-between p-7 text-white md:p-10">
                <div>
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-sky-100 ring-1 ring-white/15">
                    <FaRegCalendarAlt className="h-4 w-4" />
                    {formatDate(featuredPost.attributes?.publishedAt)}
                  </div>
                  <h2 className="text-2xl font-bold leading-tight md:text-4xl">{featuredPost.attributes?.Titulo}</h2>
                  <p className="mt-5 line-clamp-4 text-base leading-7 text-slate-200">{featuredPost.attributes?.descripcionCorta}</p>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-sky-200">
                  Leer noticia
                  <FaArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {secondaryPosts.map((post, index) => (
                <Link
                  ref={(element) => { cardsRef.current[index + 1] = element; }}
                  key={post.id}
                  to={`/posts/${post.id}`}
                  className="group grid grid-cols-[112px_1fr] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-slate-950/10 sm:grid-cols-1 lg:grid-cols-[150px_1fr]"
                >
                  <div className="relative min-h-[128px] overflow-hidden bg-slate-100 sm:min-h-[180px] lg:min-h-full">
                    {imageUrl(post) ? (
                      <img src={imageUrl(post)} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" alt={post.attributes?.Titulo || 'Noticia'} />
                    ) : null}
                  </div>
                  <div className="flex min-w-0 flex-col justify-between p-5">
                    <div>
                      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">
                        <FaRegCalendarAlt className="h-3 w-3" />
                        {formatDate(post.attributes?.publishedAt)}
                      </span>
                      <h3 className="mt-3 line-clamp-3 text-base font-bold leading-snug text-slate-950">{post.attributes?.Titulo}</h3>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition group-hover:text-sky-700">
                      Leer mas
                      <FaArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Prueba;
