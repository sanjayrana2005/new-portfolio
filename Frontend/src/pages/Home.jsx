import React from 'react'
import Hero from './Sub components/Hero'
import Timeline from './Sub components/Timeline'
import About from './Sub components/About'
import Skills from './Sub components/Skills'
import Portfolio from './Sub components/Portfolio'
import Myapps from './Sub components/Myapps'
import Contact from './Sub components/Contact'

const Home = () => {
    return (
        <article className='px-5 mt-10 sm:mt-14 md:mt-16 lg:mt-24 xl:mt-32 sm:mx-auto w-full max-w-[1050px] flex flex-col gap-14'>
            <Hero />
            <Timeline />
            <About />
            <Skills />
            <Portfolio />
            <Myapps />
            <Contact />
        </article>
    )
}

export default Home
