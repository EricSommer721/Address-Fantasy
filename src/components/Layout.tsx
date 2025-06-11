import {
  Box,
  Flex,
  Link,
  Stack,
  Text,
  useColorModeValue,
  Icon,
  VStack,
  Divider,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { 
  FaHome, 
  FaIdCard, 
  FaBoxOpen, 
  FaUsers, 
  FaCalendarAlt 
} from 'react-icons/fa';

const navItems = [
  { name: '首页', path: '/', icon: FaHome },
  { name: '卡片管理', path: '/cards', icon: FaIdCard },
  { name: '卡包管理', path: '/card-packs', icon: FaBoxOpen },
  { name: '用户管理', path: '/users', icon: FaUsers },
  { name: '运营活动', path: '/events', icon: FaCalendarAlt },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const activeBgColor = useColorModeValue('blue.50', 'blue.900');
  const hoverBgColor = useColorModeValue('gray.50', 'gray.700');

  return (
    <Flex minH="100vh">
      {/* 侧边栏 */}
      <Box
        w="240px"
        bg={bgColor}
        borderRight="1px"
        borderColor={borderColor}
        position="fixed"
        h="100vh"
        py={4}
      >
        <Box px={4} mb={8}>
          <Text fontSize="xl" fontWeight="bold">
            Address Fantasy
          </Text>
        </Box>

        <VStack spacing={1} align="stretch" px={2}>
          {navItems.map((item) => {
            const isActive = router.pathname === item.path;
            return (
              <Link
                key={item.path}
                as={NextLink}
                href={item.path}
                _hover={{ textDecoration: 'none' }}
              >
                <Flex
                  align="center"
                  p={3}
                  mx={2}
                  borderRadius="md"
                  bg={isActive ? activeBgColor : 'transparent'}
                  color={isActive ? 'blue.500' : 'gray.500'}
                  _hover={{
                    bg: isActive ? activeBgColor : hoverBgColor,
                    color: isActive ? 'blue.500' : 'gray.700',
                  }}
                  transition="all 0.2s"
                >
                  <Icon as={item.icon} boxSize={5} mr={3} />
                  <Text fontWeight={isActive ? 'bold' : 'normal'}>
                    {item.name}
                  </Text>
                </Flex>
              </Link>
            );
          })}
        </VStack>
      </Box>

      {/* 主内容区 */}
      <Box
        ml="240px"
        w="calc(100% - 240px)"
        minH="100vh"
        bg={useColorModeValue('gray.50', 'gray.900')}
      >
        {children}
      </Box>
    </Flex>
  );
} 