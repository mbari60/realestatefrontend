import React from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import {
  IoHandRightOutline,
  IoPeopleOutline,
  IoConstructOutline,
} from "react-icons/io5";
import { FaTools } from "react-icons/fa";

// for sliders 
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


const Home = () => {
  return (
    <Box>
      <Text
        fontSize={{ base: "2lg", md: "4xl" }}
        justify="center"
        align="center"
      >
        Welcome to PropertyHub Kenya where quality is served with integrity and
        honesty
      </Text>
      <br />
      <Box>
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
        >
          <div>
            <img
              src="https://media.istockphoto.com/id/1293762741/photo/modern-living-room-interior-3d-render.webp?b=1&s=170667a&w=0&k=20&c=Ko289acalSrEKwYI5sb20u2WQa7KS9L-_0Ug4u2iEmc="
              alt="Slide 1"
            />
            <p className="legend">fully furnished Airbnbs are available here</p>
          </div>
          <div>
            <img
              src="https://media.istockphoto.com/id/1492424940/photo/apartment-buidling.webp?b=1&s=170667a&w=0&k=20&c=wAocVH5igy6ZAbfqeMqoiYkvwwQQ6o0I6rGAo8acKy0="
              alt="Slide 2"
            />
            <p className="legend">You can get your dream appartment here</p>
          </div>
          <div>
            <img
              src="https://media.istockphoto.com/id/1460955842/photo/country-road-and-wheat-fields-at-sunrise.webp?b=1&s=170667a&w=0&k=20&c=xBSZ63u86gvHxXmEOMBI9T2d88JISlnTNwHUJUSwzOM="
              alt="Slide 3"
            />
            <p className="legend">
              We also have lands for sale here both commercial and residentials
            </p>
          </div>
        </Carousel>
      </Box>
      <Flex
        justify="center"
        align="center"
        flexDirection={{ base: "column", md: "row" }}
        my="10"
      >
        <Box flex="1" textAlign="center">
          <Heading fontSize={{ base: "2xl", md: "4xl" }} mb="4">
            Our Mission
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }}>
            To provide a seamless and comprehensive platform for individuals
            seeking apartments, land, or lodging, empowering them to find their
            ideal property quickly and efficiently. We aim to simplify the
            property search process by offering a user-friendly interface,
            reliable information, and a wide range of options to suit diverse
            needs and preferences. Our mission is to facilitate connections
            between property seekers and providers, ultimately helping people
            find their perfect home or investment opportunity with ease.
          </Text>
          <Text fontSize={{ base: "lg", md: "xl" }}>
            Here we are aimed at offering the best services to our clients
          </Text>
        </Box>
        <Box flex="1" textAlign="center" mt={{ base: "6", md: "0" }}>
          <Image
            src="https://media.istockphoto.com/id/1497684257/photo/real-estate-agent-explain-house-plans-to-view-house-plans-and-sales-contracts-house-purchase.webp?b=1&s=170667a&w=0&k=20&c=LscHiw5VfZkWI34NSezS4qGJa6ij-ZfLfNlA6T9mYDw="
            alt="Hero Image"
            maxW={{ base: "300px", md: "500px" }}
            mx="auto"
          />
        </Box>
      </Flex>
      <br />
      <br />

      {/* Features Section */}
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4 }}
        gap="6"
        mx="auto"
        maxW="1200px"
      >
        <Card>
          <CardHeader textAlign="center">
            <FaTools size="4em" />
            <Heading size="md" mt="2">
              Amenities
            </Heading>
          </CardHeader>
          <CardBody>
            <Text textAlign="center">
              Browse apartments with various amenities like pool, gym, parking,
              and more
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader textAlign="center">
            <IoConstructOutline size="4em" />
            <Heading size="md" mt="2">
              Services
            </Heading>
          </CardHeader>
          <CardBody>
            <Text textAlign="center">
              We are responsible for repair services for our customers and we
              have available cleaners for hire
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader textAlign="center">
            <IoHandRightOutline size="4em" />
            <Heading size="md" mt="2">
              Guidance
            </Heading>
          </CardHeader>
          <CardBody>
            <Text textAlign="center">
              Navigate to get started , you can book an appartment and an Airbnb
              you can also navigate to services and get Transpor services and
              cleaning services we also take part in selling lands
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader textAlign="center">
            <IoPeopleOutline size="4em" />
            <Heading size="md" mt="2">
              Community
            </Heading>
          </CardHeader>
          <CardBody>
            <Text textAlign="center">
              Connect with other apartment seekers, land seekers and Airbnbs
              seekers and share tips and advices
            </Text>
          </CardBody>
        </Card>
      </SimpleGrid>
      <br />
      <br />
      <Flex
        justify="center"
        align="center"
        flexDirection={{ base: "column", md: "row" }}
        my="10"
      >
        <Box flex="1" textAlign="center">
          <Image
            src="https://media.istockphoto.com/id/1061234002/photo/buy-house-real-estate-concept-different-offers-of-property-online.webp?b=1&s=170667a&w=0&k=20&c=I-3nd3sGcxhvTl_3vw4FiOeL6NecqR42U52cxWq5jRw="
            alt="Additional Info Image"
            maxW={{ base: "300px", md: "500px" }}
            mx="auto"
          />
        </Box>
        <Box flex="1" textAlign="center" mt={{ base: "6", md: "0" }}>
          <Heading fontSize={{ base: "2xl", md: "4xl" }} mb="4">
            How can PropertyHub help me?
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }}>
            Explore a wide range of apartments, land, and lodging options
            effortlessly. Our user-friendly platform provides detailed listings,
            seamless communication with property providers, and personalized
            recommendations. Stay informed with updates and expert guidance.
            Start your property search journey today with PropertyHub.
          </Text>
        </Box>
      </Flex>
      <br />
      <br />
      <Flex
        justify="center"
        align="center"
        flexDirection={{ base: "column", md: "row" }}
        my="10"
      >
        <Box
          flex="1"
          textAlign="center"
          mx={{ base: "0", md: "2" }}
          mb={{ base: "4", md: "0" }}
        >
          <Heading fontSize={{ base: "2xl", md: "4xl" }} mt="4" mb="2">
            How Can I learn More?
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }}>
            Reach out to us through our contact form for more information.
          </Text>
        </Box>
        <Box
          flex="1"
          textAlign="center"
          mx={{ base: "0", md: "2" }}
          mb={{ base: "4", md: "0" }}
        >
          <Heading fontSize={{ base: "2xl", md: "4xl" }} mt="4" mb="2">
            Who Can Join?
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }}>
            Anyone searching for an apartment can join our community.
          </Text>
        </Box>
        <Box
          flex="1"
          textAlign="center"
          mx={{ base: "0", md: "2" }}
          mb={{ base: "4", md: "0" }}
        >
          <Heading fontSize={{ base: "2xl", md: "4xl" }} mt="4" mb="2">
            Try The App
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }}>
           Login and get quality apartments and Airbnbs
           </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
