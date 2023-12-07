import { prisma } from '@/scripts';
import { UpdateTestimonialForm } from '@/app/components/testimonial-form';

export default async function Testimonial({params}: {params: {id: string}}) {
    const id = parseInt(params.id);

    const testimonial = await prisma.testimonials.findUnique({
        where: {
            tid: id
        }
    })


    return <UpdateTestimonialForm testimonial={testimonial} />

}