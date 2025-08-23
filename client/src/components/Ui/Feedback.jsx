import { ReviewForm } from "./ReviewForm";
import { ShowReview } from "./ShowReview";

export const FeedbackSection = () => (
  <section className="py-10">
    <div className="grid md:grid-cols-2 gap-10">
      <ReviewForm />
      <ShowReview />
    </div>
  </section>
);
