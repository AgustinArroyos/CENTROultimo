import React, { useEffect, useState } from 'react'
import styles from './styles/Prueba.module.css'; 
import { Link } from 'react-router-dom';


const Prueba = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
      // Función para obtener la lista de posts
      const fetchPosts = async () => {
        try {
          const response = await fetch('https://centroformacion.hopto.org/api/posts?populate=*');
          const data = await response.json();
          setPosts(data.data); // Asignamos el array de posts correctamente
        } catch (error) {
          console.error('Error al obtener los posts:', error);
        }
      };
  
      fetchPosts();
    }, []);
  
  
    const urlImagen = (url) => {
      
      return 'https://centroformacion.hopto.org' + url.Portada.data.attributes.url;

    };
  

    const urlImagen2 = (url) => {
     

      return'https://centroformacion.hopto.org' + url.Portada.data.attributes.url;

    };
    const lastPost = posts[posts.length - 1]; // La última noticia
    const otherPosts = posts.slice(Math.max(0, posts.length - 5), posts.length - 1);
// const publishedAt1 = lastPost.attributes.publishedAt;
// const date1 = new Date(publishedAt1);
// const year1 = date1.getFullYear();
// const month1 = date1.toLocaleString('default', { month: 'short' });
// const day1 = date1.getDate();
// const datetime1 = date1.toISOString().split('T')[0];
// console.log(post)








  return (
    <div className={`mt-5 lg:mt-12 px-5`}>
        <h1 className='text-3xl lg:text-5xl  ml-6 lg:px-28'>Noticias</h1>

            {/* Mostrar última noticia */}
        {lastPost && (
           <Link to={`/posts/${lastPost.id}`} >
                      <div className='lg:flex lg:px-28 justify-around'>

            <div className='flex flex-col justify-center gap-4 lg:gap-10 p-6'>
            <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                    <svg height="20px" width="20px" version="1.1" id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"  x="0px"
                        y="0px" viewBox="0 0 512 512" 
                        >
                        <g>
                            <g>
                                <path
                                    d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z">
                                </path>
                            </g>
                        </g>
                    </svg>
                    <span className="ml-2 mb-1 text-slate-500"> <p className=' text-lg'>{new Date(lastPost.attributes.publishedAt).toLocaleString('default', { month: 'short' })} {new Date(lastPost.attributes.publishedAt).getDate()} </p>
                    </span>
                </span>
              <h1 className='font-semibold text-xl lg:text-4xl'>{lastPost.attributes.Titulo}</h1>
              <p className='text-slate-600'>{lastPost.attributes.descripcionCorta}</p>
            </div>
            <img src={urlImagen(lastPost.attributes)} className='ml-8 w-[85%]  lg:w-[40%] rounded-3xl shadow-3xl' alt={lastPost.attributes.title} />
          </div>
          </Link>

        )}


        

         {/* Mostrar otras 4 noticias */}
        <div className='lg:flex flex-col justify-center lg:p-28 lg:-mt-24 mt-6 mb-3'>
        
        <div className='bg-gray-100 rounded-xl p-6'>
        <div>
        <h2 className='text-xl lg:text-3xl lg:mb-4 lg:ml-4 lg:mt-3 text-gray-700 font-medium '>Últimas Noticias</h2>
        </div>


        <div className="flex flex-col lg:flex-row">

          {otherPosts.map((post, index) => {

const publishedAt = post.attributes.publishedAt;
const date = new Date(publishedAt);
const year = date.getFullYear();
const month = date.toLocaleString('default', { month: 'short' });
const day = date.getDate();
const datetime = date.toISOString().split('T')[0];
console.log(post)
// Obtener la URL de la imagen si está disponible


return (
            <div className='m-4 flex flex-col justify-between ' key={index}>
              <Link to={`/posts/${post.id}`} >
              <div>
              <img src={urlImagen2(post.attributes)}  className=' object-cover lg:w-[50vw] lg:h-[10vw] rounded-xl shadow-md' alt={post.attributes.title} />
              <p className=' ml-1 mt-3 lg:mt-3 text-md font-semibold  '>{post.attributes.Titulo}</p>
              </div>
              
              <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                    <svg height="13px" width="13px" version="1.1" id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"  x="0px"
                        y="0px" viewBox="0 0 512 512" 
                        >
                        <g>
                            <g>
                                <path
                                    d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z">
                                </path>
                            </g>
                        </g>
                    </svg>
                    <span className="ml-1 text-slate-500">{month} {day}</span>
                </span>
    
                </Link>
            </div>
            
          )})}
</div>
</div>
        </div>
    </div>
  )
}

export default Prueba