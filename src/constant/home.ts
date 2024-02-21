import { FaMoneyBill, FaQuestion, FaUserTie } from "react-icons/fa";
const content = {
  headling: {
    title: "Come with us",
    subTitle: "How it works",
    description:
    "Curious about the functionality of our website? Wondering what it can do for you? Join us as we explore and discover its features together!",
  },
  steps: [
    {
      number: "01",
      img: "/images/recoment1.jpg",
      icon: FaUserTie,
      titile: "About us",
      description: "Lorem ipsum dolor sit amet, consectetur",
      btn: {
        href: "/about-us",
        label: "Click Here",
      },
    },
    {
      number: "02",
      img: "/images/recoment2.jpg",
      icon: FaMoneyBill,
      titile: "Register to Seller",
      description: "Lorem ipsum dolor sit amet, consectetur",
      btn: {
        href: "/seller",
        label: "Click Here",
      },
    },
    {
      number: "03",
      img: "/images/recoment3.jpg",
      icon: FaQuestion,
      titile: " Frequently asked questions",
      description: "Lorem ipsum dolor sit amet, consectetur",
      btn: {
        href: "/faq",
        label: "Click Here",
      },
    },
  ],
};

export default content;
