import React from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  VStack,
  Center,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const AboutUs = () => {
  const testimonials = [
    {
      id: 1,
      name: "Vincent George",
      rating: 5,
      comment: "PropertyHub helped me find my dream home. Excellent service!",
      imageUrl:
        "https://media.istockphoto.com/id/1445597021/photo/black-man-phone-and-social-media-in-city-reading-text-message-or-communication-on-social.webp?b=1&s=170667a&w=0&k=20&c=-q2G1j_5fzPTNJWahLG2WMJW4PzXGK_cefA1zlEnGI8=",
    },
    {
      id: 2,
      name: "Jane wambui",
      rating: 4,
      comment: "Great experience working with PropertyHub. Highly recommended!",
      imageUrl:
        "https://media.istockphoto.com/id/1644128335/photo/cheerful-young-business-professional-using-smart-phone.webp?b=1&s=170667a&w=0&k=20&c=yZA0UT-QlWI_m-EtqyxxHdsHvYhtoucYV0_PbIN63z0=",
    },
    {
      id: 3,
      name: "Mike kioko",
      rating: 5,
      comment:
        "Professional team and smooth transaction. Thank you, PropertyHub!",
      imageUrl:
        "https://media.istockphoto.com/id/1653368125/photo/candid-portrait-of-african-professional-using-laptop.webp?b=1&s=170667a&w=0&k=20&c=JrTVPgpwHI59pPki6kLv-cKfDroWQ1D4G0is7GwoF3g=",
    },
    {
      id: 4,
      name: "Emily odhiambo",
      rating: 4.5,
      comment: "Impressed with the quality of service provided by PropertyHub.",
      imageUrl:
        "https://images.unsplash.com/photo-1530785602389-07594beb8b73?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2VueWFuJTIwd29tYW58ZW58MHx8MHx8fDA%3D%3D",
    },
  ];

  return (
    <Box p={6}>
      <Heading as="h1" size="2xl" textAlign="center" mb={8}>
        About PropertyHub
      </Heading>
      <Flex flexWrap="wrap" alignItems="center" mb={12}>
        <Box flex="1 1 300px" mr={{ base: 0, md: 6 }}>
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb3BlcnR5JTIwaHViJTIwbG9nb3xlbnwwfHwwfHx8MA%3D%3D"
            alt="PropertyHub Logo"
            w="100%"
            h="auto"
            borderRadius="md"
          />
        </Box>
        <VStack flex="1 1 400px" alignItems="flex-start">
          <Text fontSize="xl" textAlign="center" mb={6}>
            PropertyHub is a leading real estate platform dedicated to helping
            individuals and families find their dream homes. We understand the
            importance of finding the perfect place to call home, and we are
            committed to making that process as smooth and enjoyable as
            possible.
          </Text>
          <Text fontSize="xl" textAlign="center" mb={6}>
            Our mission is to simplify the process of buying, selling, and
            renting properties by providing innovative technology solutions and
            exceptional customer service. We believe that everyone deserves to
            find their ideal living space, and we are here to help make that
            dream a reality.
          </Text>
        </VStack>
      </Flex>
      <Heading as="h2" size="xl" textAlign="center" mb={6}>
        Testimonials
      </Heading>
      <Slide duration={3000} transitionDuration={500} arrows={false}>
        {testimonials.map((testimonial) => (
          <Box key={testimonial.id}>
            <Center mb={8}>
              <Box
                bg="white"
                p={6}
                borderRadius="md"
                boxShadow="md"
                maxW="xl"
                w="100%"
              >
                <Flex alignItems="center" mb={4}>
                  <Image
                    src={testimonial.imageUrl}
                    alt={testimonial.name}
                    boxSize="80px"
                    borderRadius="full"
                    mr={4}
                  />
                  <VStack alignItems="flex-start">
                    <Heading as="h3" size="md">
                      {testimonial.name}
                    </Heading>
                    <Flex alignItems="center">
                      {[...Array(Math.round(testimonial.rating))].map(
                        (_, i) => (
                          <FaStar key={i} color="yellow" />
                        )
                      )}
                    </Flex>
                  </VStack>
                </Flex>
                <Text>{testimonial.comment}</Text>
              </Box>
            </Center>
          </Box>
        ))}
      </Slide>
      <Heading as="h2" size="xl" textAlign="center" mb={6}>
        Our Services
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
        <ServiceCard
          title="Amenities"
          description="Browse apartments with various amenities like pool, gym, parking, and more"
        />
        <ServiceCard
          title="Property Management"
          description="Let us handle the management of your properties efficiently and professionally"
        />
        <ServiceCard
          title="Rental Assistance"
          description="Need help finding a rental property? We've got you covered!"
        />
        <ServiceCard
          title="Home Staging"
          description="Prepare your home for sale with our expert home staging services"
        />
        <ServiceCard
          title="Maintenance"
          description="We provide maintenance services for our clients to ensure their properties are well-maintained"
        />
        <ServiceCard
          title="Transport Services"
          description="Transportation services are available for clients who need assistance in moving or visiting properties"
        />
        <ServiceCard
          title="Cleaning Services"
          description="We offer cleaning services for properties listed on our platform to maintain cleanliness and hygiene"
        />
        <ServiceCard
          title="Property Visits"
          description="Schedule property visits with us to explore available options and make informed decisions"
        />
      </SimpleGrid>
    </Box>
  );
};

const ServiceCard = ({ title, description }) => {
  return (
    <Box p={6} bg="gray.100" borderRadius="md" boxShadow="md">
      <Heading as="h3" size="lg" mb={4} textAlign="center">
        {title}
      </Heading>
      <Text textAlign="center">{description}</Text>
    </Box>
  );
};

export default AboutUs;
