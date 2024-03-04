/* eslint-disable qwik/no-use-visible-task */
/* eslint-disable qwik/valid-lexical-scope */
import { Resource, component$, useResource$} from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { Image } from '@unpic/qwik';


type dataType = {message: string, status: string }

export default component$(() => {

  //{"message":"https:\/\/images.dog.ceo\/breeds\/terrier-norfolk\/n02094114_1696.jpg","status":"success"}
  const products = useResource$ <dataType>( async () => {
    const response = await fetch (`https://dog.ceo/api/breeds/image/random`
    );
    const data = await response.json();
    return data
  })
  return (
    <>
      <header>
        <Link href="/image">
          <i onClick$={() =>('/image')} class="fa-regular fa-image cursor-pointer"></i>
        </Link>
        <Link href="/video">
          <i onClick$={() =>('/video')} class="fa-solid fa-video cursor-pointer ps-3"></i>
        </Link>
        <Link href="/text">
          <i onClick$={() =>('/text')} class="fa-solid fa-plus cursor-pointer ps-3"></i>
        </Link>
      </header>
          <p>Welcome to Hundregister!</p>
          <p >This is Hundregister app that you kan hitta alla information om hundar</p>
          <p class="py-3"></p>
          <Resource 
            value={products}
            onPending={() => "loding"}
            onResolved={(data) => <Image
                src= {data.message}
                layout="constrained"
                width={400}
                height={300}
                alt="A lovely hund"
              /> }
            onRejected={() => "error"}
          />
          <p class=" py-2"></p>
          <p class="text-2xl font-semibold text-center"
          >Hundregister/Jordbruksverket ❤</p>
    </>
  );
});

export const head: DocumentHead = {
  title: "Hundregister/Jordbruksverket",
  meta: [
    {
      name: "description",
      content: "This is Hundregister app that you kan hitta alla information om hundar",
    },
  ],
};
