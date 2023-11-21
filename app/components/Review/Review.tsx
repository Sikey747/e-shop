import { Avatar, Divider, Rating } from "@mui/material";
import { Reviews } from "./../../../interfaces/index";
import { green } from "@mui/material/colors";
import moment from "moment";

interface ReviewProps {
  review: Reviews[];
}
export default function Review({ review }: ReviewProps) {
  return (
    <>
      {review &&
        review.map((el) => (
          <article className="flex flex-col gap-2" key={el.id}>
            <div className="flex gap-2 items-center">
              <Avatar
                alt={el.user.name}
                sx={{ bgcolor: green }}
                src={el.user.image && el.user.image}
              />
              <h4 className="font-semibold 2xl">{el.user.name}</h4>
              <p className="">{moment(el.createdDate).fromNow()}</p>
            </div>
            <Rating value={el.rating} readOnly />
            <p>{el.comment}</p>
            <Divider/>
          </article>
        ))}
    </>
  );
}
