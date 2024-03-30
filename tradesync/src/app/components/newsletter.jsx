import React from 'react'

const Emailsus = () => {
  return (
    <>
  <div class="mx-auto mt-32 border-1 border-solid max-w-7xl px-6 sm:mt-56 lg:px-8">
    <div
        class="relative isolate overflow-hidden  px-6 py-24 shadow-2xl rounded-2xl sm:rounded-3xl sm:px-24 xl:py-32">
       
        <h2 class="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-[#af35ab] sm:text-4xl">Keep Updated
        </h2>

        <p class="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-solid">
        Stay updated with our weekly financial newsletter
        </p>

        <form class="mx-auto mt-10 flex max-w-md gap-x-4">

            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required="" class=" border-2 border-black min-w-0 flex-auto rounded-md border-1 bg-white/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6" placeholder="Enter your email"/>

            <button type="submit" class="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white  border-2 border-black">Notify me</button>
        </form>

        <svg viewBox="0 0 1024 1024" class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
            aria-hidden="true">
            <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fill-opacity="0.7">
            </circle>
            <defs>
                {/* <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641" cx="0" cy="0" r="1"
                    gradientUnits="userSpaceOnUse" gradientTransform="translate(512 512) rotate(90) scale(512)">
                    <stop stop-color="#7775D6"></stop>
                    <stop offset="1" stop-color="#7ED321" stop-opacity="0"></stop>
                </radialGradient> */}
            </defs>
        </svg>

    </div>
</div>
       
    </>
  )
}

export default Emailsus