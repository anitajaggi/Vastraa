import { FeedbackSection } from "../Ui/Feedback";
import { HeroSection } from "../Ui/HeroSection";
import { Newsletter } from "../Ui/NewsLetter";
import { Products } from "./Product/Products";

export const Home = () => {
  return (
    <main className="max-w-7xl m-auto px-4">
      <HeroSection />
      <Products />
      <FeedbackSection />
      <Newsletter />
    </main>
  );
};
