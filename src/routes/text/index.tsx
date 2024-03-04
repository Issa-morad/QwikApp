/* eslint-disable qwik/valid-lexical-scope */
import { Resource, component$, useResource$} from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

/*userId: 10,
    id: 100,
    title: 'at nam consequatur ea labore ea harum',
    body: 'cupiditate quo est a modi nesciunt soluta\n' +
      'ipsa voluptas error itaque dicta in\n' +
      'autem qui minus magnam et distinctio eum\n' +
      'accusamus ratione error aut'*/

type dataType = {id: number, title: string, body: string } []    

export default component$(() => {
    const products = useResource$ <dataType>( async () => {
        const response = await fetch (`https://jsonplaceholder.typicode.com/posts`
        );
        const data = await response.json();
        return data
      })
  return (
    <>
    <Link href="/..">
    <i onClick$={() =>('/..')} class="fa-solid fa-backward cursor-pointer fixed top-0 left-0"></i>
    </Link>
    <p class= "py-3"></p>
    <Link href="/create">
    <i onClick$={() =>('/create')} class="fa-solid fa-plus cursor-pointer fixed left-2"></i>
    </Link>
    <p class= "py-2"></p>
    <Resource 
       value={products}
       onPending={() => "loding"}
       onResolved={(data) => data.map((el, al) => {
   return(
       <div class="flex items-center gap-4 bg-sky-800 rounded p-2" key={al}>
        <table class="table table-striped">
            <thead>
                <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Body</th>
                <th width="250px">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>{el.id}</td>
                <td>{el.title}</td>
                <td>{el.body}</td>
                <td>
                <Link href="/view">
                <i class="ps-10" onClick$={() =>('/view')}>👀</i>
                </Link>
                <Link href="/edit">
                <i class="ps-8" onClick$={() =>('/edit')}>✒</i>
                </Link>
                   <i onClick$={() => {
                        }} class="fa-solid fa-trash cursor-pointer ps-7"></i>
                </td>
                </tr>  
            </tbody>
        </table>
       </div>
   ) }
       )}
     />
 </>
)

})

