import {Product} from './../../../interfaces/index';
import Review from './../../components/Review/Review';

interface ProdReviewProps{
    data: Product
    className?:string
}

export default function ProdReview({data,className}:ProdReviewProps){
    return(
        <section className='flex flex-col gap-4 max-w-[18.75rem]'>
            <h2 className='text-2xl font-semibold capitalize'>Product Reviews</h2>
          <Review review={data.reviews}/>
        </section>
    )
}