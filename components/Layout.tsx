import { Box, Flex, VStack, Icon, Text, Link as ChakraLink, useColorModeValue, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { FaUsers, FaBox, FaGift, FaChartLine, FaHome, FaChevronRight } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Header from './Header'

const menuItems = [
  {
    title: '首页',
    icon: FaHome,
    href: '/'
  },
  {
    title: '卡片管理',
    icon: FaBox,
    href: '/cards'
  },
  {
    title: '卡包管理',
    icon: FaGift,
    href: '/card-packs'
  },
  {
    title: '用户管理',
    icon: FaUsers,
    href: '/users'
  },
  {
    title: '活动管理',
    icon: FaChartLine,
    href: '/events'
  }
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const hoverBg = useColorModeValue('blue.50', 'blue.900')

  // 获取当前页面的面包屑
  const getBreadcrumbs = () => {
    const path = router.pathname
    const parts = path.split('/').filter(Boolean)
    const breadcrumbs = [{ title: '首页', href: '/' }]

    let currentPath = ''
    parts.forEach((part) => {
      currentPath += `/${part}`
      const menuItem = menuItems.find((item) => item.href === currentPath)
      if (menuItem) {
        breadcrumbs.push({ title: menuItem.title, href: currentPath })
      }
    })

    return breadcrumbs
  }

  return (
    <Flex minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      {/* 侧边栏 */}
      <Box
        w="250px"
        bg={bgColor}
        borderRight="1px"
        borderColor={borderColor}
        position="fixed"
        h="100vh"
        pt="16"
      >
        <VStack spacing={1} align="stretch" py={4}>
          {menuItems.map((item) => {
            const isActive = router.pathname === item.href
            return (
              <Link href={item.href} key={item.href} passHref>
                <ChakraLink
                  _hover={{ textDecoration: 'none' }}
                  bg={isActive ? 'blue.50' : 'transparent'}
                  color={isActive ? 'blue.500' : 'gray.600'}
                >
                  <Flex
                    align="center"
                    p={4}
                    mx={4}
                    borderRadius="lg"
                    role="group"
                    cursor="pointer"
                    _hover={{
                      bg: hoverBg,
                      color: 'blue.500'
                    }}
                  >
                    <Icon
                      mr={4}
                      fontSize="16"
                      as={item.icon}
                    />
                    <Text fontWeight={isActive ? 'bold' : 'normal'}>
                      {item.title}
                    </Text>
                  </Flex>
                </ChakraLink>
              </Link>
            )
          })}
        </VStack>
      </Box>

      {/* 主内容区 */}
      <Box flex="1" ml="250px">
        <Header />
        <Box pt="16" px={8} py={6}>
          {/* 面包屑导航 */}
          <Breadcrumb
            spacing="8px"
            separator={<FaChevronRight size="12px" />}
            mb={6}
          >
            {getBreadcrumbs().map((item, index) => (
              <BreadcrumbItem key={index}>
                <Link href={item.href} passHref>
                  <BreadcrumbLink>{item.title}</BreadcrumbLink>
                </Link>
              </BreadcrumbItem>
            ))}
          </Breadcrumb>

          {/* 页面内容 */}
          <Box
            bg={bgColor}
            borderRadius="lg"
            boxShadow="sm"
            p={6}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Flex>
  )
} 