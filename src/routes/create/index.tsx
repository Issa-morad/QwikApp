/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable qwik/valid-lexical-scope */
import { component$, useSignal, useStore } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";


export default component$(() => {
    const state = useStore({
        hundregister: ''
    })
    const author = useSignal('')
    
  return (
    <div class="fixed top-0 left-0 w-screen h-screen bg-slate-900 p-4 flex flex-col gap-2">
        <Link href="/text">
            <i onClick$={() =>('/text')} class="fa-solid fa-backward cursor-pointer fixed top-0 left-0"></i>
        </Link>
        <p class="text-2xl font-semibold text-center py-3"></p>
        <p>Create New Post</p>
        <form action="/text">
        <p>
        <input placeholder="Enter en hund"  onInput$={() =>{
            state.hundregister = ""
        }} class="bg-sky-100 text-slate-900 ps-4 py-10 w-5/6 rounded mx-11"/>
        </p>
        <p class="py-2">
        <input  placeholder="Author" onInput$={() =>{
            author.value = ""
        }} 
            class="bg-sky-200 text-slate-900 ps-4 py-10 w-5/6  rounded mx-11"/>
        </p>
        <button class="ps-4 py-2 rounded mx-11">✔</button>
       </form>
    </div>
  );
});


