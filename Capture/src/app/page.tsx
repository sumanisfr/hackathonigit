import { onGetBlogPosts } from '@/actions/landing'
import NavBar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import AnimatedLogo from "@/components/animations/AnimatedLogo";
import ScrollingText from "@/components/animations/ScrollingText";
import FlippableTextAuto from "@/components/animations/FlippableTextAuto";
import CursorEffect from "@/components/animations/CursorEffect";
import AnimatedLeaf from "@/components/animations/AnimatedLeaf";
import LandingPage from "@/components/animations/LandingPage";
import RotatingText from "@/components/animations/RotatingText";
import TextAnimation from "@/components/animations/TextAnimation";
import { useRef } from 'react';
import VariableProximity from "@/components/animations/VariableProximity";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { pricingCards } from '@/constants/landing-page'
import clsx from 'clsx'
import { ArrowRightCircleIcon, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import parse from 'html-react-parser'
import { getMonthName } from '@/lib/utils'
import { ContainerScroll } from '@/components/animations/container-scroll'

export default async function Home() {
  const posts:
    | {
      id: string
      title: string
      image: string
      content: string
      createdAt: Date
    }[]
    | undefined = await onGetBlogPosts()
  console.log(posts)
  return (
    <main>

      <NavBar />
      <section>
        <div className="flex items-center justify-center flex-col mt-[80px] pt-4">
          <span className="text-[#009A6E] bg-[#B3EDA9]/40 px-4 py-2 rounded-full text-sm">
            An AI powered student assistant chatbot
          </span>
          <AnimatedLogo />
          <div>
            <CursorEffect />
            <h1 className="absolute top-20 left-20 text-4xl font-bold">

            </h1>
            {/* More content */}
          </div>
          <p className="text-center max-w-[500px] text-[#767F7D] dark:text-white pt-4">
            Your AI powered Student assistant! Embed Saturn AI into any website
            with just a snippet of code!
          </p>
          <div className='pt-4'>
            <Button className="bg-[#009A6E] hover:bg-[#EBFADB] font-bold text-white hover:text-[#293E33] px-4 mb-4">
              Start For Free
            </Button>
          </div>
          <div>
            <ScrollingText />
          </div>
      
 {/* Animated leaf component */}
         <LandingPage />
          <ContainerScroll>
            <Image
              src="/images/app-ui.png"
              alt="hero"
              height={720}
              width={1400}
              className="mx-auto rounded-2xl object-cover h-full object-left-top"
              draggable={false}
            />
          </ContainerScroll>
        </div>
      </section>
      <section className="flex justify-center items-center flex-col gap-4 mt-10">
        <FlippableTextAuto text="SATURN" />

        <h2 className="text-4xl text-center"> Choose what fits you right</h2>
        <p className="text-muted-foreground text-center max-w-lg">
          Our straightforward pricing plans are tailored to meet your needs. If
          you&apos;re not ready to commit you can get started for free.
        </p>
      </section>
      <div className="flex  justify-center gap-4 flex-wrap mt-6">
        {pricingCards.map((card) => (
          <Card
            key={card.title}
            className={clsx('w-[300px] flex flex-col justify-between', {
              'border-2 border-primary': card.title === 'Unlimited',
            })}
          >
            <CardHeader>
              <CardTitle className="text-orange">{card.title}</CardTitle>
              <CardDescription>
                {pricingCards.find((c) => c.title === card.title)?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-4xl font-bold">{card.price}</span>
              <span className="text-muted-foreground">
                <span>/ month</span>
              </span>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              <div>
                {card.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex gap-2"
                  >
                    <Check />
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
              <Link
                href={`/dashbord?plan=${card.title}`}
                className="bg-[#009A6E] border-green border-2 p-2 w-full text-center font-bold rounded-md text-white hover:bg-[#EBFADB] hover:text-[#293E33]"
              >
                Get Started
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <section className="flex justify-center items-center flex-col gap-4 mt-28">
        <h2 className="text-4xl text-center">News Room</h2>
        <p className="text-muted-foreground text-center max-w-lg">
          Explore our insights on AI, technology, and optimizing your business.
        </p>
      </section>
      <section className="md:grid-cols-3 grid-cols-1 grid gap-5 container mt-8">
        {posts &&
          posts.map((post) => (
            <Link
              href={`/blogs/${post.id}`}
              key={post.id}
            >
              <Card className="flex flex-col gap-2 rounded-xl overflow-hidden h-full hover:bg-gray-100">
                <div className="relative w-full aspect-video">
                  <Image
                    src={`${process.env.CLOUDWAYS_UPLOADS_URL}${post.image}`}
                    alt="post featured image"
                    fill
                  />
                </div>
                <div className="py-5 px-10 flex flex-col gap-5">
                  <CardDescription>
                    {getMonthName(post.createdAt.getMonth())}{' '}
                    {post.createdAt.getDate()} {post.createdAt.getFullYear()}
                  </CardDescription>
                  <CardTitle>{post.title}</CardTitle>
                  {parse(post.content.slice(4, 100))}...
                </div>
              </Card>
            </Link>
          ))}
      </section>
    </main>
  )
}