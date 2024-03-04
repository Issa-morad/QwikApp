/* eslint-disable qwik/no-use-visible-task */
/* eslint-disable qwik/valid-lexical-scope */
import {Resource, component$, useResource$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Image } from '@unpic/qwik';

type dataType = {id: number, title: string, body: string } 


export default component$(() => {
  const products = useResource$ <dataType>( async () => {
    const response = await fetch (`https://jsonplaceholder.typicode.com/posts/1`
    );
    const data = await response.json();
    return data
    
  })

  
  return (
    <>
      <header>
        <Link href="/text">
          <i onClick$={() =>('/text')} class="fa-solid fa-backward cursor-pointer fixed top-0 left-0"></i>
        </Link>
      </header>
      <Resource 
       value={products}
       onPending={() => "loding"}
       onResolved={(data) => {
   return(
   
       <><div>
       <strong>ID:</strong>
       <p>{data.id}</p>
     </div><div>
         <strong>Title:</strong>
         <p>{data.title}</p>
       </div><div>
         <strong>Body:</strong>
         <p>{data.body}</p>
       </div></>
          ) }
          }
        />
          <Image
            src= "https://media.gettyimages.com/id/586264071/sv/foto/toy-poodle-with-red-heart.jpg?s=612x612&w=0&k=20&c=av5oLz_CohfFnZLaNMKGDwkt0ZIUKeViXh0ZcyH1Xe4="
            layout="constrained"
            width={700}
            height={470}
            alt="A lovely hund"
          />
    </>
  );
});

