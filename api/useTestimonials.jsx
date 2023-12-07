import useSWR from "swr"
import {prisma} from '../scripts.ts'

const fetcher = (...args) => fetch(...args).then(res => res.json())

  export async function getTestimonials () {

    const dataset = await prisma.testimonials.findMany()

    return dataset
  }