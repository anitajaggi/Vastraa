import { FeedbackSection } from "../components/Ui/Feedback";
import { HeroSection } from "../components/Ui/HeroSection";
import { Newsletter } from "../components/Ui/NewsLetter";
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
