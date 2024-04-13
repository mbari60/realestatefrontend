import React from "react";
import { Link } from "react-router-dom"; 
import {
  Box,
  Heading,
  Text,
  Image,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react";

const ServiceCard = ({ title, description, imageUrl, link }) => {
  return (
    <Box
      as={Link}
      to={link}
      boxShadow="lg"
      rounded="lg"
      p={4}
      width={{ base: "90%", sm: "45%", md: "30%", lg: "20%" }}
      backgroundColor="white"
      _hover={{ backgroundColor: "#e6f2ff" }}
      textAlign="center"
    >
      <Image
        src={imageUrl}
        alt={title}
        objectFit="cover"
        borderRadius="lg"
        mb={2}
        mx="auto"
        maxW="80%"
        h="60%"
      />
      <Heading as="h4" size="md" mb={2}>
        {title}
      </Heading>
      <Text mb={4}>{description}</Text>
      <Button as={Link} to={link} colorScheme="blue" size="sm">
        Learn More
      </Button>
    </Box>
  );
};

const Services = () => {
  const services = [
    {
      title: "Inquiry",
      description:
        "Have questions or need assistance? Our dedicated team is here to provide you with prompt and helpful support. Whether you have inquiries about our services, need guidance on choosing the right option for your needs, or require assistance with any other matter, we are committed to delivering excellent customer service. Get in touch with us today and let us help you!",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1678048604398-f42dda6997bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5xdWlyeXxlbnwwfHwwfHx8MA%3D%3D",
      link: "inquiry",
    },
    {
      title: "Transport",
      description:
        "Experience safe, reliable, and honest transportation solutions tailored to your needs. Our dedicated team ensures punctuality and prioritizes your safety. Count on us to deliver seamless services that exceed your expectations.",
      imageUrl:
        "https://media.istockphoto.com/id/1445074332/photo/bright-colorful-big-rigs-semi-trucks-with-semi-trailers-standing-in-the-row-on-truck-stop.webp?b=1&s=170667a&w=0&k=20&c=YRij6w95g5PeLnuWoILlzryqdUb_QOJpAVcHp3ABzI4=",
      link: "transport",
    },
    {
      title: "Cleaners",
      description:
        "Trust our professional cleaners to provide thorough and efficient cleaning services, leaving your space spotless and sanitized. We take pride in our attention to detail and use environmentally friendly products to ensure a healthy environment for you and your loved ones. Experience the difference with our reliable and dedicated team.",
      imageUrl:
        "https://media.istockphoto.com/id/1417833187/photo/professional-cleaner-vacuuming-a-carpet.webp?b=1&s=170667a&w=0&k=20&c=rU_NFLkSJlSTbjD8Tpby3m64fysXYaf3HTTDPzzgFgU=",
      link: "cleaners",
    },
    {
      title: "Maintenance",
      description:
        "'Leave your maintenance worries to us! From plumbing and electrical issues to leakages and general repairs, our skilled technicians are here to handle it all. With a focus on efficiency and quality, we ensure that your property is well-maintained and in top condition. Trust us to address any maintenance concerns promptly and professionally, providing you with peace of mind.",
      imageUrl:
        "https://media.istockphoto.com/id/1469656864/photo/electrician-engineer-uses-a-multimeter-to-test-the-electrical-installation-and-power-line.webp?b=1&s=170667a&w=0&k=20&c=UeR2fvnamUzg-LdRNN3QcFQGDEri6CFZPgqp0egja3M=",
      link: "maintenance",
    },
  ];

  return (
    <VStack spacing={8} alignItems="center">
      <Heading as="h2" size="lg" textAlign="center">
        Our Services
      </Heading>
      <HStack spacing={8} justifyContent="center" flexWrap="wrap">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </HStack>
    </VStack>
  );
};

export default Services;
