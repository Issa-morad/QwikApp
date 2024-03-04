import { component$, createContextId, Slot, useStore } from "@builder.io/qwik";
import { type RequestHandler } from "@builder.io/qwik-city";
import Text from "./text";
import Video from "./video";
import Image from "./image";



export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const MyContext = createContextId('qwik-hundregister')

export default component$(() => {
  const state = useStore({
    hundregister: [],
    openModal: false,
    openVideo: false,
    openImage: false
  })


  return (
    <>
      {state.openModal && <Text/>}
      {state.openVideo && <Video/>}
      {state.openImage && <Image/>}
      <header>
      </header>
      <main class="flex-1 flex flex-col max-w-[1200px] mx-auto w-full items-center
        text-2xl gap-2">
        <Slot />
      </main>
      <footer></footer>
    </>
  );
});
