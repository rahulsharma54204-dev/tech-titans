import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading,
  HStack,
  Image,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FILL_PARENT, FIXED } from '../../constants/constants';
import { useLocation } from 'react-router-dom';
import {Link} from "react-router-dom"



export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let location = useLocation()

  if (location.pathname === '/play') {
    return null;
  }
  return (
    <>
      <Box bg={"yellow.500"} zIndex={1000} position={FIXED} top={0} w={FILL_PARENT} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Link to="/" > <HStack>
            <Image padding={2} src={"https://cdn.pixabay.com/photo/2020/04/02/19/19/mango-4996445_960_720.png"} width={"100px"}></Image>
            <Heading><span style={{ color: "yellow" }}>Mango</span>Shooter</Heading>
          </HStack>
          </Link>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>


            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}