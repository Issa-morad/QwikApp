import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Image } from '@unpic/qwik';


/*{"id":"102","author":"Ben Moore","width":4320,"height":3240,
"url":"https://unsplash.com/photos/pJILiyPdrXI",
"download_url":"https://picsum.photos/id/102/4320/3240"}*/
type dataType = {id: string, author: string, url: string, download_url: string } []

export default component$(() => {

    const products = useResource$ <dataType>( async () => {
        const response = await fetch (`https://picsum.photos/v2/list?page=2&limit=90`
        );
        const data = await response.json();
        return data
      })

    return(
      <>
         <Link href="/..">
         <i onClick$={() =>('/..')} class="fa-solid fa-backward cursor-pointer fixed top-0 left-0"></i>
         </Link>
         <p class= "py-3"></p>
         <Resource 
            value={products}
            onPending={() => "loding"}
            onResolved={(data) => data.map((el, al) => {
        return(
            <div key={al}>
                <Image
                    src= {el.download_url}
                    layout="constrained"
                    width={1000}
                    hspace= {90}
                    height={400}
                    alt="A lovely"
                />
                <p> </p>
            </div>
        ) }
            )}
          />
      </>
    )
    
})