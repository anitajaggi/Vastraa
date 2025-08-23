import { useState } from "react";

const faqsData = [
  {
    question: "What is Vastraa's return policy?",
    answer:
      "We offer hassle-free returns within 7 days of delivery. Items must be unused and in original packaging.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Orders are usually delivered within 2-5 business days. Remote areas may take longer.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Currently, we only ship across India. We're working on global shipping — stay tuned!",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once shipped, you’ll receive a tracking link via email and SMS to monitor your delivery.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept UPI, credit/debit cards, net banking, and cash on delivery (COD) in select locations.",
  },
];

export const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-12 px-4 md:px-20 text-gray-800">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqsData.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-sm"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between cursor-pointer items-center p-5 text-left"
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <span className="text-2xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
