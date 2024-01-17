import { FaMoneyBill, FaQuestion, FaUserTie } from "react-icons/fa";
const content = {
  headling: {
    title: "Where Createtivity Meets Structure",
    subTitle: "How it works",
    description:
      "lorem ipsum dolor sit amet, consectetur lorem ipsum dolor lorem ipsum dolor lorem ipsum dolordasds asdasdaa asdasdk",
  },
  steps: [
    {
      number: "01",
      img: "/images/recoment1.jpg",
      icon: FaUserTie,
      titile: "Projext Initial",
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
      titile: "Conceptual Design",
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
      titile: "Construction Document",
      description: "Lorem ipsum dolor sit amet, consectetur",
      btn: {
        href: "/faq",
        label: "Click Here",
      },
    },
  ],
};

export default content;
